using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.ModelDto
{
    public partial class CriminalGroupDto
    {
        public CriminalGroupDto()
        {
            CriminalData = new HashSet<CriminalDatumDto>();
        }

        public int IdCg { get; set; }
        public string NombreGrupoCriminal { get; set; }

        public virtual ICollection<CriminalDatumDto> CriminalData { get; set; }
    }
}
