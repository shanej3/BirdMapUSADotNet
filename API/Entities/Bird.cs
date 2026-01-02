using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Bird
{
    [Key]
    public string SpeciesCode { get; set; } = string.Empty;
    public string? CommonName { get; set; }    
    public string? ScientificName { get; set; }
    public ICollection<UserBird> UserBirds { get; set; } = [];
}
