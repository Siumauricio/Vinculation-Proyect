using Backend.DPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public class CriminalHistoryRepository : ICriminalHistoryRepository
    {
        private readonly DPIContext _dpiContext;

        public CriminalHistoryRepository(DPIContext dpiContext)
        {
            this._dpiContext = dpiContext;

        }

        public async Task<bool> AddCriminalHistoryAsync(CriminalHistory CriminalData)
        {
            await _dpiContext.CriminalHistories.AddAsync(CriminalData);
            if (await _dpiContext.SaveChangesAsync()>0) return true;
            return false;
        }

        public async Task<bool> DeleteCriminalHistoryByIdAsync(int IdCriminalData)
        {
            var result = await _dpiContext.CriminalHistories.FirstOrDefaultAsync(x => x.IdCriminalHistory == IdCriminalData);
            if (result == null) return false;
            _dpiContext.Remove(result);
            await _dpiContext.SaveChangesAsync();
            return true;
        }


    public async Task<IReadOnlyList<object>> GetCriminalHistoryAsync()
    {
        var result = await (from criminal_data in _dpiContext.CriminalHistories
                            join criminal_group in _dpiContext.CriminalGroups on criminal_data.CriminalGroupIdCg equals criminal_group.IdCg
                            select new
                            {
                                IdCriminalData = criminal_data.IdCriminalHistory,
                                IncidenceType = criminal_data.IncidenceType,
                                IncidenceZone = criminal_data.IncidenceZone,
                                OperationPlace = criminal_data.OperationPlace,
                                PeriodBelong = criminal_data.PeriodBelong,
                                TatooType = criminal_data.TatooType,
                                SuspectDni = criminal_data.SuspectDni,
                                HierarchyCriminalGroup = criminal_data.HierarchyCriminalGroup,
                                CriminalGroupName = criminal_group.NombreGrupoCriminal
                            }).ToListAsync();
        if (result == null) return null;
        return result;

    }

    public async Task<IReadOnlyList<object>> GetCriminalHistoryByDNIAsync(string DNI)
    {
        var result = await (from criminal_data in _dpiContext.CriminalHistories
                            join criminal_group in _dpiContext.CriminalGroups on criminal_data.CriminalGroupIdCg equals criminal_group.IdCg
                            where criminal_data.SuspectDni.Contains(DNI)
                            select new
                            {
                                IdCriminalData = criminal_data.IdCriminalHistory,
                                IncidenceType = criminal_data.IncidenceType,
                                IncidenceZone = criminal_data.IncidenceZone,
                                OperationPlace = criminal_data.OperationPlace,
                                PeriodBelong = criminal_data.PeriodBelong,
                                TatooType = criminal_data.TatooType,
                                SuspectDni = criminal_data.SuspectDni,
                                HierarchyCriminalGroup = criminal_data.HierarchyCriminalGroup,
                                CriminalGroupName = criminal_group.NombreGrupoCriminal,
                                CriminalGroupIdCg = criminal_data.CriminalGroupIdCg
                            }).ToListAsync();
        if (result == null) return null;
        return result;
    }

    public async Task<bool> UpdateCriminalHistoryByIdAsync(CriminalHistory CriminalData)
    {
        var result = await _dpiContext.CriminalHistories.FirstOrDefaultAsync(x => x.IdCriminalHistory == CriminalData.IdCriminalHistory);
        if (result == null)
            return false;
        result.SuspectDni = CriminalData.SuspectDni;
        result.CriminalGroupIdCg = CriminalData.CriminalGroupIdCg;
        result.PeriodBelong = CriminalData.PeriodBelong;
        result.TatooType = CriminalData.TatooType;
        result.OperationPlace = CriminalData.OperationPlace;
        result.IncidenceType = CriminalData.IncidenceType;
        result.HierarchyCriminalGroup = CriminalData.HierarchyCriminalGroup;
        result.IncidenceZone = CriminalData.IncidenceZone;
        await _dpiContext.SaveChangesAsync();
        return true;
    }
    }   
}
