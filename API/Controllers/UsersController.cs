using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]  //localhost:5001/api/users
    [ApiController]
    public class UsersController(AppDbContext context): ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<AppUser>>> GetUsers()
        {
            var users = await context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(string id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }
    }
}
