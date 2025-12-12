using System;

namespace API.DTOs;

public class RidbRequestDto
{
    public double Lat { get; set; }
    public double Lng { get; set; }
    public int RadiusKm { get; set; } = 10;
}
