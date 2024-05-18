using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolSystemWEB.API.Data;
using SchoolSystemWEB.API.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SchoolSystemWEB.API.Controllers
{
    // Class for operations on users
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // Database Connection
        private readonly WebSystemDB dbContext;
        public UserController(WebSystemDB dbContext)
        {
            this.dbContext = dbContext;
        }

        // Get ALL User
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = dbContext.Users
                .Select(user => new
                {
                    user.Username,
                    user.FirstName,
                    user.LastName,
                    RoleName = user.Role.RoleName
                })
                .ToList();

            return Ok(users);
        }

        // Create new User and changes in DataBase
        [HttpPost("{username}, {pass}, {firstName}, {lastName}, {roleName}")]
        public IActionResult Post(string username, string pass, string firstName, string lastName, string roleName)
        {
            var existingUser = dbContext.Users.FirstOrDefault(u => u.Username == username);
            if (existingUser != null)
            {
                return Conflict($"Username {username} already exists");
            }

            var role = dbContext.Roles.FirstOrDefault(r => r.RoleName == roleName);
            if (role == null)
            {
                return NotFound($"Role with name {roleName} not found");
            }

            var newUser = new User
            {
                UserId = Guid.NewGuid(),
                Username = username,
                Password = pass,
                FirstName = firstName,
                LastName = lastName,
                RoleId = role.RoleId
            };

            if (roleName == "Student")
            {
                var newStudent = new Student
                {
                    StudentId = Guid.NewGuid(),
                    UserId = newUser.UserId
                };
                dbContext.Add(newStudent);
            }

            if (roleName == "Employee")
            {
                var newEmployee = new Employee
                {
                    EmployeeId = Guid.NewGuid(),
                    UserId = newUser.UserId
                };
                dbContext.Add(newEmployee);
            }

            dbContext.Users.Add(newUser);

            try
            {
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while saving the user: {ex.Message}");
            }

            var userDto = new
            {
                newUser.UserId,
                newUser.Username,
                newUser.FirstName,
                newUser.LastName,
                RoleName = roleName
            };

            return Ok(userDto);
        }

        // Get SINGLE User BY Username
        [HttpGet("{username}")]
        public IActionResult Get(string username)
        {
            var usernameFind = dbContext.Users
                .Include(x => x.Role)
                .FirstOrDefault(x => x.Username == username);

            if(usernameFind != null)
            {
                var userDto = new
                {
                    Username = usernameFind.Username,
                    FirstName = usernameFind.FirstName,
                    LastName = usernameFind.LastName,
                    Role = usernameFind.Role.RoleName
                };

                return Ok(userDto);
            }
            return NotFound($"Username {username} is not found");
        }

    }

    // Class for user authorization
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly WebSystemDB dbContext;

        public LoginController(WebSystemDB dbContext)
        {
            this.dbContext = dbContext;
        }

        // Checking data for user authorization
        [HttpGet]
        public IActionResult Get(string username, string pass)
        {
            var userEnter = dbContext.Users
                .Include(s => s.Role)
                .FirstOrDefault(s => s.Username == username && s.Password == pass);

            if(userEnter != null)
            {
                var userDto = new
                {
                    userEnter.Username,
                    userEnter.FirstName,
                    userEnter.LastName,
                    RoleName = userEnter.Role.RoleName
                };
                return Ok(userDto);
            }
            return NotFound($"Login {username} or password not found");
        }
    }
}