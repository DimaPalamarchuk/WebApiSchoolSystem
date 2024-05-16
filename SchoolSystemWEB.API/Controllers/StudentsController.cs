using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolSystemWEB.API.Data;
using SchoolSystemWEB.API.Models.Domain;

namespace SchoolSystemWEB.API.Controllers
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

        // Maybe will be deleted
        [HttpGet]
        public IActionResult GetAll()
        {
            var students = dbContext.Students;

            return Ok(students);
        }

        // Maybe will be deleted
        [HttpGet("{indexNo}")]
        public IActionResult Get([FromRoute] string indexNo)
        {
            var student = dbContext.Students.FirstOrDefault(x => x.IndexNo == indexNo);

            if (student == null)
            {
                return NotFound($"Student with IndexNo '{indexNo}' not found");
            }

            return Ok(student);
        }
    }
}
