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

        public async Task<bool> DeleteRolPrivilegeByIdAsync(int IdRolPrivilege)
        {
            var result = await dpiContext.RolPrivileges.FirstOrDefaultAsync(x => x.IdRolPrivilege == IdRolPrivilege);
            if (result == null) return false;
            dpiContext.RolPrivileges.Remove(result);
            await dpiContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteUserRolPrivilegeByIdAsync(int IdUserRolPrivilege)
        {
            var result = await dpiContext.UserRolPrivileges.FirstOrDefaultAsync(x => x.IdUserRolPrivilege == IdUserRolPrivilege);
            if (result == null) return false;
            dpiContext.UserRolPrivileges.Remove(result);
            await dpiContext.SaveChangesAsync();
            return true;
        }

        public async Task<IReadOnlyList<Privilege>> GetPrivilegesAsync()
        {
            return await dpiContext.Privileges.ToListAsync();
        }

        public async Task<object> GetRolPrivilegeByNameAsync(string NameRolPrivilege)
        {
            var result = await (from rol_Privileges in dpiContext.RolPrivileges
                                join rols in dpiContext.Rols on rol_Privileges.RolIdRol equals rols.IdRol
                                join privileges in dpiContext.Privileges on rol_Privileges.PrivilegeIdPrivilege equals privileges.IdPrivilege
                                where privileges.Name.ToLower()== NameRolPrivilege.ToLower()
                                select new
                                {
                                    IdRolPrivilege = rol_Privileges.IdRolPrivilege,
                                    Name_Rol = rols.Name,
                                    Name_Privilege = privileges.Name
                                }).FirstOrDefaultAsync();
            if (result == null) return null;
            return result;
        }


        public async Task<IReadOnlyList<object>> GetUserRolPrivilegesByUserAsync(string Username)
        {
            var result = await (from username in dpiContext.Users
                                join user_rol_privilege in dpiContext.UserRolPrivileges on username.Username equals user_rol_privilege.UserUsername
                                join rol_privilege in dpiContext.RolPrivileges on user_rol_privilege.IdRolPrivilege equals rol_privilege.IdRolPrivilege
                                join rol in dpiContext.Rols on rol_privilege.RolIdRol equals rol.IdRol
                                join privilege in dpiContext.Privileges on rol_privilege.PrivilegeIdPrivilege equals privilege.IdPrivilege
                                where username.Username==Username
                                select new
                                {
                                    IdUserRolPrivilege = user_rol_privilege.IdUserRolPrivilege,
                                    Username=username.Username,
                                    Name_Rol = rol.Name,
                                    Name_Privilege = privilege.Name,
                                    Special_Privilege = user_rol_privilege.SpecialPrivilege,
                                    tipo_privilegio = privilege.TipoPrivilegio
                                }).ToListAsync();
            if (result.Count == 0) return null;
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

        public async Task<IReadOnlyList<object>> GetUserRolPrivilegesAsync()
        {
            var result = await (from users in dpiContext.Users
                                join user_rol_privilege in dpiContext.UserRolPrivileges on users.Username equals user_rol_privilege.UserUsername
                                join rol_privilege in dpiContext.RolPrivileges on user_rol_privilege.IdRolPrivilege equals rol_privilege.IdRolPrivilege
                                join rol in dpiContext.Rols on rol_privilege.RolIdRol equals rol.IdRol
                                join privilege in dpiContext.Privileges on rol_privilege.PrivilegeIdPrivilege equals privilege.IdPrivilege
                                select new
                                {
                                    IdUserRolPrivilege = user_rol_privilege.IdUserRolPrivilege,
                                    Username= user_rol_privilege.UserUsername,
                                    Special_Privilege = user_rol_privilege.SpecialPrivilege,
                                    Name_Rol = rol.Name,
                                    Name_Privilege = privilege.Name 
                                }).ToListAsync();
            return result;
        }



        public Task<IReadOnlyList<Privilege>> GetPrivilegesByUserAsync(string username)
        {
            //var result = await(from a in dpiContext.prvi
            //                   join b in dpiContext.Rols on a.RolIdRol equals b.IdRol
            //                   where a.Username == username
            //                   select new { Username = a.Username, FechaCreacion = a.CreationDatetime, NombreRol = b.Name, NombreDepartamento = c.Name, a.RolIdRol, a.DepartmentIdDepartment, a.Password }).FirstOrDefaultAsync();
            return null;
        }

        public async Task<bool> DeleteUserRolPrivilegeByUserAsync(string Username)
        {
            var result = await (from username in dpiContext.Users
                                join user_rol_privilege in dpiContext.UserRolPrivileges on username.Username equals user_rol_privilege.UserUsername
                                join rol_privilege in dpiContext.RolPrivileges on user_rol_privilege.IdRolPrivilege equals rol_privilege.IdRolPrivilege
                                join rol in dpiContext.Rols on rol_privilege.RolIdRol equals rol.IdRol
                                join privilege in dpiContext.Privileges on rol_privilege.PrivilegeIdPrivilege equals privilege.IdPrivilege
                                where username.Username == Username
                                select new UserRolPrivilege
                                {
                                    IdUserRolPrivilege = user_rol_privilege.IdUserRolPrivilege,
                            
                                }).ToListAsync();
            if (result == null) return false;
            dpiContext.UserRolPrivileges.RemoveRange(result);
            await dpiContext.SaveChangesAsync();
            return true;
        }
    }
}
