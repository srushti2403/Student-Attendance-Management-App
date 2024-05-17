using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly DataContext _context;

        public TeacherController(DataContext context)
        {
            _context = context;
        }

        private static List<Teacher> teachers = new List<Teacher>()
        {
            new Teacher { Id = 1, Name = "John Doe", Dob = "1990-01-01", Username = "johndoe", Password = "password", Email = "johndoe@example.com" },
            new Teacher { Id = 2, Name = "Jane Smith", Dob = "1985-05-15", Username = "janesmith", Password = "password", Email = "janesmith@example.com" },
            new Teacher { Id = 3, Name = "Alice Johnson", Dob = "1978-09-20", Username = "alicejohnson", Password = "password", Email = "alicejohnson@example.com" }
        };

        // GET api/teacher
        [HttpGet]
        public  ActionResult<IEnumerable<Teacher>> Get()
        {
            var t =  _context.Teachers.ToList();

            return Ok(t);
        }

        // POST api/teacher/register
        /* [HttpPost("register")]
         public IActionResult Register([FromBody] Teacher newTeacher)
         {
             if (newTeacher == null)
             {
                 return BadRequest("Invalid request body");
             }

             // Simulate generating a unique ID for the new teacher (you can use a real ID generation logic)
             int newId = teachers.Count + 1;
             newTeacher.Id = newId;

             // Add the new teacher to the list
             teachers.Add(newTeacher);

             // Return the newly created teacher with a 201 Created status code
             return CreatedAtAction(nameof(Get), new { id = newId }, newTeacher);
         }*/
        // POST api/teacher/register

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Teacher newTeacher)
        {
            if (newTeacher == null)
            {
                return BadRequest("Invalid request body");
            }

            try
            {
                // Add the new teacher to the DbContext and save changes to the database
                _context.Teachers.Add(newTeacher);
                await _context.SaveChangesAsync();

                // Return the newly created teacher with a 201 Created status code
                return CreatedAtAction(nameof(Get), new { id = newTeacher.Id }, newTeacher);
            }
            catch (Exception ex)
            {
                // Handle any exceptions that might occur during database interaction
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating teacher");
            }
        }


        // POST api/teacher/login
        /* [HttpPost("login")]
         public IActionResult Login([FromBody] LoginRequest loginRequest)
         {
             if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
             {
                 return BadRequest("Invalid username or password");
             }

             // Simulate checking credentials against a database or external service
             Teacher authenticatedTeacher = teachers.FirstOrDefault(t => t.Username == loginRequest.Username && t.Password == loginRequest.Password);

             if (authenticatedTeacher == null)
             {
                 return Unauthorized("Invalid username or password");
             }

             // Return the authenticated teacher with a 200 OK status code
             return Ok(authenticatedTeacher);
         }*/

        // POST api/teacher/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Invalid username or password");
            }

            try
            {
                // Query the database to find the teacher with the provided username and password
                Teacher authenticatedTeacher = await _context.Teachers.FirstOrDefaultAsync(t =>
                    t.Username == loginRequest.Username && t.Password == loginRequest.Password);

                if (authenticatedTeacher == null)
                {
                    return Unauthorized("Invalid username or password");
                }

                // Return the authenticated teacher with a 200 OK status code
                return Ok(authenticatedTeacher);
            }
            catch (Exception ex)
            {
                // Handle any exceptions that might occur during database interaction
                return StatusCode(StatusCodes.Status500InternalServerError, "Error authenticating teacher");
            }
        }



    }





    public class LoginRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

    public class Teacher
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Dob { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
