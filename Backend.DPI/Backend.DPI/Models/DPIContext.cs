using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Backend.DPI.Models
{
    public partial class DPIContext : DbContext
    {
        public DPIContext()
        {
        }

        public DPIContext(DbContextOptions<DPIContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CriminalDatum> CriminalData { get; set; }
        public virtual DbSet<CriminalGroupDto> CriminalGroups { get; set; }
        public virtual DbSet<CriminalRecord> CriminalRecords { get; set; }
        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<PoliceRecord> PoliceRecords { get; set; }
        public virtual DbSet<Privilege> Privileges { get; set; }
        public virtual DbSet<Rol> Rols { get; set; }
        public virtual DbSet<RolPrivilege> RolPrivileges { get; set; }
        public virtual DbSet<Suspect> Suspects { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserRolPrivilege> UserRolPrivileges { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=dpi.database.windows.net;Database=DPI;User=admindpi;Password=dpiadmin1$;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<CriminalDatum>(entity =>
            {
                entity.HasKey(e => e.IdCriminalData)
                    .HasName("criminal_data_pk");

                entity.ToTable("criminal_data");

                entity.Property(e => e.IdCriminalData).HasColumnName("id_criminal_data");

                entity.Property(e => e.CriminalGroupIdCg).HasColumnName("criminal_group_id_cg");

                entity.Property(e => e.HierarchyCriminalGroup)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("hierarchy_criminal_group");

                entity.Property(e => e.IncidenceType)
                    .HasMaxLength(9)
                    .IsUnicode(false)
                    .HasColumnName("incidence_type");

                entity.Property(e => e.IncidenceZone)
                    .HasMaxLength(16)
                    .IsUnicode(false)
                    .HasColumnName("incidence_zone");

                entity.Property(e => e.OperationPlace)
                    .IsRequired()
                    .HasMaxLength(60)
                    .IsUnicode(false)
                    .HasColumnName("operation_place");

                entity.Property(e => e.PeriodBelong)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("period_belong");

                entity.Property(e => e.SuspectDni)
                    .IsRequired()
                    .HasMaxLength(16)
                    .IsUnicode(false)
                    .HasColumnName("suspect_dni");

                entity.Property(e => e.TatooType)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasColumnName("tatoo_type");

                entity.HasOne(d => d.CriminalGroupIdCgNavigation)
                    .WithMany(p => p.CriminalData)
                    .HasForeignKey(d => d.CriminalGroupIdCg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("criminal_data_cg_fk");

                entity.HasOne(d => d.SuspectDniNavigation)
                    .WithMany(p => p.CriminalData)
                    .HasForeignKey(d => d.SuspectDni)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("criminal_data_suspect_fk");
            });

            modelBuilder.Entity<CriminalGroupDto>(entity =>
            {
                entity.HasKey(e => e.IdCg)
                    .HasName("criminal_group_pk");

                entity.ToTable("criminal_group");

                entity.Property(e => e.IdCg).HasColumnName("id_cg");

                entity.Property(e => e.NombreGrupoCriminal)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("nombre_grupo_criminal");
            });

            modelBuilder.Entity<CriminalRecord>(entity =>
            {
                entity.HasKey(e => e.IdCriminalRecord)
                    .HasName("criminal_record_pk");

                entity.ToTable("criminal_record");

                entity.Property(e => e.IdCriminalRecord).HasColumnName("id_criminal_record");

                entity.Property(e => e.Crime)
                    .HasMaxLength(65)
                    .IsUnicode(false)
                    .HasColumnName("crime");

                entity.Property(e => e.ModuleCellPrison)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("module_cell_prison");

                entity.Property(e => e.PenitentiaryCenter)
                    .HasMaxLength(35)
                    .IsUnicode(false)
                    .HasColumnName("penitentiary_center");

                entity.Property(e => e.SentenceFinalDate)
                    .HasColumnType("date")
                    .HasColumnName("sentence_final_date");

                entity.Property(e => e.SentenceStartDate)
                    .HasColumnType("date")
                    .HasColumnName("sentence_start_date");

                entity.Property(e => e.SuspectDni)
                    .IsRequired()
                    .HasMaxLength(16)
                    .IsUnicode(false)
                    .HasColumnName("suspect_dni");

                entity.HasOne(d => d.SuspectDniNavigation)
                    .WithMany(p => p.CriminalRecords)
                    .HasForeignKey(d => d.SuspectDni)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("criminal_record_suspect_fk");
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.HasKey(e => e.IdDepartment)
                    .HasName("department_pk");

                entity.ToTable("department");

                entity.Property(e => e.IdDepartment).HasColumnName("id_department");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(60)
                    .IsUnicode(false)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<PoliceRecord>(entity =>
            {
                entity.HasKey(e => e.IdPoliceRecord)
                    .HasName("police_record_pk");

                entity.ToTable("police_record");

                entity.Property(e => e.IdPoliceRecord).HasColumnName("id_police_record");

                entity.Property(e => e.CapturedByOrganization)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("captured_by_organization");

                entity.Property(e => e.Caserio)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("caserio");

                entity.Property(e => e.Colonia)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("colonia");

                entity.Property(e => e.ConfiscationDescription)
                    .HasMaxLength(65)
                    .IsUnicode(false)
                    .HasColumnName("confiscation_description");

                entity.Property(e => e.ConfiscationQuantity)
                    .HasMaxLength(65)
                    .IsUnicode(false)
                    .HasColumnName("confiscation_quantity");

                entity.Property(e => e.ConfiscationType)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("confiscation_type");

                entity.Property(e => e.DetentionDate)
                    .HasColumnType("date")
                    .HasColumnName("detention_date");

                entity.Property(e => e.DetentionDepartment)
                    .IsRequired()
                    .HasMaxLength(17)
                    .IsUnicode(false)
                    .HasColumnName("detention_department");

                entity.Property(e => e.DetentionMunicipio)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("detention_municipio");

                entity.Property(e => e.ReasonDetention)
                    .IsRequired()
                    .HasMaxLength(65)
                    .IsUnicode(false)
                    .HasColumnName("reason_detention");

                entity.Property(e => e.SuspectDni)
                    .IsRequired()
                    .HasMaxLength(16)
                    .IsUnicode(false)
                    .HasColumnName("suspect_dni");

                entity.Property(e => e.Village)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("village");

                entity.HasOne(d => d.SuspectDniNavigation)
                    .WithMany(p => p.PoliceRecords)
                    .HasForeignKey(d => d.SuspectDni)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("police_record_suspect_fk");
            });

            modelBuilder.Entity<Privilege>(entity =>
            {
                entity.HasKey(e => e.IdPrivilege)
                    .HasName("access_pk");

                entity.ToTable("privilege");

                entity.Property(e => e.IdPrivilege).HasColumnName("id_privilege");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.TipoPrivilegio)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("tipo_privilegio");
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.HasKey(e => e.IdRol)
                    .HasName("rol_pk");

                entity.ToTable("rol");

                entity.Property(e => e.IdRol).HasColumnName("id_rol");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<RolPrivilege>(entity =>
            {
                entity.HasKey(e => e.IdRolPrivilege);

                entity.ToTable("rol_privilege");

                entity.Property(e => e.IdRolPrivilege).HasColumnName("id_rol_privilege");

                entity.Property(e => e.PrivilegeIdPrivilege).HasColumnName("privilege_id_privilege");

                entity.Property(e => e.RolIdRol).HasColumnName("rol_id_rol");

                entity.HasOne(d => d.PrivilegeIdPrivilegeNavigation)
                    .WithMany(p => p.RolPrivileges)
                    .HasForeignKey(d => d.PrivilegeIdPrivilege)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("rol_privilege_privilege_fk");

                entity.HasOne(d => d.RolIdRolNavigation)
                    .WithMany(p => p.RolPrivileges)
                    .HasForeignKey(d => d.RolIdRol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("rol_privilege_rol_fk");
            });

            modelBuilder.Entity<Suspect>(entity =>
            {
                entity.HasKey(e => e.DniSuspect)
                    .HasName("suspect_pk");

                entity.ToTable("suspect");

                entity.Property(e => e.DniSuspect)
                    .HasMaxLength(16)
                    .IsUnicode(false)
                    .HasColumnName("dni_suspect");

                entity.Property(e => e.Age).HasColumnName("age");

                entity.Property(e => e.Alias)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("alias");

                entity.Property(e => e.Avenue)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("avenue");

                entity.Property(e => e.Build)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("build");

                entity.Property(e => e.Caserio)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("caserio");

                entity.Property(e => e.CivilStatus)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("civil_status");

                entity.Property(e => e.Colonia)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("colonia");

                entity.Property(e => e.CreationDate)
                    .HasColumnType("date")
                    .HasColumnName("creation_date")
                    .HasDefaultValueSql("('2021-09-02')");

                entity.Property(e => e.DateOfBirth)
                    .HasColumnType("date")
                    .HasColumnName("date_of_birth");

                entity.Property(e => e.Department)
                    .IsRequired()
                    .HasMaxLength(17)
                    .IsUnicode(false)
                    .HasColumnName("department");

                entity.Property(e => e.DepartmentIdDepartment).HasColumnName("department_id_department");

                entity.Property(e => e.EyesColor)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("eyes_color");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("first_name");

                entity.Property(e => e.Height).HasColumnName("height");

                entity.Property(e => e.HouseNumber).HasColumnName("house_number");

                entity.Property(e => e.LastModificationUser)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("last_modification_user");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("last_name");

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("middle_name");

                entity.Property(e => e.Municipio)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("municipio");

                entity.Property(e => e.Nationaliy)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("nationaliy");

                entity.Property(e => e.Ocupattion)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ocupattion");

                entity.Property(e => e.OperationPlace)
                    .HasMaxLength(60)
                    .IsUnicode(false)
                    .HasColumnName("operation_place");

                entity.Property(e => e.ParticularSign)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("particular_sign");

                entity.Property(e => e.Pasaje)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("pasaje");

                entity.Property(e => e.PassportNumber)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("passport_number");

                entity.Property(e => e.PersonFrom)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("person_from");

                entity.Property(e => e.RecordStatus)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("record_status");

                entity.Property(e => e.ReferenceAddress)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("reference_address");

                entity.Property(e => e.Sex)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("sex");

                entity.Property(e => e.Street)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("street");

                entity.Property(e => e.Tattoo)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("tattoo");

                entity.Property(e => e.ThirdName)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("third_name");

                entity.Property(e => e.UsernameRegistryData)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("username_registry_data");

                entity.Property(e => e.Village)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("village");

                entity.Property(e => e.Weight).HasColumnName("weight");

                entity.HasOne(d => d.DepartmentIdDepartmentNavigation)
                    .WithMany(p => p.Suspects)
                    .HasForeignKey(d => d.DepartmentIdDepartment)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("suspect_department_fk");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Username)
                    .HasName("user_pk");

                entity.ToTable("User");

                entity.Property(e => e.Username)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.Property(e => e.CreationDatetime)
                    .HasColumnType("date")
                    .HasColumnName("creation_datetime");

                entity.Property(e => e.DepartmentIdDepartment).HasColumnName("department_id_department");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.RolIdRol).HasColumnName("rol_id_rol");

                entity.HasOne(d => d.DepartmentIdDepartmentNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.DepartmentIdDepartment)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("user_department_fk");

                entity.HasOne(d => d.RolIdRolNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RolIdRol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("user_rol_fk");
            });

            modelBuilder.Entity<UserRolPrivilege>(entity =>
            {
                entity.HasKey(e => e.IdUserRolPrivilege)
                    .HasName("user_rol_privilege_pk");

                entity.ToTable("user_rol_privilege");

                entity.Property(e => e.IdUserRolPrivilege).HasColumnName("id_user_rol_privilege");

                entity.Property(e => e.IdRolPrivilege).HasColumnName("id_rol_privilege");

                entity.Property(e => e.SpecialPrivilege).HasColumnName("special_privilege");

                entity.Property(e => e.UserUsername)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("user_username");

                entity.HasOne(d => d.UserUsernameNavigation)
                    .WithMany(p => p.UserRolPrivileges)
                    .HasForeignKey(d => d.UserUsername)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("user_rol_privilege_user_fk");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
