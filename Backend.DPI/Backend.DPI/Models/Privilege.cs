using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.Models
{
    public partial class Privilege
    {
        public Privilege()
        {
            RolPrivileges = new HashSet<RolPrivilege>();
        }

        public int IdPrivilege { get; set; }
        public string Name { get; set; }

        public virtual ICollection<RolPrivilege> RolPrivileges { get; set; }
    }
}
