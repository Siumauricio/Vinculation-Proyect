using Backend.DPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Backend.DPI.Repository
{
    public class DepartmentRepository : IDepartmentRepository

    {

        private readonly DPIContext dpiContext;


        public DepartmentRepository(DPIContext _dpiContext)
        {
            this.dpiContext = _dpiContext;
        }
        public async Task<Department> CreateDepartmentAsync(string name)
        {
            var result = await dpiContext.AddAsync(new Department
            {
                Name = name
            });
            await dpiContext.SaveChangesAsync();
            return new Department {
                Name = name
            };
        }

        public async Task<bool> DeleteDepartmentAsync(string departmentName)
        {
            var result = await dpiContext.Departments.FirstOrDefaultAsync(u => u.Name.ToLower() == departmentName.ToLower());
            if (result == null)
            {
                return false;
            }
            dpiContext.Departments.Remove(result);
            await dpiContext.SaveChangesAsync();
            return true;
        }

        public async Task<IReadOnlyList<Department>> GetDepartmentsAsync()
        {
            return await dpiContext.Departments.OrderBy(departments=>departments.Name).ToListAsync();
        }

        public async Task<Department> GetDepartmentsByNameAsync(string departmentName)
        {
            var result = await dpiContext.Departments.FirstOrDefaultAsync(u => u.Name.ToLower() == departmentName.ToLower());
            if (result == null)
            {
                return null;
            }
            return result;
        }
    }
}
