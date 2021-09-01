export interface UserRolPrivilge{
    idUserRolPrivilege: number,
    username: string,
    special_Privilege: number,
    name_Rol: string,
    name_Privilege: string
}

export interface User{
 username: string,
 nombreDepartamento: string
}

export interface RolPrivilege{
    idRolPrivilege: number,
    name_Rol: string,
    name_Privilege: string
}

export interface newUserRolPrivilege{
    userUsername:string,
    specialPrivilege: number
    idRolPrivilege:number
}
