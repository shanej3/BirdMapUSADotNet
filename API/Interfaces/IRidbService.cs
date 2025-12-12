using System;
using API.DTOs;

namespace API.Interfaces;

public interface IRidbService
{
      Task<List<RecArea>> GetNearbyRecAreasAsync(double lat, double lng, int radiusKm);
}