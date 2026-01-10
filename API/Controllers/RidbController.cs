using API.DTOs;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // Controller to fetch RIDB API data (recreation areas)
    [Route("api/[controller]")]
    [ApiController]
    public class RidbController(IRidbService ridbService) : ControllerBase
    {

        // GET api/Ridb/NearbyRecAreas
        [HttpGet("NearbyRecAreas")]
        public async Task<ActionResult<IEnumerable<RecArea>>> GetNearbyRecAreas([FromQuery] LocationRequestDto request)
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
                // lat, lng, radiusKm, put in "Body" of POST call
                var recAreas = await ridbService.GetNearbyRecAreasAsync(
                    request.Lat,
                    request.Lng,
                    request.RadiusKm
                );

                // // return the recareas, assuming any are found
                if (recAreas.Any())
                {
                    return Ok(recAreas);
                }

                return NotFound("No recent observations found. Try increasing radius or changing coordinates.");
            }

            // catch server/API/other errors
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }
}
