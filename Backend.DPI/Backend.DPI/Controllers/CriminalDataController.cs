using Backend.DPI.ModelDto;
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
    [Authorize]
    public class CriminalDatumController : Controller
    {
        private readonly ICriminalHistoryRepository _criminalDataRepository;
        public CriminalDatumController(ICriminalHistoryRepository criminalDataRepository)
        {
            this._criminalDataRepository = criminalDataRepository;
        }

        
        [HttpGet("GetCriminalDataByDNI")]
        public async Task<ActionResult<IEnumerable<object>>> GetCriminalDataByDNI(string DNI)
        {
            var result = await _criminalDataRepository.GetCriminalHistoryByDNIAsync(DNI);
            if (result == null) return NotFound();
            return Ok(result);
        }

        
        [HttpPost("AddCriminalData")]
        public async Task<ActionResult<bool>> AddCriminalData([FromBody] CriminalHistory CriminalHistory)
        {
            var result = await _criminalDataRepository.AddCriminalHistoryAsync(CriminalHistory);
            return Ok(result);
        }

        [HttpDelete("DeleteCriminalDataById")]
        public async Task<ActionResult<bool>> DeleteCriminalDataById(int Id)
        {
            var result = await _criminalDataRepository.DeleteCriminalHistoryByIdAsync(Id);
            return Ok(result);
        }
        

        [HttpGet("GetCriminalData")]
        public async Task<ActionResult<IEnumerable<object>>> GetCriminalData()
        {
            var result = await _criminalDataRepository.GetCriminalHistoryAsync();
            if (result == null) return NotFound();
            return Ok(result);
        }


        [HttpPut("UpdateCriminalDataById")]
        public async Task<ActionResult<bool>> UpdateCriminalDataById([FromBody] CriminalHistory CriminalDatum)
        {
            var result = await _criminalDataRepository.UpdateCriminalHistoryByIdAsync(CriminalDatum);
            return Ok(result);
        }
        
    }
}
