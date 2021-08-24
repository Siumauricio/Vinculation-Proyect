﻿using Backend.DPI.ModelDto;
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
    public class PrivilegeController : Controller
    {
        private readonly IPrivilegeRepository privilegeRepository;

        public PrivilegeController(IPrivilegeRepository _privilegeRepository)
        {
            this.privilegeRepository = _privilegeRepository;
        }

        [HttpPost("CreatePrivilege")]

        public async Task<ActionResult<PrivilegeDto>> CreatePrivilege([FromBody] Privilege Privilege) {

            var result = await privilegeRepository.CreatePrivilegeAsync(Privilege);
            return Ok(new PrivilegeDto
            {
                Name = Privilege.Name
            }); ;

        }


        [HttpPost("CreateRolPrivilege")]

        public async Task<ActionResult<RolPrivilegeDto>> CreateRolPrivilege([FromBody] RolPrivilege RolPrivilege) {
            var result = await privilegeRepository.CreateRolPrivilegeAsync(RolPrivilege);
            return Ok(new RolPrivilegeDto
            {
                PrivilegeIdPrivilege = RolPrivilege.PrivilegeIdPrivilege,
                RolIdRol = RolPrivilege.RolIdRol
            });

        }


        [HttpGet("GetPrivileges")]

        public async Task<ActionResult<IEnumerable<PrivilegeDto>>> GetPrivileges() {
            var result = await privilegeRepository.GetPrivilegesAsync();
            return Ok(result.Select(x => new PrivilegeDto
            {
                IdPrivilege=x.IdPrivilege,
                Name=x.Name
            }));
        }

        [HttpGet("GetRolPrivilege")]

        public async Task<ActionResult<IEnumerable<RolPrivilegeDto>>> GetRolPrivileges() {
            var result = await privilegeRepository.GetRolPrivilegesAsync();
            return Ok(result.Select(x => new RolPrivilegeDto
            {
                IdRolPrivilege = x.IdRolPrivilege,
                PrivilegeIdPrivilege = x.PrivilegeIdPrivilege,
                RolIdRol = x.RolIdRol
            }));
        }


        [HttpPost("AddUserRolPrivilege")]
        public async Task<ActionResult<UserRolPrivilegeDto>> AddUserRolPrivilege(UserRolPrivilege UserRolPrivilege) {
            var result = await privilegeRepository.AddUserRolPrivilege(UserRolPrivilege);
            return Ok(result = new UserRolPrivilege
            {
                
                UserUsername = UserRolPrivilege.UserUsername,
                IdRolPrivilege = UserRolPrivilege.IdRolPrivilege,
                SpecialPrivilege = UserRolPrivilege.SpecialPrivilege
            });
        }



    }
}