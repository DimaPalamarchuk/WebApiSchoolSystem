using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolSystemWEB.API.Data;
using SchoolSystemWEB.API.Models.Domain;

namespace SchoolSystemWEB.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly WebSystemDB dbContext;
        public RolesController(WebSystemDB dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET ALL Roles
        [HttpGet]
        public IActionResult GetAll()
        {
            var roles = dbContext.Roles.ToList();

            return Ok(roles);
        }

        // GET SINGLE Role BY RoleId
        [HttpGet]
        [Route("{id:Guid}")]
        public IActionResult GetById([FromRoute]Guid id)
        {
            // var role = dbContext.Roles.Find(id);

            var role = dbContext.Roles.FirstOrDefault(x => x.RoleId == id);
            if(role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }
    }
}
