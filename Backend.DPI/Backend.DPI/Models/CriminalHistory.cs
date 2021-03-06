using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.Models
{
    public partial class CriminalHistory
    {
        public int IdCriminalHistory { get; set; }
        public string IncidenceType { get; set; }
        public string IncidenceZone { get; set; }
        public string HierarchyCriminalGroup { get; set; }
        public string PeriodBelong { get; set; }
        public string OperationPlace { get; set; }
        public string TatooType { get; set; }
        public string SuspectDni { get; set; }
        public int CriminalGroupIdCg { get; set; }

        public virtual CriminalGroup CriminalGroupIdCgNavigation { get; set; }
        public virtual Suspect SuspectDniNavigation { get; set; }
    }
}
