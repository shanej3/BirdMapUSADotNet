using System;
using API.DTOs;
using API.Interfaces;

namespace API.Services;

public class NwsService : INwsService
{
    private readonly HttpClient? _httpClient;

     public NwsService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        // NWS requires contact info in header
        string contact = configuration["Contact"] ?? throw new ArgumentNullException("Contact not found in configuration.");
        if (!_httpClient.DefaultRequestHeaders.UserAgent.TryParseAdd($"BirdMapUSA ({contact})"))  
        {
            throw new ArgumentException("Invalid User-Agent header");
        }
    }

    public async Task<NwsInitialDto?> GetNwsInitialDataAsync(double lat, double lng)
    {
        var url = $"/points/{lat},{lng}";
        var response = await _httpClient!.GetAsync(url);
        response.EnsureSuccessStatusCode(); 

        var data = await response.Content.ReadFromJsonAsync<NwsInitialDto>();
        return data ?? null;
    }

    async Task<List<NwsForecastDto>> INwsService.GetNwsForecastAsync(string forecastUrl)
    {
        var url = forecastUrl;
        var response = await _httpClient!.GetAsync(url);
        response.EnsureSuccessStatusCode();

        var data = await response.Content.ReadFromJsonAsync<NwsForecastResponseDto>();
        return data?.Properties?.Periods ?? [];  // nested data in the response
    }
}
