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

        public async Task<bool> AddSuspectAsync(Suspect suspect)
        {
            var result = await dpiContext.Suspects.FirstOrDefaultAsync(s => s.DniSuspect == suspect.DniSuspect.Trim());
            if (result !=null)

            {
                return false;
            }
            suspect.CreationDate = DateTime.Now;
            await dpiContext.Suspects.AddAsync(suspect);
            await dpiContext.SaveChangesAsync();
            return true;
        }



        public  async Task<IReadOnlyList<object>> GetSuspectsAsync()
        {
            var result = await (from a in dpiContext.Suspects
                                join b in dpiContext.Departments on a.DepartmentIdDepartment equals b.IdDepartment
                                select new {a.Age,a.Alias,a.Avenue,a.CreationDate,a.UsernameRegistryData,a.DepartmentIdDepartment,a.Department,a.Build,a.Caserio,a.CivilStatus,a.Colonia,a.DateOfBirth,a.DniSuspect,a.EyesColor,a.FirstName,a.Height,a.HouseNumber,a.LastName,a.MiddleName,a.Municipio,a.Nationaliy,a.Ocupattion,a.OperationPlace,a.ParticularSign,a.Pasaje,a.PassportNumber,a.PersonFrom,a.RecordStatus,a.ReferenceAddress,a.Sex,a.Street,a.Tattoo,a.ThirdName,a.Village,a.Weight,b.Name }).ToListAsync();
            return  result;
        }

        public async Task<IReadOnlyList<object>> GetSuspectsInsertedByDate(string username)
        {
            var s3 = dpiContext.Suspects.ToList();

            int day = DateTime.Now.Day;
            int mont = DateTime.Now.Month;
            int year = DateTime.Now.Year;
            var result = await (from a in dpiContext.Suspects
                                join b in dpiContext.Departments on a.DepartmentIdDepartment equals b.IdDepartment 
                                where a.UsernameRegistryData == username && day == a.CreationDate.Day && a.CreationDate.Year == year && a.CreationDate.Month == mont
                                select new { a.Age, a.Alias, a.Avenue, a.UsernameRegistryData,a.CreationDate ,a.DepartmentIdDepartment, a.Department, a.Build, a.Caserio, a.CivilStatus, a.Colonia, a.DateOfBirth, a.DniSuspect, a.EyesColor, a.FirstName, a.Height, a.HouseNumber, a.LastName, a.MiddleName, a.Municipio, a.Nationaliy, a.Ocupattion, a.OperationPlace, a.ParticularSign, a.Pasaje, a.PassportNumber, a.PersonFrom, a.RecordStatus, a.ReferenceAddress, a.Sex, a.Street, a.Tattoo, a.ThirdName, a.Village, a.Weight, b.Name }).ToListAsync();
            if (result ==null)
            {
                return null;
            }
            return result;
        }

        public async Task<bool> DeleteSuspect(string DNI)
        {
            var result = await dpiContext.Suspects.FirstOrDefaultAsync(x => x.DniSuspect == DNI.ToLower());

            if (result == null)
            {
                return false;
            }
            dpiContext.Suspects.Remove(result);
            await dpiContext.SaveChangesAsync();
            return true;
        }

        public async Task<Suspect> GetSuspectByDni(string DNI)
        {
            var result = await dpiContext.Suspects.FirstOrDefaultAsync(x => x.DniSuspect == DNI);
            if (result == null)
            {
                return null;
            }
            return result;
        }
    }
}
