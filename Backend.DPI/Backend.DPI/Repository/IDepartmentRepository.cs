using Backend.DPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public interface IDepartmentRepository
    {

        Task<Department> CreateDepartmentAsync(string name);
        Task<IReadOnlyList<Department>> GetDepartmentsAsync();
    }
}
