using Backend.DPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public interface ISuspectRepository
    {
        Task<IReadOnlyList<object>> GetSuspectsAsync();
        //Task<IReadOnlyList<CriminalDatum>> GetDepartmentsAsync();
        //Task<CriminalDatum> GetDepartmentsByNameAsync(string departmentName);
        //Task<bool> DeleteDepartmentAsync(string departmentName);
    }
}
