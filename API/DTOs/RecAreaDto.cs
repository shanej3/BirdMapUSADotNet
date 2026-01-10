using System;
using System.Text.Json.Serialization;

namespace API.DTOs;

// DTO for recreation area data from RIDB API
public class RecArea
{
    [JsonPropertyName("RecAreaID")]
    public string? Id { get; set; }

    [JsonPropertyName("RecAreaName")]
    public string? AreaName { get; set; }

    [JsonPropertyName("RecAreaLatitude")]
    public double? Latitude { get; set; }

    [JsonPropertyName("RecAreaLongitude")]
    public double? Longitude { get; set; }

    [JsonPropertyName("RecAreaDescription")]
    public string? Description { get; set; }
    
}
