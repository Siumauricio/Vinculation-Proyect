using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.ModelDto
{
    public partial class UserRolPrivilegeDto
    {
        public int IdUserRolPrivilege { get; set; }
        public int SpecialPrivilege { get; set; }
        public string UserUsername { get; set; }
        public int? IdRolPrivilege { get; set; }

        public virtual UserDto UserUsernameNavigation { get; set; }
    }
}
