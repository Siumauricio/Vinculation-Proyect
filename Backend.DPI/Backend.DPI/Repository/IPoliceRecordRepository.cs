using Backend.DPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.Repository
{
    public interface IPoliceRecordRepository
    {
        Task<bool> CreatePoliceRecord(PoliceRecord policeRecord);
        Task<IReadOnlyList<PoliceRecord>> GetPoliceRecord();
        Task<IReadOnlyList<PoliceRecord>> GetPoliceRecordByDNISuspect(string dniSuspect);
        Task<bool> DeletePoliceRecord(int idPoliceRecord);
        Task<bool> ModifyPoliceRecord(PoliceRecord police);
    }
}
