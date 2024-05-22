namespace SchoolSystem.Server.Models
{
    public class Student
    {
        public Guid StudentId { get; set; }
        public Guid UserId { get; set; }

        // Navigation properties
        public User User { get; set; }
    }
}
