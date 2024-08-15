using Microsoft.EntityFrameworkCore;
using BibliotecaApi.Models;  // Aseg�rate de tener un espacio de nombres correcto.

namespace BibliotecaApi.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Loan> Loans { get; set; }
    }
}
