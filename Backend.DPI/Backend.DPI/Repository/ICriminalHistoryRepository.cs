using Backend.DPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public interface ICriminalHistoryRepository
    {

        Task<bool> AddCriminalHistoryAsync(CriminalHistory CriminalData);

        Task<IReadOnlyList<object>> GetCriminalHistoryAsync();

        Task<IReadOnlyList<object>> GetCriminalHistoryByDNIAsync(string DNI);

        Task<bool> UpdateCriminalHistoryByIdAsync(CriminalHistory CriminalData);

        Task<bool> DeleteCriminalHistoryByIdAsync(int IdCriminalData);
    }
}
