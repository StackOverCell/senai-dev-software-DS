using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MinhaApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        // Static array of weather summaries
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        /// <summary>
        /// GET method to retrieve a list of weather forecasts.
        /// Address: GET /weatherforecast
        /// </summary>
        /// <returns>A list of weather forecasts.</returns>
        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            }).ToArray();
        }

        /// <summary>
        /// POST method to create a new weather forecast.
        /// Address: POST /weatherforecast
        /// </summary>
        /// <param name="forecast">The weather forecast to create.</param>
        /// <returns>The created weather forecast.</returns>
        [HttpPost]
        public IActionResult Post([FromBody] WeatherForecast forecast)
        {
            // Add data to storage (e.g., database)
            return Ok(forecast);
        }

        /// <summary>
        /// PUT method to update an existing weather forecast by ID.
        /// Address: PUT /weatherforecast/{id}
        /// </summary>
        /// <param name="id">The ID of the weather forecast to update.</param>
        /// <param name="forecast">The updated weather forecast.</param>
        /// <returns>No content.</returns>
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] WeatherForecast forecast)
        {
            // Update data for the given ID
            return NoContent();
        }

        /// <summary>
        /// DELETE method to remove a weather forecast by ID.
        /// Address: DELETE /weatherforecast/{id}
        /// </summary>
        /// <param name="id">The ID of the weather forecast to delete.</param>
        /// <returns>No content.</returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Delete data for the given ID
            return NoContent();
        }
    }

    // WeatherForecast class definition
    public class WeatherForecast
    {
        public DateTime Date { get; set; }
        public int TemperatureC { get; set; }
        public string Summary { get; set; }
    }
}