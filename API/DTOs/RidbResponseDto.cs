using System;
using System.Text.Json.Serialization;

namespace API.DTOs;

// DTO for response from RIDB API
public class RidbInitialResponseDto
{
    [JsonPropertyName("RECDATA")]
    public List<RecArea>? RecData {get; set;}
}
