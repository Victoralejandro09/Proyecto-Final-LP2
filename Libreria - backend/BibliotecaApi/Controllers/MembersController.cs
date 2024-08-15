using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BibliotecaApi.Data;
using BibliotecaApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly LibraryContext _context;

        public MembersController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/Members
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> GetMembers()
        {
            return await _context.Members.ToListAsync();
        }

        // GET: api/Members/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(int id)
        {
            var member = await _context.Members.FindAsync(id);

            if (member == null)
            {
                return NotFound();
            }

            return member;
        }

        // POST: api/Members
        [HttpPost]
        public async Task<ActionResult<Member>> PostMember(Member member)
        {
           
            if (member == null)
            {
                return BadRequest("Member object is null.");
            }

           
            if (string.IsNullOrEmpty(member.Name) || string.IsNullOrEmpty(member.Email))
            {
                return BadRequest("Name and Email are required fields.");
            }

            
            _context.Members.Add(member);
            await _context.SaveChangesAsync();

            
            return CreatedAtAction(nameof(GetMember), new { id = member.Id }, member);
        }

        [HttpGet("dashboard")]
        public async Task<ActionResult<object>> GetDashboardData()
        {
            
            var activeMembersCount = await _context.Members.CountAsync();

            
            var borrowedBooksCount = await _context.Loans
                .Where(l => l.ReturnDate == null)
                .Select(l => l.BookId)
                .Distinct()
                .CountAsync();

           
            var totalBooks = await _context.Books.CountAsync();
            var availableBooks = totalBooks - borrowedBooksCount;

            
            var overdueLoansCount = await _context.Loans
                .CountAsync(l => l.ReturnDate == null && l.BorrowDate < DateTime.UtcNow.AddDays(-30)); 

            return Ok(new
            {
                availableBooks = availableBooks,
                borrowedBooks = borrowedBooksCount,
                activeMembers = activeMembersCount,
                overdueLoans = overdueLoansCount
            });
        }
        // PUT: api/Members/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMember(int id, Member member)
        {
            if (id != member.Id)
            {
                return BadRequest();
            }

            _context.Entry(member).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberExists(id))
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

        // DELETE: api/Members/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(int id)
        {
            var member = await _context.Members.FindAsync(id);
            if (member == null)
            {
                return NotFound();
            }

            _context.Members.Remove(member);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Members/search
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Member>>> SearchMembers(
            [FromQuery] string name = null,
            [FromQuery] string email = null,
            [FromQuery] string tel = null)
        {
            var query = _context.Members.AsQueryable();

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(m => m.Name.Contains(name));
            }

            if (!string.IsNullOrEmpty(email))
            {
                query = query.Where(m => m.Email.Contains(email));
            }

            if (!string.IsNullOrEmpty(tel))
            {
                query = query.Where(m => m.Tel.Contains(tel));
            }

            var members = await query.ToListAsync();

            return Ok(members);
        }

        private bool MemberExists(int id)
        {
            return _context.Members.Any(e => e.Id == id);
        }
    }
}
