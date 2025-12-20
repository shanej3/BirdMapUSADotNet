using System;
using System.Text.Json.Serialization;

namespace API.DTOs;

// NWS API requires 2 API calls, this DTO maps the 1st response
// most of the data we want is in the first "properties", including the grid numbers and office we pass to the 2nd API call
// relativelocation, which also has a "properties" is needed to get city/state

public class NwsInitialDto
{
    [JsonPropertyName("properties")]  // "properties" contain most of the data we want
    public NwsInitialProperties? Properties { get; set; }
}

public class NwsInitialProperties
{
    [JsonPropertyName("forecast")]  // can just call this for forecast
    public string? ForecastUrl { get; set; }

    [JsonPropertyName("forecastGridData")]
    public string? ForecastGridDataUrl { get; set; }

    [JsonPropertyName("relativeLocation")]
    public NwsRelativeLocation? RelativeLocation { get; set; }
}

public class NwsRelativeLocation
{
    [JsonPropertyName("properties")]  // relativeLocation --> properties 
    public NwsRelativeLocationProperties? Properties { get; set; }
}

public class NwsRelativeLocationProperties  // relativeLocation --> properties --> city, state
{
    [JsonPropertyName("city")]
    public string? City { get; set; }

    [JsonPropertyName("state")]
    public string? State { get; set; }
}