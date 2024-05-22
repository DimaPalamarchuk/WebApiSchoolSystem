namespace SchoolSystem.Server.Models
{
    public class Employee
    {
        public Guid EmployeeId { get; set; }
        public Guid UserId { get; set; }

        // Navigation properties
        public User User { get; set; }
    }
}
