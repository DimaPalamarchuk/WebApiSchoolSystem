using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolSystem.Server.Data;

namespace SchoolSystem.Server.Controllers
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

        // Get ALL Employees
        [HttpGet("All employees")]
        public IActionResult GetAll()
        {
            var employees = dbContext.Employees
                .Select(employee => new
                {
                    employee.EmployeeId,
                    employee.UserId
                })
                .ToList();

            return Ok(employees);
        }
    }
}
