using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DPI.ModelDto;
using Backend.DPI.Models;
using Backend.DPI.Repository;
using Microsoft.EntityFrameworkCore;

namespace Backend.DPI.Services
{
    public class RolesRepository :IRolesRepository
    {
        private DPIContext dbContext = new DPIContext();

        public async Task<bool> CreateRolAsync(string rolName)
        {
            Rol rl = new Rol {Name= rolName };
            await dbContext.Rols.AddAsync(rl);
            await dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteRolAsync(string rol)
        {
            var result = await dbContext.Rols.FirstOrDefaultAsync(u => u.Name.ToLower() == rol.ToLower());
            if (result == null)
            {
                return false;
            }
            dbContext.Rols.Remove(result);
            await dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<IReadOnlyList<Rol>> GetRoles()
        {
            return await dbContext.Rols.OrderBy(rols=>rols.Name).ToListAsync();
        }

        public async Task<Rol> getRolbyName(string rolName)
        {
            var result = await dbContext.Rols.FirstOrDefaultAsync(u => u.Name.ToLower() == rolName.ToLower());
            if (result == null)
            {
                return null;
            }
            return result;
        }
    }
}
