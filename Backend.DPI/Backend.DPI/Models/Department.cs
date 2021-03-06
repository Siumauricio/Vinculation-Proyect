using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.Models
{
    public partial class Department
    {
        public Department()
        {
            Suspects = new HashSet<Suspect>();
            Users = new HashSet<User>();
        }

        public int IdDepartment { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Suspect> Suspects { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
