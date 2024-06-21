using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolSystem.Server.Data;
using SchoolSystem.Server.Models;
using System.Linq;

namespace SchoolSystem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradesController : ControllerBase
    {
        private readonly WebSystemDB dbContext;

        public GradesController(WebSystemDB dbContext)
        {
            this.dbContext = dbContext;
        }

        // Valid grades(Only this values)
        private readonly float[] validGrades = new float[] { 2.0f, 3.0f, 3.5f, 4.0f, 5.0f };

        // Post New grade
        [HttpPost("AddGrade")]
        public IActionResult AddGrade(Guid studentId, Guid subjectId, float gradeValue, bool isFirstTermin)
        {
            if (!validGrades.Contains(gradeValue))
            {
                return BadRequest("Invalid grade value. Valid grades are 2.0, 3.0, 3.5, 4.0, and 5.0.");
            }

            var grade = dbContext.Grades
                .Include(g => g.Student)
                .ThenInclude(s => s.User)
                .Include(g => g.Subject)
                .FirstOrDefault(g => g.StudentId == studentId && g.SubjectId == subjectId);

            if (grade == null)
            {
                grade = new Grade
                {
                    GradeId = Guid.NewGuid(),
                    StudentId = studentId,
                    SubjectId = subjectId,
                    Student = dbContext.Students.Include(s => s.User).FirstOrDefault(s => s.StudentId == studentId),
                    Subject = dbContext.Subjects.Find(subjectId)
                };
                dbContext.Grades.Add(grade);
            }

            if (isFirstTermin)
            {
                grade.FirstTermin = gradeValue;
            }
            else
            {
                grade.SecondTermin = gradeValue;
            }

            dbContext.SaveChanges();
            return Ok(grade);
        }

        // Update an existing grade by GradeId, New GradeValue and Termin
        [HttpPut("UpdateGrade")]
        public IActionResult UpdateGrade(Guid gradeId, float gradeValue, bool isFirstTermin)
        {
            if (!validGrades.Contains(gradeValue))
            {
                return BadRequest("Invalid grade value. Valid grades are 2.0, 3.0, 3.5, 4.0, and 5.0.");
            }

            var grade = dbContext.Grades
                .Include(g => g.Student)
                .ThenInclude(s => s.User)
                .ThenInclude(u => u.Role) // Include the Role entity
                .Include(g => g.Subject)
                .FirstOrDefault(g => g.GradeId == gradeId);

            if (grade == null)
            {
                return NotFound($"Grade with Id {gradeId} not found.");
            }

            if (isFirstTermin)
            {
                grade.FirstTermin = gradeValue;
            }
            else
            {
                grade.SecondTermin = gradeValue;
            }

            dbContext.SaveChanges();

            var result = new
            {
                grade.GradeId,
                grade.FirstTermin,
                grade.SecondTermin,
                grade.SubjectId,
                grade.StudentId,
                Student = new
                {
                    grade.Student.StudentId,
                    grade.Student.UserId,
                    User = new
                    {
                        grade.Student.User.UserId,
                        grade.Student.User.Username,
                        grade.Student.User.Password,
                        grade.Student.User.FirstName,
                        grade.Student.User.LastName,
                        grade.Student.User.RoleId,
                        Role = new
                        {
                            grade.Student.User.Role.RoleId,
                            grade.Student.User.Role.RoleName
                        }
                    }
                },
                Subject = new
                {
                    grade.Subject.SubjectId,
                    grade.Subject.SubjectName
                }
            };

            return Ok(result);
        }


        // Delete a grade by GradeId
        [HttpDelete("DeleteGrade")]
        public IActionResult DeleteGrade(Guid gradeId)
        {
            var grade = dbContext.Grades
                .Include(g => g.Student)
                .ThenInclude(s => s.User)
                .Include(g => g.Subject)
                .FirstOrDefault(g => g.GradeId == gradeId);

            if (grade == null)
            {
                return NotFound($"Grade with Id {gradeId} not found.");
            }

            dbContext.Grades.Remove(grade);
            dbContext.SaveChanges();
            return Ok($"Grade with Id {gradeId} has been deleted.");
        }

        // Get grades by StudentId
        [HttpGet("GetGradesByStudentId/{studentId}")]
        public IActionResult GetGradesByStudentId(Guid studentId)
        {
            var grades = dbContext.Grades
                .Include(g => g.Student)
                .ThenInclude(s => s.User)
                .Include(g => g.Subject)
                .Where(g => g.StudentId == studentId)
                .Select(g => new
                {
                    g.GradeId,
                    g.FirstTermin,
                    g.SecondTermin,
                    Subject = new
                    {
                        g.Subject.SubjectId,
                        g.Subject.SubjectName
                    },
                    Student = new
                    {
                        g.Student.StudentId,
                        g.Student.UserId,
                        User = new
                        {
                            g.Student.User.UserId,
                            g.Student.User.Username,
                            g.Student.User.FirstName,
                            g.Student.User.LastName
                        }
                    }
                })
                .ToList();

            return Ok(grades);
        }
    }
}
