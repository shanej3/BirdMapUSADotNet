using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NwsController(INwsService nwsService) : ControllerBase
    {
        [HttpGet("InitialData")]
        public async Task<ActionResult<IEnumerable<NwsInitialDto>>> GetNwsInitialData([FromQuery] LocationRequestDto request)
        {
            if (request.Lat == 0 || request.Lng == 0)
            {
                return BadRequest("Latitude and Longitude are required.");
            }

            // try to return the actual data
            try
            {
                var initial_data = await nwsService.GetNwsInitialDataAsync(
                    request.Lat,
                    request.Lng
                );

                if (initial_data != null)
                {
                    return Ok(initial_data);
                }

                return NotFound("Error: No NWS initial data found.");
            }

            // catch server/API/other errors
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpGet("ForecastData")]
        public async Task<ActionResult<IEnumerable<NwsForecastDto>>> GetNwsForecastData([FromQuery] string forecastUrl)
        {
            if (string.IsNullOrEmpty(forecastUrl))
            {
                return BadRequest("Forecast URL is required.");
            }

            // try to return the actual data
            try
            {
                var forecast_data = await nwsService.GetNwsForecastAsync(
                    forecastUrl
                );

                if (forecast_data != null)
                {
                    return Ok(forecast_data);
                }

                return NotFound("No forecast data found for the provided URL.");
            }

            // catch server/API/other errors
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }
}
