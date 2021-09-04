﻿using Backend.DPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public interface ISuspectRepository
    {
        Task<IReadOnlyList<object>> GetSuspectsAsync();
        Task<bool> AddSuspectAsync(Suspect s);
       Task<bool> DeleteSuspect(string DNI);
        Task<Suspect> GetSuspectByDni(string DNI);
        Task<bool> ModifySuspect(string lastDni, Suspect suspectModified);
        //Task<bool> DeleteDepartmentAsync(string departmentName);
    }
}
