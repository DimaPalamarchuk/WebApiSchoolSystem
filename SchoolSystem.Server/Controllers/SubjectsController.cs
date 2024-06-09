using Microsoft.AspNetCore.Mvc;
using SchoolSystem.Server.Data;
using SchoolSystem.Server.Models;

namespace SchoolSystem.Server.Controllers
{
    public class SubjectsController : Controller
    {
        private readonly WebSystemDB dbContext;
        public SubjectsController(WebSystemDB dbContext)
        {
            this.dbContext = dbContext;
        }

        // Get ALL Subjects
        [HttpGet("All subject")]
        public IActionResult GetAll()
        {
            var subjects = dbContext.Subjects.ToList();

            return Ok(subjects);
        }

        // Create NEW Subject
        [HttpPost("{subjectName}")]
        public IActionResult Post(string subjectName)
        {
            var newSubject = new Subject
            {
                SubjectId = Guid.NewGuid(),
                SubjectName = subjectName
            };

            dbContext.Subjects.Add(newSubject);
            dbContext.SaveChanges();

            return Ok(newSubject);
        }

        // Delete Subject By SubjectId
        [HttpDelete("Delete Subject")]
        public IActionResult Deleted(Guid subjectId)
        {
            var subject = dbContext.Subjects.FirstOrDefault(x => x.SubjectId == subjectId);
            if (subject == null)
            {
                return NotFound($"Subject with id {subjectId} is not found!");
            }
            dbContext.Subjects.Remove(subject);
            dbContext.SaveChanges();

            return Ok(subject);
        }
    }
}
