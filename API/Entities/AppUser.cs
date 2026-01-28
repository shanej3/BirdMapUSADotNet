using System;

namespace API.Entities;

// Entity representing an application user
public class AppUser
{
    public string Id { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    
    // public ICollection<UserBird> UserBirds { get; set; } = new List<UserBird>();
}
