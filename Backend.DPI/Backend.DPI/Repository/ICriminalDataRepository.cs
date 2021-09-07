using Backend.DPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public interface ICriminalDataRepository
    {

        Task<bool> AddCriminalDataAsync(CriminalDatum CriminalData);

        Task<IReadOnlyList<object>> GetCriminalDataAsync();

        Task<IReadOnlyList<object>> GetCriminalDataByDNIAsync(string DNI);

        Task<bool> UpdateCriminalDataByIdAsync(CriminalDatum CriminalData);

        Task<bool> DeleteCriminalDataByIdAsync(int IdCriminalData);
    }
}
