using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolSystem.Server.Data;
using SchoolSystem.Server.Models;
using System.Data;
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

        // Get ALL Student
        [HttpGet("All students")]
        public IActionResult GetAll()
        {
            var students = dbContext.Students
                .Select(student => new
                {
                    student.StudentId,
                    student.UserId
                })
                .ToList();

            return Ok(students);
        }


        // Take a book for BorrowedBooks
        [HttpPost("TakeBook")]
        public IActionResult ActionBorrowedBook(Guid studentId, Guid bookId)
        {
            var student = dbContext.Students.FirstOrDefault(u => u.StudentId == studentId);
            if (student == null)
            {
                return NotFound($"Student with id {studentId} is not found!");
            }

            var book = dbContext.Books.FirstOrDefault(b => b.BookId == bookId);
            if (book == null)
            {
                return NotFound($"Book with id {bookId} is not found!");
            }

            BorrowedBook newBorrowedBook = new BorrowedBook
            {
                BorrowId = Guid.NewGuid(),
                StudentId = studentId,
                BookId = bookId
            };

            dbContext.BorrowedBooks.Add(newBorrowedBook);
            dbContext.SaveChanges();

            return Ok(newBorrowedBook);
        }

        [HttpGet("Get All BorrowedBook")]
        public IActionResult AllBorrowedBook()
        {
            var borrowBooks = dbContext.BorrowedBooks
                .Select(borrow => new
                {
                    borrow.BorrowId,
                    borrow.StudentId,
                    borrow.BookId
                })
                .ToList();

            return Ok(borrowBooks);
        }

    }
}
