using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.Models
{
    public partial class Rol
    {
        public Rol()
        {
            RolPrivileges = new HashSet<RolPrivilege>();
            Users = new HashSet<User>();
        }

        public int IdRol { get; set; }
        public string Name { get; set; }

        public virtual ICollection<RolPrivilege> RolPrivileges { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
