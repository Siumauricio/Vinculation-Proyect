using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.ModelDto
{
    public partial class CriminalHistoryDto
    {
        public int IdCriminalData { get; set; }
        public string IncidenceType { get; set; }
        public string IncidenceZone { get; set; }
        public string HierarchyCriminalGroup { get; set; }
        public string PeriodBelong { get; set; }
        public string OperationPlace { get; set; }
        public string TatooType { get; set; }
        public string SuspectDni { get; set; }
        public int CriminalGroupIdCg { get; set; }

        public virtual CriminalGroupDto CriminalGroupDto { get; set; }
        public  virtual SuspectDto SuspectDniNavigation { get; set; }
    }
}
