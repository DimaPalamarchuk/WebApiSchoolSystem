using Microsoft.AspNetCore.Mvc;
using SchoolSystem.Server.Data;
using SchoolSystem.Server.Models;

namespace SchoolSystem.Server.Controllers
{
    public class BooksController : ControllerBase
    {
        private readonly WebSystemDB dbContext;

        public BooksController(WebSystemDB dbContext)
        {
            this.dbContext = dbContext;
        }

        // Create New Book
        [HttpPost("New Book")]
        public IActionResult Post(string title)
        {
            var book = dbContext.Books.FirstOrDefault(r => r.Title == title);
            if (book != null)
            {
                return BadRequest($"Book with title {title} is already exist!");
            }

            Book newBook = new Book
            {
                BookId = Guid.NewGuid(),
                Title = title
            };

            dbContext.Books.Add(newBook);
            dbContext.SaveChanges();

            return Ok(newBook);
        }

        // Get ALL Books By Title
        [HttpGet("All Title")]
        public IActionResult Get()
        {
            var books = dbContext.Books
                .Select(book => new
                {
                    book.BookId,
                    book.Title
                })
                .ToList();

            return Ok(books);
        }

        [HttpGet("One book")]
        public IActionResult OneBook(string title)
        {
            var book = dbContext.Books
                .FirstOrDefault(b => b.Title == title);

            if(book == null)
            {
                return NotFound($"Book with title \"{title}\" is not found!");
            }
            var bookFound = new Book
            {
                BookId = book.BookId,
                Title = book.Title
            };

            return Ok(bookFound);
        }

        // Change Title Book
        [HttpPut("Change Book")]
        public IActionResult ChangeBookTitle(string currentTitle, string newTitle)
        {
            var book = dbContext.Books
                .FirstOrDefault(b => b.Title == currentTitle);

            if (book == null)
            {
                return NotFound($"Book with title \"{currentTitle}\" is not found!");
            }

            book.Title = newTitle;
            dbContext.Entry(book).Property(b => b.Title).IsModified = true;
            dbContext.SaveChanges();

            var changes = new
            {
                BookId = book.BookId,
                Current_Title = currentTitle,
                New_Title = newTitle
            };
            return Ok(changes);
        }


        // Delete Book
        [HttpDelete("Delete Book")]
        public IActionResult DeleteBook(string title)
        {
            var book = dbContext.Books
                .FirstOrDefault(b => b.Title == title);

            if (book == null)
            {
                return NotFound($"Book with title \"{title}\" is not found!");
            }


            dbContext.Remove(book);
            dbContext.SaveChanges();

            return Ok(book);
        }
    }
}
