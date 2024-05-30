using System.ComponentModel.DataAnnotations;

namespace SchoolSystem.Server.Models
{
    public class BorrowedBook
    {
        [Key]
        public Guid BorrowId { get; set; }
        public Guid StudentId { get; set; }
        public Guid BookId { get; set; }

        // Navigatipn properties
        public Book Book { get; set; }
        public Student Student { get; set; }
    }
}
