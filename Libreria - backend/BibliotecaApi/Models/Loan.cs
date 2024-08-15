using System;

namespace BibliotecaApi.Models
{
    public class Loan
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public string BorrowerName { get; set; }
        public DateTime BorrowDate { get; set; }
        public DateTime? ReturnDate { get; set; }

     
    }
}
