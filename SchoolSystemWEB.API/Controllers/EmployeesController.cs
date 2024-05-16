using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolSystemWEB.API.Data;

namespace SchoolSystemWEB.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly WebSystemDB dbContext;

        public EmployeesController(WebSystemDB dbContext)
        {
            this.dbContext = dbContext;
        }

        // Maybe will be deleted
        [HttpGet]
        public IActionResult GetAll()
        {
            var employees = dbContext.Employees;

            return Ok(employees);
        }

        // Maybe will be deleted
        [HttpGet("{username}")]
        public IActionResult Get([FromRoute] string username)
        {
            var employee = dbContext.Employees.FirstOrDefault(x => x.Username == username);

            if (employee == null)
            {
                return NotFound($"Employee with username '{username}' not found");
            }

            return Ok(employee);
        }

    }
}
