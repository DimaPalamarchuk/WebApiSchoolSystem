using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolSystem.Server.Data;
using SchoolSystem.Server.Models;
using System.Linq;

namespace SchoolSystem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly WebSystemDB dbContext;
        public StudentsController(WebSystemDB dbContext)
        {
            this.dbContext = dbContext;
        }

        // Take a book for BorrowedBooks

        [HttpPost("TakeBook")]
        public IActionResult ActionBorrowedBook(string username, string title)
        {
            var student = dbContext.Students
                .FirstOrDefault(s => s.User.Username == username);

            if (student == null)
            {
                return NotFound($"Student with username \"{username}\" is not found!");
            }

            var book = dbContext.Books
                .FirstOrDefault(s => s.Title == title);

            if (book == null)
            {
                return NotFound($"Book with title \"{title}\" is not found!");
            }

            var newBorrowedBook = new BorrowedBook
            {
                BorrowId = Guid.NewGuid(),
                StudentId = student.StudentId,
                BookId = book.BookId
            };

            dbContext.Add(newBorrowedBook);
            dbContext.SaveChanges();

            return Ok(newBorrowedBook);
        }

        [HttpGet("Get All BorrowedBook")]
        public IActionResult AllBorrowedBook()
        {
            var borrowedBooks = dbContext.BorrowedBooks
                .Select(borrowedBooks => new
                {
                    borrowedBooks.BorrowId,
                    borrowedBooks.StudentId,
                    borrowedBooks.BookId
                })
                .ToList();

            return Ok(borrowedBooks);
        }

    }
}
