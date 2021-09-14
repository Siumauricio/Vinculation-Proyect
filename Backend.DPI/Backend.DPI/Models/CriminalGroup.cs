using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.Models
{
    public partial class CriminalGroup
    {
        public CriminalGroup()
        {
            CriminalData = new HashSet<CriminalDatum>();
        }

        public int IdCg { get; set; }
        public string NombreGrupoCriminal { get; set; }

        public virtual ICollection<CriminalDatum> CriminalData { get; set; }
    }
}
