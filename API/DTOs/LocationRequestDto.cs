using System;

namespace API.DTOs;

// DTO for passing location data in requests, previously each service had its own 
public class LocationRequestDto
{
    public double Lat { get; set; }
    public double Lng { get; set; }
    public int RadiusKm { get; set; }
}
