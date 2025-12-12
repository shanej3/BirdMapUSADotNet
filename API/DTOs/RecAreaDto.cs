using System;
using System.Text.Json.Serialization;

namespace API.DTOs;

public class RecArea
{
    [JsonPropertyName("RecAreaID")]
    public string? RecAreaId { get; set; }

    [JsonPropertyName("RecAreaName")]
    public string? RecAreaName { get; set; }

    [JsonPropertyName("RecAreaLatitude")]
    public double? RecAreaLatitude { get; set; }

    [JsonPropertyName("RecAreaLongitude")]
    public double? RecAreaLongitude { get; set; }

    [JsonPropertyName("RecAreaDescription")]
    public string? RecAreaDescription { get; set; }
    
}
