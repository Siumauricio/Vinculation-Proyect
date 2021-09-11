using Backend.DPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public class CriminalGroupRepository : ICriminalGroupRepository
    {
        private readonly DPIContext _dpiContext;
        public CriminalGroupRepository(DPIContext dpiContext)
        {
            this._dpiContext = dpiContext;
        }

        public async Task<IReadOnlyList<CriminalGroup>> GetCriminalGroupsAsync()
        {
            return await this._dpiContext.CriminalGroups.ToListAsync();
        }
    }
}
