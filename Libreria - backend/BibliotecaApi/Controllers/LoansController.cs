using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BibliotecaApi.Data;
using BibliotecaApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace BibliotecaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoansController : ControllerBase
    {
        private readonly LibraryContext _context;

        public LoansController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/Loans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Loan>>> GetLoans()
        {
            
            return await _context.Loans.Where(l => l.ReturnDate == null).ToListAsync();
        }

        // GET: api/Loans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Loan>> GetLoan(int id)
        {
            var loan = await _context.Loans
                .FirstOrDefaultAsync(l => l.Id == id);

            if (loan == null)
            {
                return NotFound();
            }

            return Ok(loan);
        }

        // GET: api/Loans/History
        [HttpGet("history")]
        public async Task<ActionResult<IEnumerable<Loan>>> GetLoanHistory()
        {
            
            return await _context.Loans.ToListAsync();
        }

        // POST: api/Loans
        [HttpPost]
        public async Task<ActionResult<Loan>> PostLoan(Loan loan)
        {
            
            if (loan == null)
            {
                return BadRequest(new { error = "No se proporcionó un préstamo válido." });
            }

            
            if (loan.BookId <= 0)
            {
                return BadRequest(new { error = "El campo 'BookId' es obligatorio y debe ser mayor que 0." });
            }

            
            var book = await _context.Books.FindAsync(loan.BookId);
            if (book == null)
            {
                return BadRequest(new { error = "El libro especificado no existe." });
            }

            
            _context.Loans.Add(loan);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLoans), new { id = loan.Id }, loan);
        }

        // DELETE: api/Loans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoan(int id)
        {
            var loan = await _context.Loans.FindAsync(id);
            if (loan == null)
            {
                return NotFound();
            }

            _context.Loans.Remove(loan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("mark-as-completed")]
        public async Task<IActionResult> MarkLoansAsCompleted([FromBody] List<int> loanIds)
        {
            if (loanIds == null || !loanIds.Any())
            {
                return BadRequest(new { error = "No se proporcionaron identificadores de préstamos válidos." });
            }

            var loansToUpdate = await _context.Loans
                .Where(l => loanIds.Contains(l.Id) && l.ReturnDate == null)
                .ToListAsync();

            if (!loansToUpdate.Any())
            {
                return NotFound(new { error = "No se encontraron préstamos activos con los identificadores proporcionados." });
            }

            foreach (var loan in loansToUpdate)
            {
                loan.ReturnDate = DateTime.UtcNow; 
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoanExists(loanIds.First()))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/Loans/5
        [HttpPut("{id}")]
        public async Task<IActionResult> ReturnLoan(int id, Loan loan)
        {
            if (id != loan.Id)
            {
                return BadRequest();
            }

            var existingLoan = await _context.Loans.FindAsync(id);
            if (existingLoan == null)
            {
                return NotFound();
            }

            existingLoan.BorrowerName = loan.BorrowerName;
            existingLoan.BorrowDate = loan.BorrowDate;
            existingLoan.ReturnDate = loan.ReturnDate;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoanExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool LoanExists(int id)
        {
            return _context.Loans.Any(e => e.Id == id);
        }

        // GET: api/Loans/dashboard
        [HttpGet("dashboard")]
        public async Task<ActionResult<object>> GetDashboardData()
        {
            
            var activeLoansCount = await _context.Loans.CountAsync(l => l.ReturnDate == null);

            
            var overdueLoansCount = await _context.Loans
                .CountAsync(l => l.ReturnDate != null && l.ReturnDate < DateTime.UtcNow.AddDays(-30)); 

            
            var borrowedBooksCount = await _context.Loans
                .Where(l => l.ReturnDate == null)
                .Select(l => l.BookId)
                .Distinct()
                .CountAsync();

            
            var totalBooks = await _context.Books.CountAsync();

           
            var availableBooks = totalBooks - borrowedBooksCount;

            return Ok(new
            {
                availableBooks = availableBooks,
                borrowedBooks = borrowedBooksCount,
                activeLoans = activeLoansCount,
                overdueLoans = overdueLoansCount
            });
        }

    }
}
