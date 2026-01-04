using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class UserBirdService(AppDbContext context) : IUserBirdService
{
    private readonly AppDbContext _context = context;

    public async Task<UserBirdDto> ToggleFavorite(string userId, string speciesCode, bool value)
    {
        var ub = await GetOrCreateUserBird(userId, speciesCode);
        ub.IsFavorite = value;
        await _context.SaveChangesAsync();
        return new UserBirdDto(ub.UserId, ub.SpeciesCode, ub.IsFavorite, ub.WantToSee, ub.Found);
    }

    public async Task<UserBirdDto> ToggleWantToSee(string userId, string speciesCode, bool value)
    {
        var ub = await GetOrCreateUserBird(userId, speciesCode);
        ub.WantToSee = value;
        await _context.SaveChangesAsync();
        return new UserBirdDto(ub.UserId, ub.SpeciesCode, ub.IsFavorite, ub.WantToSee, ub.Found);
    }

    public async Task<UserBirdDto> ToggleFound(string userId, string speciesCode, bool value)
    {
        var ub = await GetOrCreateUserBird(userId, speciesCode);
        ub.Found = value;
        await _context.SaveChangesAsync();
        return new UserBirdDto(ub.UserId, ub.SpeciesCode, ub.IsFavorite, ub.WantToSee, ub.Found);
    }

    public async Task<List<UserBirdDto>> GetUserBirds(string userId)
    {
        return await _context.UserBirds
            .AsNoTracking()
            .Where(ub => ub.UserId == userId)
            .Select(ub => new UserBirdDto(ub.UserId, ub.SpeciesCode, ub.IsFavorite, ub.WantToSee, ub.Found))
            .ToListAsync();
    }

    public async Task<List<UserBirdDto>> GetFavorites(string userId)
    {
        return await _context.UserBirds
            .AsNoTracking()
            .Where(ub => ub.UserId == userId && ub.IsFavorite)
            .Select(ub => new UserBirdDto(ub.UserId, ub.SpeciesCode, ub.IsFavorite, ub.WantToSee, ub.Found))
            .ToListAsync();
    }

    public async Task<List<UserBirdDto>> GetWantToSee(string userId)
    {
        return await _context.UserBirds
            .AsNoTracking()
            .Where(ub => ub.UserId == userId && ub.WantToSee)
            .Select(ub => new UserBirdDto(ub.UserId, ub.SpeciesCode, ub.IsFavorite, ub.WantToSee, ub.Found))
            .ToListAsync();
    }

    public async Task<List<UserBirdDto>> GetFound(string userId)
    {
        return await _context.UserBirds
            .AsNoTracking()
            .Where(ub => ub.UserId == userId && ub.Found)
            .Select(ub => new UserBirdDto(ub.UserId, ub.SpeciesCode, ub.IsFavorite, ub.WantToSee, ub.Found))
            .ToListAsync();
    }

    private async Task<UserBird> GetOrCreateUserBird(string userId, string speciesCode)
    {
        var ub = await _context.UserBirds.FindAsync(userId, speciesCode);
        if (ub == null)
        {
            var bird = await _context.Birds.FindAsync(speciesCode);
            if (bird == null)
            {
                _context.Birds.Add(new Bird { SpeciesCode = speciesCode, CommonName = speciesCode });
            }
            ub = new UserBird { UserId = userId, SpeciesCode = speciesCode };
            _context.UserBirds.Add(ub);
        }
        return ub;
    }
}
