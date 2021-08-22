using Backend.DPI.ModelDto;
using Backend.DPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public interface IUserRepository
    {
        Task<bool> CreateUserAsync(UserDto user);
        Task<bool> DeleteUserAsync(string user);
        Task<bool> UpdatePasswordUserAsync(string username,string newUser);
        Task<bool> UpdateRolUserAsync(string username, int rol);
        Task<bool> UpdateDepartmentUserAsync(string username, int department);
        User GetUserByUsernameAsync(string username);
        Task<IReadOnlyList<User>> GetUsersAsync();

    }
}
