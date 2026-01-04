using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserBirdsController(IUserBirdService userBirdService) : ControllerBase
{
    [HttpPost("{userId}/favorite/{speciesCode}")]
    public async Task<ActionResult<UserBirdDto>> ToggleFavorite(string userId, string speciesCode, [FromQuery] bool value)
    {
        var dto = await userBirdService.ToggleFavorite(userId, speciesCode, value);
        return Ok(dto);
    }

    [HttpPost("{userId}/wanttosee/{speciesCode}")]
    public async Task<ActionResult<UserBirdDto>> ToggleWantToSee(string userId, string speciesCode, [FromQuery] bool value)
    {
        var dto = await userBirdService.ToggleWantToSee(userId, speciesCode, value);
        return Ok(dto);
    }

    [HttpPost("{userId}/found/{speciesCode}")]
    public async Task<ActionResult<UserBirdDto>> ToggleFound(string userId, string speciesCode, [FromQuery] bool value)
    {
        var dto = await userBirdService.ToggleFound(userId, speciesCode, value);
        return Ok(dto);
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<List<UserBirdDto>>> GetUserBirds(string userId)
    {
        return await userBirdService.GetUserBirds(userId);
    }

    [HttpDelete("{userId}")]
    public async Task<ActionResult<List<UserBirdDto>>> DeleteAllUserBirds(string userId)
    {
        return await userBirdService.DeleteAllUserBirds(userId);
    }

    [HttpGet("{userId}/favorites")]
    public async Task<ActionResult<List<UserBirdDto>>> GetFavorites(string userId)
    {
        return await userBirdService.GetFavorites(userId);
    }

    [HttpGet("{userId}/wanttosee")]
    public async Task<ActionResult<List<UserBirdDto>>> GetWantToSee(string userId)
    {
        return await userBirdService.GetWantToSee(userId);
    }

    [HttpGet("{userId}/found")]
    public async Task<ActionResult<List<UserBirdDto>>> GetFound(string userId)
    {
        return await userBirdService.GetFound(userId);
    }
}