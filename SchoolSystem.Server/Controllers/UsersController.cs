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
            if(user != null)
            {
                return BadRequest($"User with username {username} is already exist!");
            }

            User newUser = new User
            {
                Username = username,
                Password = pass,
                FirstName = firstName,
                LastName = lastName,
                RoleId = role.RoleId
            };

            if(roleName == "student" && roleName == "Student")
            {
                Student newStudent = new Student
                {
                    StudentId = Guid.NewGuid(),
                    UserId = newUser.UserId
                };
                dbContext.Students.Add(newStudent);
            }
            if(roleName == "employee" && roleName == "Employee")
            {
                Employee newEmployee = new Employee
                {
                    EmployeeId = Guid.NewGuid(),
                    UserId = newUser.UserId
                };
                dbContext.Employees.Add(newEmployee);
            }

            dbContext.Users.Add(newUser);
            dbContext.SaveChanges();

            return Ok(newUser);
        }

        // Delete User By Username
        [HttpDelete("{username}")]
        public IActionResult Delete(string username)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Username == username);
            if(user != null)
            {
                dbContext.Users.Remove(user);
            }
            else
            {
                return BadRequest($"User with username {username} is not found!");
            }
            dbContext.SaveChanges();

            return Ok($"User with username {username} has been deleted!");
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
        [HttpGet("{username},{pass}")]
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