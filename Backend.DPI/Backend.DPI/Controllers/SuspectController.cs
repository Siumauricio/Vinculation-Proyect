using Backend.DPI.Models;
using Backend.DPI.Repository;
using Microsoft.AspNetCore.Authorization;
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
   // [Authorize]
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


        [HttpPost("AddSuspect")]
        public async Task<ActionResult<bool>> AddSuspect(Suspect suspect)
        {
            var suspects = await _suspectRepository.AddSuspectAsync(suspect);
            return suspects;
        }


        [HttpGet("GetRegisterPerDayPerUser")]
        public async Task<ActionResult<IEnumerable<Suspect>>> GetRegisterPerDayPerUser(string username)
        {
            var suspects = await _suspectRepository.GetSuspectsInsertedByDateByUserAsync(username);
            if (suspects == null)
            {
                return NotFound();
            }
            return Ok(suspects);
        }


        [HttpGet("GetRegisterPerDay")]
        public async Task<ActionResult<IEnumerable<Suspect>>> GetRegisterPerDay()
        {
            var suspects = await _suspectRepository.GetSuspectsInsertedByDateAsync();
            if (suspects == null)
            {
                return NotFound();
            }
            return Ok(suspects);
        }


        [HttpGet("GetSuspectByDNI")]
        public async Task<ActionResult<IEnumerable<Suspect>>> GetSuspectByDNI(string dni)
        {
            var suspects = await _suspectRepository.GetSuspectByDni(dni);
            if (suspects == null)
            {
                return NotFound();
            }
            return Ok(suspects);
        }

        [HttpDelete("DeleteSuspect")]
        public async Task<ActionResult<IEnumerable<bool>>> DeleteSuspect(string DNI)
        {
            var suspects = await _suspectRepository.DeleteSuspect(DNI);
            return Ok(suspects);
        }

        [HttpPost("UpdateSuspect")]
        public async Task<ActionResult<IEnumerable<bool>>> UpdateSuspect(string lastDNI, Suspect suspectModified)
        {
            var suspects = await _suspectRepository.ModifySuspect(lastDNI,suspectModified);
            if (suspects == false)
            {
                return NotFound();
            }
            return Ok(suspects);
        }
    }
}
