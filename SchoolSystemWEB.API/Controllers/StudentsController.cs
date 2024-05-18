using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    }
}
