using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.ModelDto
{
    public partial class PrivilegeDto
    {
        public PrivilegeDto()
        {
            RolPrivileges = new HashSet<RolPrivilegeDto>();
        }

        public int IdPrivilege { get; set; }
        public string Name { get; set; }

        public virtual ICollection<RolPrivilegeDto> RolPrivileges { get; set; }
    }
}
