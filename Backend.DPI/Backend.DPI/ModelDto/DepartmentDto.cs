using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.ModelDto
{
    public partial class DepartmentDto
    {
        public DepartmentDto()
        {
            Users = new HashSet<UserDto>();
        }

        public int IdDepartment { get; set; }
        public string Name { get; set; }

        public virtual ICollection<UserDto> Users { get; set; }
    }
}
