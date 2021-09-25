using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.ModelDto
{
    public partial class CriminalRecordDto
    {
        public int IdCriminalRecord { get; set; }
        public string Crime { get; set; }
        public DateTime? SentenceStartDate { get; set; }
        public DateTime? SentenceFinalDate { get; set; }
        public string PenitentiaryCenter { get; set; }
        public string ModuleCellPrison { get; set; }
        public string SuspectDni { get; set; }


        public virtual SuspectDto SuspectDniNavigation { get; set; }
    }
}
