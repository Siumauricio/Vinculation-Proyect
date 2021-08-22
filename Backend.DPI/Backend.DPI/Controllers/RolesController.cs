using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Backend.DPI.Models;
using Backend.DPI.Services;
using Backend.DPI.ModelDto;

namespace Backend.DPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly RolesRepository _rolesRepository = new RolesRepository();


        [HttpGet("GetRols")]
        public async Task<ActionResult<IEnumerable<Rol>>> Get()
        {
            var Roles = await _rolesRepository.GetRoles();

            if (Roles==null)
            {
                return NotFound();
            }
            return Ok(Roles);
        }

        [HttpPost("CreateRol")]
        public async Task<ActionResult<IEnumerable<Rol>>> CreateRol(string rolName)
        {
            var Roles = await _rolesRepository.CreateRolAsync(rolName);
            return Ok(Roles);
        }

        [HttpDelete("DeleteRol")]
        public async Task<ActionResult<IEnumerable<Rol>>> DeleteRol(string nameRol)
        {
            var Roles = await _rolesRepository.DeleteRolAsync(nameRol);
            return Ok(Roles);
        }
    }
}
