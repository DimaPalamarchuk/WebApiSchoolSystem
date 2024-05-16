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
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly WebSystemDB dbContext;

        public UserController(WebSystemDB dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var studentRole = dbContext.Roles.FirstOrDefault(r => r.RoleName == "Student");
            var employeeRole = dbContext.Roles.FirstOrDefault(r => r.RoleName == "Employee");

            var users = new List<User>
    {
        new User
        {
            UserId = Guid.NewGuid(),
            FirstName = "Dmytro",
            LastName = "Palamarchuk",
            RoleId = studentRole?.RoleId ?? Guid.Empty
        },
        new User
        {
            UserId = Guid.NewGuid(),
            FirstName = "Hlib",
            LastName = "Suprun",
            RoleId = employeeRole?.RoleId ?? Guid.Empty
        },
        new User
        {
            UserId = Guid.NewGuid(),
            FirstName = "Hlib",
            LastName = "Suprun",
            RoleId = studentRole?.RoleId ?? Guid.Empty
        },
        new User
        {
            UserId = Guid.NewGuid(),
            FirstName = "Dmytro",
            LastName = "Palamarchuk",
            RoleId = employeeRole?.RoleId ?? Guid.Empty
        }
    };

            var studentIndexBase = 68161;

            foreach (var user in users)
            {
                if (user.RoleId == studentRole?.RoleId)
                {
                    var student = new Student
                    {
                        StudentId = Guid.NewGuid(),
                        IndexNo = "w" + studentIndexBase.ToString(),
                        UserId = user.UserId
                    };
                    
                    studentIndexBase++;
//                    dbContext.Students.Add(student);
                }
                else if (user.RoleId == employeeRole?.RoleId)
                {
                    var employee = new Employee
                    {
                        EmployeeId = Guid.NewGuid(),
                        Username = $"{user.FirstName.Substring(0, 1).ToLower()}{user.LastName.ToLower()}",
                        UserId = user.UserId
                    };
//                    dbContext.Employees.Add(employee);
                }
            }

//            dbContext.Users.AddRange(users);
//            dbContext.SaveChanges();

            return Ok(users);
        }
    }
}