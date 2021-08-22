using Backend.DPI.ModelDto;
using Backend.DPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public interface IRolesRepository
    {
        Task<IReadOnlyList<Rol>> GetRoles();
        Task<bool> CreateRolAsync(string rolName);
        Task<bool> DeleteRolAsync(string user);
    }
}
