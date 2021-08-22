using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.Models
{
    public partial class RolPrivilege
    {
        public int IdRolPrivilege { get; set; }
        public int PrivilegeIdPrivilege { get; set; }
        public int RolIdRol { get; set; }

        public virtual Privilege PrivilegeIdPrivilegeNavigation { get; set; }
        public virtual Rol RolIdRolNavigation { get; set; }
    }
}
