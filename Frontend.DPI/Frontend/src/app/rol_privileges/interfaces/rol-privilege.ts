export interface RolPrivilege{
    idRolPrivilege: number,
    name_Rol: string,
    name_Privilege: string
};

export interface CreateRolPrivilege{
    privilegeIdPrivilege: number,
    rolIdRol: number
}

export interface Privilege{
    idPrivilege: number,
    name: string
}

export interface Rol{
    idRol: number,
    name: string
}