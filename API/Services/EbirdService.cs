using API.DTOs;
using API.Interfaces;

namespace API.Services;

public class EbirdService : IEbirdService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public EbirdService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        // Get API Key 
        _apiKey = configuration["Ebird:ApiKey"] ?? throw new ArgumentNullException("Ebird API Key not found in configuration.");

        // API Token header
        _httpClient.DefaultRequestHeaders.Add("X-eBirdApiToken", _apiKey);
    }

    public async Task<List<EBirdObservationDto>> GetNearbyObservationsAsync(double lat, double lng, int radiusKm)
    {
        // link to ebird api
        var url = $"/v2/data/obs/geo/recent?lat={lat}&lng={lng}&dist={radiusKm}";
        
        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode(); 

        // Deserialize JSON response
        var data = await response.Content.ReadFromJsonAsync<List<EBirdObservationDto>>();
        return data ?? [];
    }

    public async Task<List<EBirdObservationDto>> GetNotableObservationsAsync(double lat, double lng, int radiusKm)
    {
        var url = $"/v2/data/obs/geo/recent/notable?lat={lat}&lng={lng}&dist={radiusKm}";
        
        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode(); 

        var data = await response.Content.ReadFromJsonAsync<List<EBirdObservationDto>>();
        return data ?? [];
    }

}