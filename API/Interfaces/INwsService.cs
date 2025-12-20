using System;
using API.DTOs;

namespace API.Interfaces;

public interface INwsService
{
    Task<NwsInitialDto?> GetNwsInitialDataAsync(double lat, double lng);
    Task<List<NwsForecastDto>> GetNwsForecastAsync(string forecastUrl);
}
