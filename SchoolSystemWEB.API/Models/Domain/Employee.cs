namespace SchoolSystemWEB.API.Models.Domain
{
    public class Employee
    {
        public Guid EmployeeId { get; set; }
        public string Username { get; set; }
        //     public string Password {  get; set; }
        public Guid UserId { get; set; }
        // Navigation properties
        public User User { get; set; }
    }
}
