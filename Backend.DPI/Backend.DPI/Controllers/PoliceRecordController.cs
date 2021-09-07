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

    public class PoliceRecordController : Controller
    {
        private readonly PoliceRecordRepository _policeRecordRepository = new PoliceRecordRepository();

        [HttpGet("GetPoliceRecords")]
        public async Task<ActionResult<IEnumerable<PoliceRecord>>> Get()
        {
            var result = await _policeRecordRepository.GetPoliceRecord();
            return Ok(result);
        }

        [HttpGet("GetPoliceRecordsByDNI")]
        public async Task<ActionResult<IEnumerable<PoliceRecord>>> GetPoliceRecordsByDNI(string dniSuspect)
        {
            var result = await _policeRecordRepository.GetPoliceRecordByDNISuspect(dniSuspect);
            return Ok(result);
        }

        [HttpPost("CreatePoliceRecord")]
        public async Task<ActionResult<IEnumerable<PoliceRecord>>> CreatePoliceRecord(PoliceRecord policeRecord)
        {
            var result = await _policeRecordRepository.CreatePoliceRecord(policeRecord);
            return Ok(result);
        }

        [HttpDelete("DeletePoliceRecord")]
        public async Task<ActionResult<IEnumerable<PoliceRecord>>> DeletePoliceRecord(int idPoliceRecord)
        {
            var result = await _policeRecordRepository.DeletePoliceRecord(idPoliceRecord);
            return Ok(result);
        }
        [HttpPost("ModifyPoliceRecord")]
        public async Task<ActionResult<IEnumerable<PoliceRecord>>> ModifyPoliceRecord(PoliceRecord policeRecord)
        {
            var result = await _policeRecordRepository.ModifyPoliceRecord(policeRecord);
            return Ok(result);
        }
    }
}
