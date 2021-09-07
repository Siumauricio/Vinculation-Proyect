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
    public class PoliceRecordController : Controller
    {
        private readonly PoliceRecordRepository _policeRecordRepository = new PoliceRecordRepository();


        //[HttpGet("GetRols")]
        //public async Task<ActionResult<IEnumerable<Rol>>> Get()
        //{
        //    var Roles = await _rolesRepository.GetRoles();

        //    if (Roles == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(Roles);
        //}

        //[HttpGet("GetRolByName")]
        //public async Task<ActionResult<IEnumerable<Rol>>> GetRolByName(string rolName)
        //{
        //    var Roles = await _rolesRepository.getRolbyName(rolName);

        //    if (Roles == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(Roles);
        //}

        //[HttpPost("CreateRol")]
        //public async Task<ActionResult<IEnumerable<Rol>>> CreateRol(string rolName)
        //{
        //    var Roles = await _rolesRepository.CreateRolAsync(rolName);
        //    return Ok(Roles);
        //}
    }
}
