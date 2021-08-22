using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DPI.ModelDto
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public int DepartmentIdDepartment { get; set; }
        public int RolIdRol { get; set; }
    }
}
