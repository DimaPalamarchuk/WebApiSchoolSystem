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

    }
}
