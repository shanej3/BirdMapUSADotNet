using System;
using System.Text.Json.Serialization;

namespace API.DTOs;

// DTO for response from Ebird API

public class EBirdObservationDto
{
    [JsonPropertyName("speciesCode")]
    public string SpeciesCode { get; set; } = string.Empty;

    [JsonPropertyName("comName")]
    public string CommonName { get; set; } = string.Empty;

    [JsonPropertyName("sciName")]
    public string ScientificName { get; set; } = string.Empty;

    [JsonPropertyName("locId")]
    public string LocationId { get; set; } = string.Empty;

    [JsonPropertyName("locName")]
    public string LocationName { get; set; } = string.Empty;

    [JsonPropertyName("lat")]
    public double Latitude { get; set; }

    [JsonPropertyName("lng")]
    public double Longitude { get; set; }

    [JsonPropertyName("obsDt")]
    public string ObservationDate { get; set; } = string.Empty;

    [JsonPropertyName("howMany")]
    public int Count { get; set; }
    
}
