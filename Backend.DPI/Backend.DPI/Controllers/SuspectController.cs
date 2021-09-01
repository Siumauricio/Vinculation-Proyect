using Backend.DPI.Models;
using Backend.DPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SuspectController : Controller
    {
        private readonly SuspectRepository _suspectRepository = new SuspectRepository();

        [HttpGet("GetSuspects")]
        public async Task<ActionResult<IEnumerable<Suspect>>> GetSuspects()
        {
            var suspects = await _suspectRepository.GetSuspectsAsync();
            if (suspects == null)
            {
                return NotFound();
            }
            return Ok(suspects);
        }

    }
}
