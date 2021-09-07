using Backend.DPI.ModelDto;
using Backend.DPI.Models;
using Backend.DPI.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CriminalDataController : Controller
    {
        private readonly ICriminalDataRepository _criminalDataRepository;
        public CriminalDataController(ICriminalDataRepository criminalDataRepository)
        {
            _criminalDataRepository = criminalDataRepository;
        }

        [HttpGet("GetCriminalDataByDNI")]
        public async Task<ActionResult<IEnumerable<CriminalDatumDto>>> GetCriminalDataByDNI(string DNI)
        {
            var result = await _criminalDataRepository.GetCriminalDataByDNIAsync(DNI);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost("AddCriminalData")]
        public async Task<ActionResult<bool>> AddCriminalData(CriminalDatum CriminalDatum) {
            var result = await _criminalDataRepository.AddCriminalDataAsync(CriminalDatum);
            return Ok(result);
        }

        [HttpDelete("DeleteCriminalDataById")]
        public async Task<ActionResult<bool>> DeleteCriminalDataById(int Id) {
            var result = await _criminalDataRepository.DeleteCriminalDataByIdAsync(Id);
            return Ok(result);
        }

        [HttpGet("GetCriminalData")]

        public async Task<ActionResult<IEnumerable<object>>> GetCriminalData() {
            var result = await _criminalDataRepository.GetCriminalDataAsync();
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPut("UpdateCriminalDataById")]

        public async Task<ActionResult<bool>> UpdateCriminalDataById(CriminalDatum CriminalDatum) {
            var result = await _criminalDataRepository.UpdateCriminalDataByIdAsync(CriminalDatum);
            return Ok(result);
        }

    }
}
