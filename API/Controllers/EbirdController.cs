using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EbirdController : ControllerBase
    {
        private readonly IEbirdService _ebirdService;

        public EbirdController(IEbirdService ebirdService)
        {
            _ebirdService = ebirdService;
        }

        // POST api/Ebird/NearbyObservations
        [HttpPost("NearbyObservations")]
        public async Task<ActionResult<IEnumerable<EBirdObservationDto>>> GetNearbyObservations([FromBody] EBirdRequestDto request)
        {
            // basic validation checks
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
                // lat, lng, radiusKm, put in "Body" of POST call
                var observations = await _ebirdService.GetNearbyObservationsAsync(
                    request.Lat,
                    request.Lng,
                    request.RadiusKm
                );

                // return the observations, assuming any are found
                if (observations.Any())
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

        // POST api/Ebird/NotableObservations
        [HttpPost("NotableObservations")]
        public async Task<ActionResult<IEnumerable<EBirdObservationDto>>> GetNotableObservations([FromBody] EBirdRequestDto request)
        {
            if (request.Lat == 0 || request.Lng == 0)
            {
                return BadRequest("Latitude and Longitude are required.");
            }

            try
            {
                var observations = await _ebirdService.GetNotableObservationsAsync(
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
