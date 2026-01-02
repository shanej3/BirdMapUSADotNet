using System;

namespace API.Entities;

public class UserBird
{
    public string UserId { get; set; } = string.Empty; 
    public string SpeciesCode { get; set; } = string.Empty;
    public bool IsFavorite { get; set; }
    public bool WantToSee { get; set; }
    public bool Found { get; set; }

    public AppUser User { get; set; } = null!;
    public Bird Bird { get; set; } = null!;
}
