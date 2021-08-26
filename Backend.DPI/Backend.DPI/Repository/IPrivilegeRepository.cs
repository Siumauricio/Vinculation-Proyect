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

        Task<UserRolPrivilege> AddUserRolPrivilege(UserRolPrivilege UserRolPrivilege);
    }
}
