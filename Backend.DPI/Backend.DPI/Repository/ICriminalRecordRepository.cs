using Backend.DPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public interface ICriminalRecordRepository
    {
        Task<IReadOnlyList<CriminalRecord>> GetCriminalRecordsAsync();

        Task<IReadOnlyList<CriminalRecord>> GetCriminalRecordByDNIAsync(string DNI);

        Task<bool> AddCriminalRecordAsync(CriminalRecord CriminalRecord);

        Task<bool> UpdateCriminalRecordAsync(CriminalRecord criminalRecord);

        Task<bool> DeleteCriminaRecordAsync(int IdCriminalRecord);
    }
}
