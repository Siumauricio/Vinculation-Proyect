using Backend.DPI.ModelDto;
using Backend.DPI.Models;
using Backend.DPI.Repository;
using Microsoft.AspNetCore.Authorization;
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
    public class CriminalRecordController : Controller
    {
        private readonly ICriminalRecordRepository criminalRecord;
        public CriminalRecordController(ICriminalRecordRepository criminalRecord)
        {
            this.criminalRecord = criminalRecord;

        }


        [HttpGet("GetCriminalRecords")]
        public async Task<ActionResult<IEnumerable<CriminalRecordDto>>> GetCriminalRecords() {
            var result = await criminalRecord.GetCriminalRecordsAsync();
            if (result == null) return Ok(null);
            return Ok(result.Select(x => new CriminalRecordDto
            {
                 Crime=x.Crime,
                 IdCriminalRecord=x.IdCriminalRecord,
                 ModuleCellPrison=x.ModuleCellPrison,
                 PenitentiaryCenter=x.PenitentiaryCenter,
                 SentenceFinalDate=x.SentenceFinalDate,
                 SentenceStartDate=x.SentenceStartDate,
                 SuspectDni=x.SuspectDni,
            }));
        }

        [HttpPost("AddCriminalRecord")]

        public async Task<ActionResult<bool>> AddCriminalRecord([FromBody] CriminalRecord CriminalRecord) {
            var result = await criminalRecord.AddCriminalRecordAsync(CriminalRecord);
            return Ok(result);
        }

        [HttpDelete("DeleteCriminalRecord")]

        public async Task<ActionResult<bool>> DeleteCriminalRecord(int IdCriminalRecord) {
            var result = await criminalRecord.DeleteCriminaRecordAsync(IdCriminalRecord);
            return Ok(result);
        }

        [HttpGet("GetCriminalRecordByDNI")]

        public async Task<IReadOnlyList<CriminalRecord>> GetCriminalRecordByDNI(string DNI) {
            var result = await criminalRecord.GetCriminalRecordByDNIAsync(DNI);
            return result;
        
        }


        [HttpPut("UpdateCriminalRecordByDni")]

        public async Task<ActionResult<bool>> UpdateCriminalRecordByDni([FromBody] CriminalRecord CriminalRecord) {
            var result = await criminalRecord.UpdateCriminalRecordAsync(CriminalRecord);
            return Ok(result);
        }

    }
}
