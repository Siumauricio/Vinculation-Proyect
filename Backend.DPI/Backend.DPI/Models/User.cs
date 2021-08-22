using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.Models
{
    public partial class User
    {
        public User()
        {
            UserRolPrivileges = new HashSet<UserRolPrivilege>();
        }

        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime CreationDatetime { get; set; }
        public int DepartmentIdDepartment { get; set; }
        public int RolIdRol { get; set; }

        public virtual Department DepartmentIdDepartmentNavigation { get; set; }
        public virtual Rol RolIdRolNavigation { get; set; }
        public virtual ICollection<UserRolPrivilege> UserRolPrivileges { get; set; }
    }
}
