using API.Data;
using API.Entities;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserBirdsController(AppDbContext context) : ControllerBase
{
    [HttpPost("{userId}/favorite/{speciesCode}")]
    public async Task<ActionResult<UserBirdDto>> ToggleFavorite(string userId, string speciesCode, [FromQuery] bool value)
    {
        var ub = await GetOrCreateUserBird(userId, speciesCode);
        ub.IsFavorite = value;
        await context.SaveChangesAsync();
        return Ok(new UserBirdDto(ub.UserId, ub.SpeciesCode, ub.IsFavorite, ub.WantToSee, ub.Found));
    }

    [HttpPost("{userId}/wanttosee/{speciesCode}")]
    public async Task<ActionResult<UserBirdDto>> ToggleWantToSee(string userId, string speciesCode, [FromQuery] bool value)
    {
        var ub = await GetOrCreateUserBird(userId, speciesCode);
        ub.WantToSee = value;
        await context.SaveChangesAsync();
        return Ok(new UserBirdDto(ub.UserId, ub.SpeciesCode, ub.IsFavorite, ub.WantToSee, ub.Found));
    }

    [HttpPost("{userId}/found/{speciesCode}")]
    public async Task<ActionResult<UserBirdDto>> ToggleFound(string userId, string speciesCode, [FromQuery] bool value)
    {
        var ub = await GetOrCreateUserBird(userId, speciesCode);
        ub.Found = value;
        await context.SaveChangesAsync();
        return Ok(new UserBirdDto(ub.UserId, ub.SpeciesCode, ub.IsFavorite, ub.WantToSee, ub.Found));
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<List<UserBirdDto>>> GetUserBirds(string userId)
    {
        return await context.UserBirds
            .AsNoTracking()
            .Where(ub => ub.UserId == userId)
            .Select(ub => new UserBirdDto(ub.UserId, ub.SpeciesCode, ub.IsFavorite, ub.WantToSee, ub.Found))
            .ToListAsync();
    }

    [HttpGet("{userId}/favorites")]
    public async Task<ActionResult<List<UserBirdDto>>> GetFavorites(string userId)
    {
        return await context.UserBirds
            .AsNoTracking()
            .Where(ub => ub.UserId == userId && ub.IsFavorite)
            .Select(ub => new UserBirdDto(ub.UserId, ub.SpeciesCode, ub.IsFavorite, ub.WantToSee, ub.Found))
            .ToListAsync();
    }

    [HttpGet("{userId}/wanttosee")]
    public async Task<ActionResult<List<UserBirdDto>>> GetWantToSee(string userId)
    {
        return await context.UserBirds
            .AsNoTracking()
            .Where(ub => ub.UserId == userId && ub.WantToSee)
            .Select(ub => new UserBirdDto(ub.UserId, ub.SpeciesCode, ub.IsFavorite, ub.WantToSee, ub.Found))
            .ToListAsync();
    }

    [HttpGet("{userId}/found")]
    public async Task<ActionResult<List<UserBirdDto>>> GetFound(string userId)
    {
        return await context.UserBirds
            .AsNoTracking()
            .Where(ub => ub.UserId == userId && ub.Found)
            .Select(ub => new UserBirdDto(ub.UserId, ub.SpeciesCode, ub.IsFavorite, ub.WantToSee, ub.Found))
            .ToListAsync();
    }

    private async Task<UserBird> GetOrCreateUserBird(string userId, string speciesCode)
    {
        var ub = await context.UserBirds.FindAsync(userId, speciesCode);
        if (ub == null)
        {
            var bird = await context.Birds.FindAsync(speciesCode);
            if (bird == null) context.Birds.Add(new Bird { SpeciesCode = speciesCode, CommonName = speciesCode });
            ub = new UserBird { UserId = userId, SpeciesCode = speciesCode };
            context.UserBirds.Add(ub);
        }
        return ub;
    }
}