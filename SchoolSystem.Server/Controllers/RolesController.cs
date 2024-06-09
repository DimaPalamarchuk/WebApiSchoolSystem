using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolSystem.Server.Data;
using SchoolSystem.Server.Models;

namespace SchoolSystem.Server.Controllers
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

        // Create NEW Role
        [HttpPost("{roleName}")]
        public IActionResult Post(string roleName)
        {
            var newRole = new Role
            {
                RoleId = Guid.NewGuid(),
                RoleName = roleName
            };

            dbContext.Roles.Add(newRole);
            dbContext.SaveChanges();

            return Ok(newRole);
        }

        // Get ALL Roles
        [HttpGet]
        public IActionResult GetAll()
        {
            var roles = dbContext.Roles.ToList();

            return Ok(roles);
        }

        // Get SINGLE Role By RoleId
        [HttpGet]
        [Route("{roleId}")]
        public IActionResult GetByName(Guid roleId)
        {
            var role = dbContext.Roles.FirstOrDefault(r => r.RoleId == roleId);
            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }
    }
}
