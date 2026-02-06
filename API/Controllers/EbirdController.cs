using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // Controller to fetch Ebird API data (bird findings)
    [ApiController]
    [Route("api/[controller]")]
    public class EbirdController(IEbirdService ebirdService) : ControllerBase
    {
        [HttpGet("NearbyObservations")]
        public async Task<ActionResult<IEnumerable<EBirdObservationDto>>> GetNearbyObservations([FromQuery] LocationRequestDto request)
        {
            // basic validation checks, maybe not a perfect check for lat/lng but the values cant be zero anyway (in USA)
            if (request.Lat == 0 || request.Lng == 0)
            {
                return BadRequest("Latitude and Longitude are required.");
            }
            if (request.RadiusKm <= 0)
            {
                return BadRequest("RadiusKm must be greater than zero.");
            }

            // try to return the actual data
            try
            {
                var observations = await ebirdService.GetNearbyObservationsAsync(
                    request.Lat,
                    request.Lng,
                    request.RadiusKm
                );

                // return the observations, assuming any are found
                if (observations.Count != 0)
                {
                    return Ok(observations);
                }

                return NotFound("No recent observations found. Try increasing radius or changing coordinates.");
            }

            // catch server/API/other errors
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        // GET  api/Ebird/NotableObservations
        [HttpGet("NotableObservations")]
        public async Task<ActionResult<IEnumerable<EBirdObservationDto>>> GetNotableObservations([FromQuery] LocationRequestDto request)
        {
            if (request.Lat == 0 || request.Lng == 0)
            {
                return BadRequest("Latitude and Longitude are required.");
            }

            try
            {
                var observations = await ebirdService.GetNotableObservationsAsync(
                    request.Lat,
                    request.Lng,
                    request.RadiusKm
                );

                if (observations.Any())
                {
                    return Ok(observations);
                }

                return NotFound("No notable observations found. Try increasing radius or changing coordinates.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }


}
