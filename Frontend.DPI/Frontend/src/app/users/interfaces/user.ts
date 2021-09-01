export interface Department {
  idDepartment:   number;
  name:           string;
  users:          any[];
}

export interface Privileges {
  idPrivilege:    number;
  name:           string;
  rolPrivileges:  any[];
}

export interface RolPrivilege {
  idRolPrivilege:                 number;
  name_Privilege:                 string;
  name_Rol:                       string;
}

export interface Rol {
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
  departmentIdDepartmentNavigation: Department;
  rolIdRolNavigation:               Rol;
  userRolPrivileges:                UserRolPrivilege[];
}
