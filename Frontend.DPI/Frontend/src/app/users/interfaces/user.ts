export interface User {
  username:               string;
  password:               string;
  departmentIdDepartment: number;
  rolIdRol:               number;
}



export interface DepartmentIdDepartmentNavigation {
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

export interface RolIdRolNavigation {
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

export interface RootObject {
  username:                         string;
  password:                         string;
  creationDatetime:                 Date;
  departmentIdDepartment:           number;
  rolIdRol:                         number;
  departmentIdDepartmentNavigation: DepartmentIdDepartmentNavigation;
  rolIdRolNavigation:               RolIdRolNavigation;
  userRolPrivileges:                UserRolPrivilege[];
}
