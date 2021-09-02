using Backend.DPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public interface IPrivilegeRepository
    {
        Task<RolPrivilege> CreateRolPrivilegeAsync(RolPrivilege RolPrivilege);
        Task<Privilege> CreatePrivilegeAsync(Privilege Privilege);

        Task<IReadOnlyList<Privilege>> GetPrivilegesAsync();
        Task<IReadOnlyList<object>> GetRolPrivilegesAsync();

        Task<UserRolPrivilege> AddUserRolPrivilegeAsync(UserRolPrivilege UserRolPrivilege);
        Task<IReadOnlyList<object>> GetUserRolPrivilegesByUserAsync(string Username);

        Task<object> GetRolPrivilegeByIdAsync(int IdRolPrivilege);

        Task<bool> DeleteRolPrivilegeByIdAsync(int IdRolPrivilege);

        Task<IReadOnlyList<object>> GetUserRolPrivilegesAsync();

        Task<IReadOnlyList<Privilege>> GetPrivilegesByUserAsync(string username);
        Task<bool> DeleteUserRolPrivilegeByIdAsync(int IdUserRolPrivilege);
    }


}
