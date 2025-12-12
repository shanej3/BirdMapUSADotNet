using System;
using System.Text.Json.Serialization;

namespace API.DTOs;

public class RidbInitialResponseDto
{
    [JsonPropertyName("RECDATA")]
    public List<RecArea>? RecData {get; set;}
}
