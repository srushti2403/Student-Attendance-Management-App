using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WebApplication1.Data;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly DataContext _context;

        public StudentController(DataContext context)
        {
            _context = context;
        }

        /*// GET api/student
        [HttpGet]
        public ActionResult<IEnumerable<Student>> Get()
        {
            var students = _context.Students.ToList();
            return Ok(students);
        }*/

        // GET api/student
        [HttpGet]
        public ActionResult<IEnumerable<Student>> Get()
        {
            var studentsWithAttendance = _context.Students
                .Include(s => s.Attendance) 
                .ToList();

            return Ok(studentsWithAttendance);
        }


        // GET api/student/5
        [HttpGet("{id}")]
        public ActionResult<Student> GetById(int id)
        {
            var student = _context.Students.FirstOrDefault(s => s.Id == id);
            if (student == null)
            {
                return NotFound("Student not found");
            }
            return Ok(student);
        }

        // POST api/student/register
        [HttpPost("register")]
        public IActionResult Register([FromBody] Student newStudent)
        {
            if (newStudent == null)
            {
                return BadRequest("Invalid request body");
            }

            // Initialize all marks to zero
            newStudent.Maths = 0;
            newStudent.Science = 0;
            newStudent.English = 0;
            newStudent.Hindi = 0;
            newStudent.SST = 0;

            //newStudent.RollNumber += newStudent.Id.ToString();
            newStudent.RollNumber += _context.Students.ToList().Count+1;
            // Get the current month
            string currentMonth = DateTime.Now.ToString("MMMM");

            // Create a new attendance object for the current month with zero presents
            var newAttendance = new Attendance { Month = currentMonth, Presents = 0 };

            // Add the new attendance object to the student's attendance list
            newStudent.Attendance = new List<Attendance> { newAttendance };

            // Add the student to the context (let the database generate the ID)
            _context.Students.Add(newStudent);

            // Save the changes to the database
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = newStudent.Id }, newStudent);
        }


        // PUT api/student/5
        //    [HttpPut("{id}")]
        /*    public IActionResult Put(int id, [FromBody] Student updatedStudent)
            {
                if (updatedStudent == null || updatedStudent.Id != id)
                {
                    return BadRequest("Invalid request body or ID mismatch");
                }

                var existingStudent = _context.Students.FirstOrDefault(s => s.Id == id);
                if (existingStudent == null)
                {
                    return NotFound("Student not found");
                }

                existingStudent.RollNumber = updatedStudent.RollNumber;
                existingStudent.Class = updatedStudent.Class;
                existingStudent.Maths = updatedStudent.Maths;
                // Update other properties as needed

                _context.SaveChanges();

                return Ok(existingStudent);
            }*/

        // PUT api/student/5
        // PUT api/student/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Student updatedStudent)
        {
            if (updatedStudent == null)
            {
                return BadRequest("Invalid request body. Please provide valid data for updating the student.");
            }

            if (id != updatedStudent.Id)
            {
                return BadRequest("ID in the request URL does not match the ID in the request body.");
            }

            var existingStudent = _context.Students
                .Include(s => s.Attendance) // Include attendance data
                .FirstOrDefault(s => s.Id == id);

            if (existingStudent == null)
            {
                return NotFound("Student not found");
            }

            // Update the student properties
            existingStudent.RollNumber = updatedStudent.RollNumber;
            existingStudent.Class = updatedStudent.Class;
            existingStudent.Maths = updatedStudent.Maths;
            existingStudent.English = updatedStudent.English;
            existingStudent.Hindi = updatedStudent.Hindi;
            existingStudent.SST = updatedStudent.SST;
            existingStudent.Science = updatedStudent.Science;

            // Update other properties as needed

            // Update attendance data
            // For example, update the presents for the current month
            string currentMonth = DateTime.Now.ToString("MMMM");
            var currentMonthAttendance = existingStudent.Attendance.FirstOrDefault(a => a.Month == currentMonth);
            if (currentMonthAttendance != null)
            {
                // Update presents count or any other attendance-related property
                currentMonthAttendance.Presents = updatedStudent.Attendance?.FirstOrDefault(a => a.Month == currentMonth)?.Presents ?? currentMonthAttendance.Presents;
            }
            else
            {
                // Create a new attendance object for the current month if it doesn't exist
                existingStudent.Attendance.Add(new Attendance
                {
                    Month = currentMonth,
                    Presents = updatedStudent.Attendance?.FirstOrDefault(a => a.Month == currentMonth)?.Presents ?? 0
                });
            }

            _context.SaveChanges();

            return Ok(existingStudent);
        }


        // DELETE api/student/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var studentToRemove = _context.Students.FirstOrDefault(s => s.Id == id);
            if (studentToRemove == null)
            {
                return NotFound("Student not found");
            }

            _context.Students.Remove(studentToRemove);
            _context.SaveChanges();

            return NoContent();
        }

        // POST api/student/login
        /*[HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Invalid username or password");
            }

            var student = _context.Students.FirstOrDefault(s => s.Username == loginRequest.Username);
            if (student == null)
            {
                return NotFound("Student not found");
            }

            if (student.Password != loginRequest.Password)
            {
                return BadRequest("Incorrect password");
            }

            // Remove sensitive data before returning
            student.Password = null;

            return Ok(student);
        }*/

        // POST api/student/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Invalid username or password");
            }

            var studentWithAttendance = _context.Students
                .Include(s => s.Attendance) // Eager loading of Attendance
                .FirstOrDefault(s => s.Username == loginRequest.Username);

            if (studentWithAttendance == null)
            {
                return NotFound("Student not found");
            }

            if (studentWithAttendance.Password != loginRequest.Password)
            {
                return BadRequest("Incorrect password");
            }

            // Remove sensitive data before returning
            studentWithAttendance.Password = null;

            return Ok(studentWithAttendance);
        }

    }

    /*    public class LoginRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }*/

    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string RollNumber { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Class { get; set; }
        public int Maths { get; set; }
        public int Science { get; set; }
        public int English { get; set; }
        public int Hindi { get; set; }
        public int SST { get; set; }
        public List<Attendance> Attendance { get; set; }
    }

    public class Attendance
    {
        public int Id { get; set; }
        public string Month { get; set; }
        public int Presents { get; set; }
    }
}
 