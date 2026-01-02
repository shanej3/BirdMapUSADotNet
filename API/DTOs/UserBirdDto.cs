namespace API.DTOs;

public record UserBirdDto(string UserId, string SpeciesCode, bool IsFavorite, bool WantToSee, bool Found);