using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.Models
{
    public partial class PoliceRecord
    {
        public int IdPoliceRecord { get; set; }
        public string ReasonDetention { get; set; }
        public DateTime DetentionDate { get; set; }
        public string DetentionDepartment { get; set; }
        public string CapturedByOrganization { get; set; }
        public string ConfiscationType { get; set; }
        public string ConfiscationQuantity { get; set; }
        public string ConfiscationDescription { get; set; }
        public string DetentionMunicipio { get; set; }
        public string Colonia { get; set; }
        public string Caserio { get; set; }
        public string Village { get; set; }
        public string SuspectDni { get; set; }

        public virtual Suspect SuspectDniNavigation { get; set; }
    }
}
