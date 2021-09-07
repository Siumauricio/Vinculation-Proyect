using Backend.DPI.ModelDto;
using Backend.DPI.Models;
using Backend.DPI.TokenUser;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DPIContext dbContext = new DPIContext();
        private readonly TokenUserService tokenUserService=new TokenUserService();


        public async Task<bool> CreateUserAsync(UserDto user)
        {
            var result =  await dbContext.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == user.Username.ToLower());
            if (result!=null)
            {
                return false;
            }
            User uf = new User { Username = user.Username.ToLower(), Password = user.Password, RolIdRol = user.RolIdRol, DepartmentIdDepartment = user.DepartmentIdDepartment, CreationDatetime = DateTime.Now };
            await dbContext.Users.AddAsync(uf);
            await dbContext.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteUserAsync(string user)
        {
            var deletePrivileges = new PrivilegeRepository(dbContext);
            var result = await dbContext.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == user.ToLower());
            if (result == null)
            {
                return false;
            }
            var resultDeletePrivilege = await deletePrivileges.DeleteUserRolPrivilegeByUserAsync(user);
            dbContext.Users.Remove(result);
            await dbContext.SaveChangesAsync();
            return true;
        }
        //User Data, privilegios
        public async Task<object> GetUserByUsernameAsync(string username)
        {
            var result = await (from a in dbContext.Users
                                join b in dbContext.Rols on a.RolIdRol equals b.IdRol 
                                join c in dbContext.Departments on a.DepartmentIdDepartment equals c.IdDepartment
                                where a.Username == username
                                select new { Username = a.Username, FechaCreacion = a.CreationDatetime, NombreRol = b.Name, NombreDepartamento = c.Name,a.RolIdRol,a.DepartmentIdDepartment,a.Password }).FirstOrDefaultAsync();
            if (result == null)
            {
                return null;
            }
            return result;
        }
        public async Task<IReadOnlyList<object>> GetUsersAsync()
        {
            var result = await (from a in dbContext.Users
                          join b in dbContext.Rols on a.RolIdRol equals b.IdRol
                          join c in dbContext.Departments on a.DepartmentIdDepartment equals c.IdDepartment
                          select new { Username = a.Username, FechaCreacion = a.CreationDatetime, NombreRol = b.Name,NombreDepartamento = c.Name }).ToListAsync();

            if (result == null)
            {
                return null;
            }
            return result;
        }

        public async Task<bool> UpdatePasswordUserAsync(string username, string password)
        {
            User result = await dbContext.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
            if (result == null)
            {
                return false;
            }

            result.Password = password;
            await dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateRolUserAsync(string username, int rol)
        {
            User result = await dbContext.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
            Rol dp = await dbContext.Rols.FirstOrDefaultAsync(r => r.IdRol == rol);

            if (result == null || dp == null)
            {
                return false;
            }
            result.RolIdRol = rol;
            await dbContext.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UpdateDepartmentUserAsync(string username, int department)
        {
            User result = await dbContext.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
            Department dp = dbContext.Departments.FirstOrDefault(d => d.IdDepartment == department);

            if (result == null || dp == null)
            {
                return false;
            }
            
            result.DepartmentIdDepartment = department;
            await dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateUser(UserDto user)
        {
            User result = await dbContext.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == user.Username.ToLower());

            if (result == null)
            {
                return false;
            }
            result.Password = user.Password;
            result.RolIdRol = user.RolIdRol;
            result.DepartmentIdDepartment = user.DepartmentIdDepartment;
            await dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<object> LoginAsync(string Username,string Password)
        {
            var data = await (from user in dbContext.Users
                                join department in dbContext.Departments on user.DepartmentIdDepartment equals department.IdDepartment
                                join rol in dbContext.Rols on user.RolIdRol equals rol.IdRol
                                where user.Username == Username && user.Password==Password
                                select new
                                {
                                    Username = user.Username,
                                    Rol = rol.Name,
                                    Department= department.Name,
                                    idDepartment = department.IdDepartment
                                }).FirstOrDefaultAsync();
            if (data == null) return null;

            return new {
                Username = data.Username,
                Rol = data.Rol,
                Department = data.Department,
                idDepartment = data.idDepartment,
                TokenString = await tokenUserService.GetTokenAsync()
            };
        }


        public async Task<object> UpdateTokenAsync(string Token) {
            var validateToken = await tokenUserService.TokenValidationUserAsync(Token);
            if (!validateToken) {
                return null;
            }
            var result =  await tokenUserService.GetTokenAsync();
            if (result == null) return null;
            return new  {Token = result } ;
        }


    }
}
