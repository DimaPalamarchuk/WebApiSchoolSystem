namespace SchoolSystemWEB.API.Models.Domain
{
    public class User
    {
        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public Guid RoleId { get; set; }

        // Navigation properties
        public Role Role { get; set; }
    }
}
