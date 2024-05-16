namespace SchoolSystemWEB.API.Models.Domain
{
    public class Student
    {
       public Guid StudentId { get; set; }
       public string IndexNo { get; set; }

       public Guid UserId { get; set; }

        // Navigation properties
       public User User { get; set; }
    }
}
