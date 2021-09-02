using System;
using System.Collections.Generic;

#nullable disable

namespace Backend.DPI.Models
{
    public partial class Suspect
    {
        public Suspect()
        {
            CriminalData = new HashSet<CriminalDatum>();
            CriminalRecords = new HashSet<CriminalRecord>();
            PoliceRecords = new HashSet<PoliceRecord>();
        }

        public string DniSuspect { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string ThirdName { get; set; }
        public string LastName { get; set; }
        public string Alias { get; set; }
        public string Sex { get; set; }
        public float Height { get; set; }
        public float Weight { get; set; }
        public string EyesColor { get; set; }
        public string Build { get; set; }
        public string PersonFrom { get; set; }
        public string Ocupattion { get; set; }
        public string PassportNumber { get; set; }
        public string ParticularSign { get; set; }
        public string Tattoo { get; set; }
        public string OperationPlace { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Nationaliy { get; set; }
        public int Age { get; set; }
        public string CivilStatus { get; set; }
        public string Colonia { get; set; }
        public string Street { get; set; }
        public string Avenue { get; set; }
        public string Village { get; set; }
        public string Caserio { get; set; }
        public int? HouseNumber { get; set; }
        public string Pasaje { get; set; }
        public string ReferenceAddress { get; set; }
        public string Department { get; set; }
        public string Municipio { get; set; }
        public string RecordStatus { get; set; }
        public string UsernameRegistryData { get; set; }
        public int DepartmentIdDepartment { get; set; }
        public DateTime CreationDate { get; set; }

        public virtual Department DepartmentIdDepartmentNavigation { get; set; }
        public virtual ICollection<CriminalDatum> CriminalData { get; set; }
        public virtual ICollection<CriminalRecord> CriminalRecords { get; set; }
        public virtual ICollection<PoliceRecord> PoliceRecords { get; set; }
    }
}
