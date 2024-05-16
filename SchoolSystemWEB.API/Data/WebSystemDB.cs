using Microsoft.EntityFrameworkCore;
using SchoolSystemWEB.API.Models.Domain;

namespace SchoolSystemWEB.API.Data
{
    public class WebSystemDB : DbContext
    {
        public WebSystemDB(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Subject> Subjects { get; set; }
    }
}
