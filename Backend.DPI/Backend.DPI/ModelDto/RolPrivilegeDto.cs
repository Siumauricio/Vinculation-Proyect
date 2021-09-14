using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.ModelDto
{
    public class RolPrivilegeDto
    {
        public int IdRolPrivilege { get; set; }
        public int PrivilegeIdPrivilege { get; set; }
        public int RolIdRol { get; set; }

        public virtual PrivilegeDto PrivilegeIdPrivilegeNavigation { get; set; }
        public virtual RolDto RolIdRolNavigation { get; set; }
    }
}
