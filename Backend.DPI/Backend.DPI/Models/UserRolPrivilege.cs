using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.Models
{
    public partial class UserRolPrivilege
    {
        public int IdUserRolPrivilege { get; set; }
        public int SpecialPrivilege { get; set; }
        public string UserUsername { get; set; }
        public int? IdRolPrivilege { get; set; }

        public virtual User UserUsernameNavigation { get; set; }
    }
}
