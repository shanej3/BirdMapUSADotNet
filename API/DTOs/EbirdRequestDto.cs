using System;

namespace API.DTOs;

// DTO for requesting Ebird API, "lat", "lng", "radiusKm" are put into the body of API requests

public class EBirdRequestDto
{
    public double Lat { get; set; }
    public double Lng { get; set; }
    public int RadiusKm { get; set; } = 10;
}

