using Backend.DPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace Backend.DPI.Repository
{
    public class PoliceRecordRepository : IPoliceRecordRepository
    {
        private readonly DPIContext dpiContext =  new DPIContext();

        public async Task<bool> CreatePoliceRecord(PoliceRecord policeRecord)
        {
            await dpiContext.PoliceRecords.AddAsync(policeRecord);
             
            if (await dpiContext.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> DeletePoliceRecord(int idPoliceRecord)
        {
            var result = await this.dpiContext.PoliceRecords.FirstOrDefaultAsync(x => x.IdPoliceRecord == idPoliceRecord);
            if (result == null)
            {
                return false;
            }
            this.dpiContext.PoliceRecords.Remove(result);
            await dpiContext.SaveChangesAsync();
            return true;
        }

        public async Task<IReadOnlyList<PoliceRecord>> GetPoliceRecord()
        {
            return await this.dpiContext.PoliceRecords.ToListAsync();
        }

        public async Task<IReadOnlyList<PoliceRecord>> GetPoliceRecordByDNISuspect(string dniSuspect)
        {
            var result = await this.dpiContext.PoliceRecords.Where(x => x.SuspectDni == dniSuspect).ToListAsync();
            if (result == null)
            {
                return null;
            }
            return result;
        }

        public async Task<bool> ModifyPoliceRecord(PoliceRecord police)
        {
            var result = await this.dpiContext.PoliceRecords.FirstOrDefaultAsync(x => x.IdPoliceRecord == police.IdPoliceRecord);
            if (result == null)
            {
                return false;
            }
            result = police;
            await this.dpiContext.SaveChangesAsync();
            return true;
        }
    }
}
