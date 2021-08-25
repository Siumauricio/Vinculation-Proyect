using Backend.DPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.DPI.ModelDto;

namespace Backend.DPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DPIContext dbContext = new DPIContext();

        public async Task<bool> CreateUserAsync(UserDto user)
        {
            var result =  dbContext.Users.FirstOrDefault(u => u.Username.ToLower() == user.Username.ToLower());
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
            var result = dbContext.Users.FirstOrDefault(u => u.Username.ToLower() == user.ToLower());
            if (result == null)
            {
                return false;
            }
            dbContext.Users.Remove(result);
            await dbContext.SaveChangesAsync();
            return true;
        }

        public User GetUserByUsernameAsync(string username)
        {
            User result = dbContext.Users.FirstOrDefault(u => u.Username.ToLower() == username.ToLower()) ;
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
            User result = dbContext.Users.FirstOrDefault(u => u.Username.ToLower() == username.ToLower());
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
            User result = dbContext.Users.FirstOrDefault(u => u.Username.ToLower() == username.ToLower());
            Rol dp = dbContext.Rols.FirstOrDefault(r => r.IdRol == rol);

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
            User result = dbContext.Users.FirstOrDefault(u => u.Username.ToLower() == username.ToLower());
            Department dp = dbContext.Departments.FirstOrDefault(d => d.IdDepartment == department);

            if (result == null || dp == null)
            {
                return false;
            }
            
            result.DepartmentIdDepartment = department;
            await dbContext.SaveChangesAsync();
            return true;
        }
    }
}
