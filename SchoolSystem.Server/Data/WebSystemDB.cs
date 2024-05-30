using Microsoft.EntityFrameworkCore;
using SchoolSystem.Server.Models;
using System.Data;
using System.Diagnostics;

namespace SchoolSystem.Server.Data
{
    public class WebSystemDB(DbContextOptions dbContextOptions) : DbContext(dbContextOptions)
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<BorrowedBook> BorrowedBooks { get; set;}
    }
}
