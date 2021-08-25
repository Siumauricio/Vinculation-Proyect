

export interface Departments {
  idDepartment:   number;
  name:           string;
  users:          any[];
}

export interface PrivilegeIdPrivilegeNavigation {
  idPrivilege:    number;
  name:           string;
  rolPrivileges:  any[];
}

export interface RolPrivilege {
  idRolPrivilege:                 number;
  privilegeIdPrivilege:           number;
  rolIdRol:                       number;
  privilegeIdPrivilegeNavigation: PrivilegeIdPrivilegeNavigation;
}

export interface Rols {
  idRol:          number;
  name:           string;
  rolPrivileges:  RolPrivilege[];
  users:          any[];
}

export interface UserRolPrivilege {
  idUserRolPrivilege: number;
  specialPrivilege:   number;
  userUsername:       string;
  idRolPrivilege:     number;
}

export interface User {
  username:                         string;
  password:                         string;
  creationDatetime:                 string;
  fechaCreacion:                    string
  nombreDepartamento:               string;
  nombreRol:                        string;
  departmentIdDepartment:           number;
  rolIdRol:                         number;
  departmentIdDepartmentNavigation: Departments;
  rolIdRolNavigation:               Rols;
  userRolPrivileges:                UserRolPrivilege[];
}
