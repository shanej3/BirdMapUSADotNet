using System;
using API.DTOs;
using API.Interfaces;

namespace API.Services;

// Service for interacting with the RIDB API
// Currently only fetches nearby rec areas
public class RidbService : IRidbService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public RidbService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        // Get API Key from configuration
        _apiKey = configuration["Ridb:ApiKey"] ?? throw new ArgumentNullException("Ridb API Key not found in configuration.");

        // API Token header
        _httpClient.DefaultRequestHeaders.Add("apiKey", _apiKey);
    }

    public async Task<List<RecArea>> GetNearbyRecAreasAsync(double lat, double lng, int radiusKm)
    {
        // link to Ridb API
        double radiusMi = radiusKm * 0.621371; // convert km to miles
        
        var url = $"recareas?latitude={lat}&longitude={lng}&radius={radiusMi}";
        var data = await _httpClient.GetFromJsonAsync<RidbInitialResponseDto>(url);
        return data?.RecData ?? [];
    }
}
