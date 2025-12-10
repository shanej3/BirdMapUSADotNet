using System;
using API.DTOs;

namespace API.Interfaces;

public interface IEbirdService
{
    Task<List<EBirdObservationDto>> GetNearbyObservationsAsync(double lat, double lng, int radiusKm);
    Task<List<EBirdObservationDto>> GetNotableObservationsAsync(double lat, double lng, int radiusKm);
}


