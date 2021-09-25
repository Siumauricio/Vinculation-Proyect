using Backend.DPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public class CriminalRecordRepository :ICriminalRecordRepository
    {
        private readonly DPIContext _dpiContext;
        public CriminalRecordRepository(DPIContext dpiContext)
        {
            this._dpiContext = dpiContext;
        }
        public async Task<bool> AddCriminalRecordAsync(CriminalRecord CriminalRecord)
        {
            await _dpiContext.CriminalRecords.AddAsync(CriminalRecord);
            if(await _dpiContext.SaveChangesAsync()>0) return true;
            return false;
        }

        public async Task<bool> DeleteCriminaRecordAsync(int IdCriminalRecord)
        {
            var result = await _dpiContext.CriminalRecords.FirstOrDefaultAsync(x => x.IdCriminalRecord == IdCriminalRecord);
            if (result == null) return false;
            _dpiContext.Remove(result);
            await _dpiContext.SaveChangesAsync();
            return true;
        }

        public async Task<IReadOnlyList<CriminalRecord>> GetCriminalRecordByDNIAsync(string DNI)
        {
            var result = await _dpiContext.CriminalRecords.Where(x=>x.SuspectDni==DNI).ToListAsync();
            if (result == null) return null;
            return result;
        }

        public async Task<IReadOnlyList<CriminalRecord>> GetCriminalRecordsAsync()
        {
            var result = await _dpiContext.CriminalRecords.ToListAsync();
            if (result == null) return null;
            return result;
        }

        public async Task<bool> UpdateCriminalRecordAsync(CriminalRecord criminalRecord)
        {
            var result = await _dpiContext.CriminalRecords.FirstOrDefaultAsync(x => x.IdCriminalRecord == criminalRecord.IdCriminalRecord);
            if (result == null)
                return false;
            result.ModuleCellPrison = criminalRecord.ModuleCellPrison;
            result.PenitentiaryCenter = criminalRecord.PenitentiaryCenter;
            result.SentenceFinalDate = criminalRecord.SentenceFinalDate;
            result.SentenceStartDate = criminalRecord.SentenceStartDate;
            result.SuspectDni = criminalRecord.SuspectDni;
            result.Crime = criminalRecord.Crime;
            await _dpiContext.SaveChangesAsync();
            return true;
        }

    }
}
