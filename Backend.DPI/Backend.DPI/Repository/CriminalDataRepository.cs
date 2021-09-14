using Backend.DPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public class CriminalDataRepository : ICriminalDataRepository
    {
        private readonly DPIContext _dpiContext;

        public CriminalDataRepository(DPIContext dpiContext)
        {
            this._dpiContext = dpiContext;

        }

        public async Task<bool> AddCriminalDataAsync(CriminalDatum CriminalData)
        {
            var result = await _dpiContext.CriminalData.AddAsync(CriminalData);
            if (result == null) return false;
            await _dpiContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCriminalDataByIdAsync(int IdCriminalData)
        {
            var result = await _dpiContext.CriminalData.FirstOrDefaultAsync(x => x.IdCriminalData == IdCriminalData);
            if (result == null) return false;
            _dpiContext.Remove(result);
            await _dpiContext.SaveChangesAsync();
            return true;
        }


    public async Task<IReadOnlyList<object>> GetCriminalDataAsync()
    {
        var result = await (from criminal_data in _dpiContext.CriminalData
                            join criminal_group in _dpiContext.CriminalGroups on criminal_data.CriminalGroupIdCg equals criminal_group.IdCg
                            select new
                            {
                                IdCriminalData = criminal_data.IdCriminalData,
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

    public async Task<IReadOnlyList<object>> GetCriminalDataByDNIAsync(string DNI)
    {
        var result = await (from criminal_data in _dpiContext.CriminalData
                            join criminal_group in _dpiContext.CriminalGroups on criminal_data.CriminalGroupIdCg equals criminal_group.IdCg
                            where criminal_data.SuspectDni.Contains(DNI)
                            select new
                            {
                                IdCriminalData = criminal_data.IdCriminalData,
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

    public async Task<bool> UpdateCriminalDataByIdAsync(CriminalDatum CriminalData)
    {
        var result = await _dpiContext.CriminalData.FirstOrDefaultAsync(x => x.IdCriminalData == CriminalData.IdCriminalData);
        if (result == null)
            return false;

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
