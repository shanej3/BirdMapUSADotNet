using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities;

// Entity representing a bird species
public class Bird
{
    [Key]
    public string SpeciesCode { get; set; } = string.Empty;
    public string? CommonName { get; set; }    
    public string? ScientificName { get; set; }
    public ICollection<UserBird> UserBirds { get; set; } = [];
}
