using Backend.DPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.DPI.ModelDto;
namespace Backend.DPI.Repository
{
    public class SuspectRepository : ISuspectRepository
    {

        private readonly DPIContext dpiContext = new DPIContext();

        public  async Task<IReadOnlyList<object>> GetSuspectsAsync()
        {
            var result = await (from a in dpiContext.Suspects
                                join b in dpiContext.Departments on a.DepartmentIdDepartment equals b.IdDepartment
                                select new {a.Age,a.Alias,a.Avenue,a.UsernameRegistryData,a.DepartmentIdDepartment,a.Department,a.Build,a.Caserio,a.CivilStatus,a.Colonia,a.DateOfBirth,a.DniSuspect,a.EyesColor,a.FirstName,a.Height,a.HouseNumber,a.LastName,a.MiddleName,a.Municipio,a.Nationaliy,a.Ocupattion,a.OperationPlace,a.ParticularSign,a.Pasaje,a.PassportNumber,a.PersonFrom,a.RecordStatus,a.ReferenceAddress,a.Sex,a.Street,a.Tattoo,a.ThirdName,a.Village,a.Weight,b.Name }).ToListAsync();
            return  result;
        }
    }
}
