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

        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<Privilege> Privileges { get; set; }
        public virtual DbSet<Rol> Rols { get; set; }

        internal object AddAsync(RolPrivilege rolPrivilege)
        {
            throw new NotImplementedException();
        }

        public virtual DbSet<RolPrivilege> RolPrivileges { get; set; }
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
                entity.HasKey(e => new { e.IdRolPrivilege, e.PrivilegeIdPrivilege })
                    .HasName("rol_privilege_pk");

                entity.ToTable("rol_privilege");

                entity.Property(e => e.IdRolPrivilege)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id_rol_privilege");

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
