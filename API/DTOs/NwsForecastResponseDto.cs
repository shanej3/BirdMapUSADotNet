using System.Text.Json.Serialization;

namespace API.DTOs;

public class NwsForecastResponseDto
{
    [JsonPropertyName("properties")]
    public NwsForecastPropertiesDto? Properties { get; set; }
}

public class NwsForecastPropertiesDto
{
    [JsonPropertyName("periods")]
    public List<NwsForecastDto>? Periods { get; set; }
}
