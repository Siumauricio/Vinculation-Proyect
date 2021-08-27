using Backend.DPI.Models;
using Backend.DPI.ModelDto;
using System;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace Backend.DPI.Repository
{
    public class PrivilegeRepository : IPrivilegeRepository
    {
        private readonly DPIContext dpiContext;


        public PrivilegeRepository(DPIContext _dpiContext)
        {
            this.dpiContext = _dpiContext;

        }

        public async Task<UserRolPrivilege> AddUserRolPrivilegeAsync(UserRolPrivilege UserRolPrivilege)
        {
            var result = await dpiContext.UserRolPrivileges.AddAsync(new UserRolPrivilege
            {
                UserUsername = UserRolPrivilege.UserUsername,
                SpecialPrivilege=UserRolPrivilege.SpecialPrivilege,
                IdRolPrivilege=UserRolPrivilege.IdRolPrivilege
            }) ;
            await dpiContext.SaveChangesAsync();
            return new UserRolPrivilege{
                UserUsername=UserRolPrivilege.UserUsername,
                IdRolPrivilege=UserRolPrivilege.IdRolPrivilege
            };

        }

        public async Task<Privilege> CreatePrivilegeAsync(Privilege Privilege)
        {
            var result = await dpiContext.Privileges.AddAsync(new Privilege
            {
                Name=Privilege.Name,
            });
            await dpiContext.SaveChangesAsync();
            return new Privilege
            {
                Name = Privilege.Name
            };
        }

        public async Task<RolPrivilege> CreateRolPrivilegeAsync(RolPrivilege RolPrivilege)
        {
            var result = await dpiContext.RolPrivileges.AddAsync(new RolPrivilege
            {
                PrivilegeIdPrivilege = RolPrivilege.PrivilegeIdPrivilege,
                RolIdRol = RolPrivilege.RolIdRol
            });
            await dpiContext.SaveChangesAsync();
            return new RolPrivilege
            {
                PrivilegeIdPrivilege = RolPrivilege.PrivilegeIdPrivilege,
                IdRolPrivilege = RolPrivilege.IdRolPrivilege
            };

        }

        public async Task<IReadOnlyList<Privilege>> GetPrivilegesAsync()
        {
            return await dpiContext.Privileges.ToListAsync();
        }

        public async Task<IReadOnlyList<object>> GetRolPrivilegeByUserAsync(string Username)
        {
            var result = await (from username in dpiContext.Users
                                join user_rol_privilege in dpiContext.UserRolPrivileges on username.Username equals user_rol_privilege.UserUsername
                                join rol_privilege in dpiContext.RolPrivileges on user_rol_privilege.IdRolPrivilege equals rol_privilege.IdRolPrivilege
                                join rol in dpiContext.Rols on rol_privilege.RolIdRol equals rol.IdRol
                                join privilege in dpiContext.Privileges on rol_privilege.PrivilegeIdPrivilege equals privilege.IdPrivilege
                                where username.Username==Username
                                select new
                                {
                                    IdRolPrivilege = rol_privilege.IdRolPrivilege,
                                    Name_Rol = rol.Name,
                                    Name_Privilege = privilege.Name,
                                    Special_Privilege = user_rol_privilege.SpecialPrivilege
                                }).ToListAsync();
            return result;
        }

        public async Task<IReadOnlyList<object>> GetRolPrivilegesAsync()
        {
              var result=  await (from rol_Privileges in dpiContext.RolPrivileges
                                                         join rols in dpiContext.Rols on rol_Privileges.RolIdRol equals rols.IdRol
                                                         join privileges in dpiContext.Privileges on rol_Privileges.PrivilegeIdPrivilege equals privileges.IdPrivilege
                                                         select new { 
                                                            IdRolPrivilege= rol_Privileges.IdRolPrivilege,
                                                            Name_Rol= rols.Name,
                                                            Name_Privilege=privileges.Name
                                                         } ).ToListAsync();
            return result;
        }

    }
}
