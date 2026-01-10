namespace API.DTOs;

// DTO for user bird data (individual bird entries for a user)
public record UserBirdDto(
    string UserId, string SpeciesCode, bool IsFavorite, bool WantToSee, bool Found);