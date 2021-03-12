using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;

namespace MySecureApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Kalt", "Super Kalt", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }
        [Authorize]
        [RequiredScope("Data.GetAll")]
        [HttpGet("GetDataByScope")]
        public IEnumerable<WeatherForecast> GetByScope()
        {
            // this method is only accessible whith the given scope granted to the calling user / app
            // in this exapmple this is used for user access
            var rng = new Random();
            return Enumerable.Range(1, 2).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = 25,
                Summary = "GetByScope!"
            })
            .ToArray();
        }

        [Authorize(Roles = "console.read")]
        [HttpGet("GetDataByConsoleRole")]
        public IEnumerable<WeatherForecast> GetByRole()
        {
            // this method is only accessible whith the given role (used for app access)
            var rng = new Random();
            return Enumerable.Range(1, 2).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = 0,
                Summary = "GetByConsoleRole!"
            })
            .ToArray();
        }

        [Authorize(Roles = "user.read,user.write")]
        [HttpGet("GetDataByUserRole")]
        public IEnumerable<WeatherForecast> GetByUserRole()
        {
            // this method is only accessible whith the given role (used for app access)
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = -100,
                Summary = "GetByUserRole!"
            })
            .ToArray();
        }









    }
}
