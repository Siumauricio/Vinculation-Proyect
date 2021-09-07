using Backend.DPI.ModelDto;
using Backend.DPI.Models;
using Backend.DPI.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
    public class PrivilegeController : Controller
    {
        private readonly IPrivilegeRepository privilegeRepository;

        public PrivilegeController(IPrivilegeRepository _privilegeRepository)
        {
            this.privilegeRepository = _privilegeRepository;
        }

        [HttpPost("CreatePrivilege")]

        public async Task<ActionResult<PrivilegeDto>> CreatePrivilege([FromBody] Privilege Privilege)
        {

            var result = await privilegeRepository.CreatePrivilegeAsync(Privilege);
            return Ok(new PrivilegeDto
            {
                Name = Privilege.Name
            }); ;

        }


        [HttpPost("CreateRolPrivilege")]

        public async Task<ActionResult<RolPrivilegeDto>> CreateRolPrivilege([FromBody] RolPrivilege RolPrivilege)
        {
            var result = await privilegeRepository.CreateRolPrivilegeAsync(RolPrivilege);
            return Ok(new RolPrivilegeDto
            {
                PrivilegeIdPrivilege = RolPrivilege.PrivilegeIdPrivilege,
                RolIdRol = RolPrivilege.RolIdRol
            });

        }

        [HttpGet("GetPrivileges")]

        public async Task<ActionResult<IEnumerable<PrivilegeDto>>> GetPrivileges()
        {
            var result = await privilegeRepository.GetPrivilegesAsync();
            return Ok(result.Select(x => new PrivilegeDto
            {
                IdPrivilege = x.IdPrivilege,
                Name = x.Name
            }));
        }

        [HttpGet("GetRolPrivileges")]

        public async Task<ActionResult<IEnumerable<RolPrivilegeDto>>> GetRolPrivileges()
        {
            var result = await privilegeRepository.GetRolPrivilegesAsync();
            return Ok(result);
        }


        [HttpPost("AddUserRolPrivilege")]
        public async Task<ActionResult<UserRolPrivilegeDto>> AddUserRolPrivilege(UserRolPrivilege UserRolPrivilege)
        {
            var result = await privilegeRepository.AddUserRolPrivilegeAsync(UserRolPrivilege);
            return Ok(result = new UserRolPrivilege
            {

                UserUsername = UserRolPrivilege.UserUsername,
                IdRolPrivilege = UserRolPrivilege.IdRolPrivilege,
                SpecialPrivilege = UserRolPrivilege.SpecialPrivilege
            });
        }


        [HttpGet("GetUserRolPrivileges")]

        public async Task<ActionResult<IEnumerable<UserRolPrivilegeDto>>> GetUserRolPrivileges()
        {
            var result = await privilegeRepository.GetUserRolPrivilegesAsync();
            return Ok(result);
        }

        [HttpGet("GetRolPrivilegeByName")]

        public async Task<ActionResult<RolPrivilegeDto>> GetRolPrivilegeByName(string NameRolPrivilege)
        {
            var result = await privilegeRepository.GetRolPrivilegeByNameAsync(NameRolPrivilege);
            if (result == null) return NotFound();
            return Ok(result);
        }


        [HttpPost("GetUserRolPrivilegesByUser")]

        public async Task<ActionResult<IEnumerable<RolPrivilegeDto>>> GetUserRolPrivilegesByUser(string username)
        {
            var result = await privilegeRepository.GetUserRolPrivilegesByUserAsync(username);
            if (result == null) return NotFound();
            return Ok(result);

        }

        [HttpDelete("DeleteRolPrivilegeById")]

        public async Task<ActionResult<bool>> DeleteRolPrivilegeById(int IdRolPrivilege)
        {
            var result = await privilegeRepository.DeleteRolPrivilegeByIdAsync(IdRolPrivilege);
            return Ok(result);
        }

        [HttpDelete("DeleteUserRolPrivilegeById")]
        public async Task<ActionResult<bool>> DeleteUserRolPrivilegeById(int IdUserRolPrivilege)
        {
            var result = await privilegeRepository.DeleteUserRolPrivilegeByIdAsync(IdUserRolPrivilege);
            return Ok(result);
        }


    }
}
