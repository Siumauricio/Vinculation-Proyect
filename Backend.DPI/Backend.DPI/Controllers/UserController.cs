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
    public class UserController : Controller
    {
        private readonly UserRepository _userRepository = new UserRepository();

        [Authorize]
        [HttpGet("GetUsers")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var Users = await _userRepository.GetUsersAsync();

            if (Users == null)
            {
                return NotFound();
            }
            return Ok(Users);
        }

        [Authorize]
        [HttpGet("UserById")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersById(string username)
        {
            var User =  await _userRepository.GetUserByUsernameAsync(username);

            return Ok(User);
        }

        [Authorize]
        [HttpPost("AddUser")]
        public async Task<ActionResult<IEnumerable<User>>> AddUser(UserDto user)
        {
            var User = await _userRepository.CreateUserAsync(user);
            return Ok(User);
        }

        [Authorize]
        [HttpPost("UpdatePassword")]
        public async Task<ActionResult<IEnumerable<User>>> UpdatePassword(string username,string password)
        {
            var User = await _userRepository.UpdatePasswordUserAsync(username, password);
            return Ok(User);
        }

        [Authorize]
        [HttpPost("UpdateRol")]
        public async Task<ActionResult<IEnumerable<User>>> UpdateRol(string username, int rol)
        {
            var User = await _userRepository.UpdateRolUserAsync(username, rol);
            return Ok(User);
        }

        [Authorize]
        [HttpPost("UpdateDepartment")]
        public async Task<ActionResult<IEnumerable<User>>> UpdateDepartment(string username, int department)
        {
            var User = await _userRepository.UpdateDepartmentUserAsync(username, department);
            return Ok(User);
        }

        [Authorize]
        [HttpPost("UpdateUser")]
        public async Task<ActionResult<IEnumerable<User>>> UpdateUser(UserDto user)
        {
            var User = await _userRepository.UpdateUser(user);
            return Ok(User);
        }

        [Authorize]
        [HttpDelete("DeleteUser")]
        public async Task<ActionResult<IEnumerable<User>>> DeleteUser(string username)
        {
            var User = await _userRepository.DeleteUserAsync(username);
            return Ok(User);
        }


        [HttpPost("Login")]
        public async Task<ActionResult<object>> Login(UserDto user) {
            var result = await _userRepository.LoginAsync(user.Username, user.Password);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [Authorize]
        [HttpGet("UpdateToken")]
        public async Task<ActionResult<object>> UpdateToken(string Token) {
            var result = await _userRepository.UpdateTokenAsync(Token);
            if (result == null) return NotFound();
            return Ok(result);
        }
    }
}
