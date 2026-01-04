using API.DTOs;

namespace API.Interfaces;

public interface IUserBirdService
{
    Task<UserBirdDto> ToggleFavorite(string userId, string speciesCode, bool value);
    Task<UserBirdDto> ToggleWantToSee(string userId, string speciesCode, bool value);
    Task<UserBirdDto> ToggleFound(string userId, string speciesCode, bool value);
    Task<List<UserBirdDto>> GetUserBirds(string userId);
    Task<List<UserBirdDto>> GetFavorites(string userId);
    Task<List<UserBirdDto>> GetWantToSee(string userId);
    Task<List<UserBirdDto>> GetFound(string userId);
}
