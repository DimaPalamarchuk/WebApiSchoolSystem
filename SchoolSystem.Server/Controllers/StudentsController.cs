using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolSystem.Server.Data;
using SchoolSystem.Server.Models;

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

    }
}
