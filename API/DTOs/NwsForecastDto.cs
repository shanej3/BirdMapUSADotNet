using System.Text.Json.Serialization;

namespace API.DTOs;

// NWS forecast periods data

public class NwsForecastDto
{
    [JsonPropertyName("number")]  // index basically
    public int Number { get; set; }

    [JsonPropertyName("name")]  // "Monday Night", "Tuesday Morning""
    public string? Name { get; set; }

    [JsonPropertyName("temperature")]
    public double? Temperature { get; set; }

    [JsonPropertyName("temperatureUnit")]
    public string? TemperatureUnit { get; set; }

    [JsonPropertyName("shortForecast")]
    public string? ShortForecast { get; set; }

    [JsonPropertyName("detailedForecast")]
    public string? DetailedForecast { get; set; }

    [JsonPropertyName("probabilityOfPrecipitation")]
    public ProbabilityMetric? ProbabilityOfPrecipitation { get; set; }    
}

public class ProbabilityMetric
{
    [JsonPropertyName("unitCode")]
    public string? UnitCode { get; set; }

    [JsonPropertyName("value")]  // the value we care about, 20, 30, 45% chance of rain for example
    public double? Value { get; set; }
}