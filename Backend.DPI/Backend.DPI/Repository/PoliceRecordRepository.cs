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
            var result = await dpiContext.Suspects.FirstOrDefaultAsync(x => x.DniSuspect == policeRecord.SuspectDni);
            if (result == null) {
                return false;
            }
            await dpiContext.PoliceRecords.AddAsync(policeRecord);
            await dpiContext.SaveChangesAsync();
            return true;
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
            result.DetentionDate = police.DetentionDate;
            result.ConfiscationType = police.ConfiscationType;
            result.ConfiscationQuantity = police.ConfiscationQuantity;
            result.ConfiscationDescription = police.ConfiscationDescription;
            result.DetentionDepartment = police.DetentionDepartment;
            result.DetentionMunicipio = police.DetentionMunicipio;
            result.ReasonDetention = police.ReasonDetention;
            result.SuspectDni = police.SuspectDni;
            result.Village = police.Village;
            result.Colonia = police.Colonia;
            result.Caserio = police.Caserio;
            result.CapturedByOrganization = police.CapturedByOrganization;
            await this.dpiContext.SaveChangesAsync();
            return true;
        }
    }
}
