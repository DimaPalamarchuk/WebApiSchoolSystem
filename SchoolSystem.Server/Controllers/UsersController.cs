using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolSystem.Server.Data;
using SchoolSystem.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SchoolSystem.Server.Controllers
{
    // Class for operations on users
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // Database Connection
        private readonly WebSystemDB dbContext;
        public UsersController(WebSystemDB dbContext)
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
                    user.UserId,
                    user.Username,
                    user.FirstName,
                    user.LastName,
                    RoleName = user.Role.RoleName
                })
                .ToList();

            return Ok(users);
        }

        // Create new User and changes in DataBase
        [HttpPost("{username},{pass},{firstName},{lastName},{roleName}")]
        public IActionResult Post(string username, string pass, string firstName, string lastName, string roleName)
        {
            var role = dbContext.Roles.FirstOrDefault(r => r.RoleName == roleName);
            if (role == null)
            {
                return BadRequest($"Role with name {roleName} is not found!");
            }

            var user = dbContext.Users.FirstOrDefault(u => u.Username == username);
            if (user != null)
            {
                return BadRequest($"User with username {username} already exists!");
            }

            User newUser = new User
            {
                UserId = Guid.NewGuid(),
                Username = username,
                Password = pass,
                FirstName = firstName,
                LastName = lastName,
                RoleId = role.RoleId
            };

            dbContext.Users.Add(newUser);
            dbContext.SaveChanges();

            if (role.RoleName.Equals("student", StringComparison.OrdinalIgnoreCase))
            {
                Student newStudent = new Student
                {
                    StudentId = Guid.NewGuid(),
                    UserId = newUser.UserId
                };
                dbContext.Students.Add(newStudent);
            }
            else if (role.RoleName.Equals("employee", StringComparison.OrdinalIgnoreCase))
            {
                Employee newEmployee = new Employee
                {
                    EmployeeId = Guid.NewGuid(),
                    UserId = newUser.UserId
                };
                dbContext.Employees.Add(newEmployee);
            }

            dbContext.SaveChanges();

            return Ok(newUser);
        }

        // Delete User By UserId
        [HttpDelete("{userId}")]
        public IActionResult Delete(Guid userId)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.UserId == userId);
            if(user != null)
            {
                dbContext.Users.Remove(user);
            }
            else
            {
                return BadRequest($"User with username {userId} is not found!");
            }
            dbContext.SaveChanges();

            return Ok($"User with username {userId} has been deleted!");
        }
    }

    // Class for user authorization
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        // Database Connection
        private readonly WebSystemDB dbContext;

        public LoginController(WebSystemDB dbContext)
        {
            this.dbContext = dbContext;
        }

        // Checking data for user authorization
        [HttpGet("Login")]
        public IActionResult Get(string username, string pass)
        {
            var userEnter = dbContext.Users
                .Include(u => u.Role)
                .FirstOrDefault(u => u.Username == username && u.Password == pass);

            if (userEnter != null)
            {
                var student = dbContext.Students
                    .FirstOrDefault(s => s.UserId == userEnter.UserId);
                var employee = dbContext.Employees
                    .FirstOrDefault(e => e.UserId == userEnter.UserId);

                var userDto = new
                {
                    userEnter.Username,
                    userEnter.FirstName,
                    userEnter.LastName,
                    RoleName = userEnter.Role.RoleName,
                    EmployeeId = employee?.EmployeeId,
                    StudentId = student?.StudentId
                };
                return Ok(userDto);
            }
            return NotFound($"Login {username} or password not found");
        }
    }
}