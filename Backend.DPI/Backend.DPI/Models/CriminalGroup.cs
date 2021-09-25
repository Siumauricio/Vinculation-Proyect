using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.Models
{
    public partial class CriminalGroup
    {
        public CriminalGroup()
        {
            CriminalHistories = new HashSet<CriminalHistory>();
        }

        public int IdCg { get; set; }
        public string NombreGrupoCriminal { get; set; }

        public virtual ICollection<CriminalHistory> CriminalHistories { get; set; }
    }
}
