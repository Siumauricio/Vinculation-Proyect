import { User } from "src/app/users/interfaces/user";

  export interface CriminalGroupIdCgNavigation {
      idCg: number;
      nombreGrupoCriminal: string;
      criminalData: any[];
  }

  export interface PrivilegeIdPrivilegeNavigation {
      idPrivilege: number;
      name: string;
      tipoPrivilegio: string;
      rolPrivileges: any[];
  }

  export interface RolPrivilege {
      idRolPrivilege: number;
      privilegeIdPrivilege: number;
      rolIdRol: number;
      privilegeIdPrivilegeNavigation: PrivilegeIdPrivilegeNavigation;
  }

  export interface RolIdRolNavigation {
      idRol: number;
      name: string;
      rolPrivileges: RolPrivilege[];
      users: any[];
  }

  export interface UserRolPrivilege {
      idUserRolPrivilege: number;
      specialPrivilege: number;
      userUsername: string;
      idRolPrivilege: number;
  }



  export interface DepartmentIdDepartmentNavigation {
      idDepartment: number;
      name: string;
      suspects: any[];
      users: User[];
  }

  export interface CriminalRecord {
      idCriminalRecord: number;
      crime: string;
      sentenceStartDate?: Date;
      sentenceFinalDate?: Date;
      penitentiaryCenter: string;
      moduleCellPrison: string;
      suspectDni: string;
  }

  export interface PoliceRecord {
      idPoliceRecord: number;
      reasonDetention: string;
      detentionDate: Date;
      detentionDepartment: string;
      capturedByOrganization: string;
      confiscationType: string;
      confiscationQuantity: string;
      confiscationDescription: string;
      detentionMunicipio: string;
      colonia: string;
      caserio: string;
      village: string;
      suspectDni: string;
  }

  export interface SuspectDniNavigation {
      dniSuspect: string;
      firstName: string;
      middleName: string;
      thirdName: string;
      lastName: string;
      alias: string;
      sex: string;
      height: number;
      weight: number;
      eyesColor: string;
      build: string;
      personFrom: string;
      ocupattion: string;
      passportNumber: string;
      particularSign: string;
      tattoo: string;
      operationPlace: string;
      dateOfBirth: Date;
      nationaliy: string;
      age: number;
      civilStatus: string;
      colonia: string;
      street: string;
      avenue: string;
      village: string;
      caserio: string;
      houseNumber: number;
      pasaje: string;
      referenceAddress: string;
      department: string;
      municipio: string;
      recordStatus: string;
      usernameRegistryData: string;
      departmentIdDepartment: number;
      creationDate: Date;
      lastModificationUser: string;
      departmentIdDepartmentNavigation: DepartmentIdDepartmentNavigation;
      criminalData: any[];
      criminalRecords: CriminalRecord[];
      policeRecords: PoliceRecord[];
  }

  export interface Criminal {
      idCriminalData: number;
      incidenceType: string;
      incidenceZone: string;
      hierarchyCriminalGroup: string;
      periodBelong: string;
      operationPlace: string;
      tatooType: string;
      suspectDni: string;
      criminalGroupName:string;
      criminalGroupIdCg: number;
      criminalGroupIdCgNavigation: CriminalGroupIdCgNavigation;
      suspectDniNavigation: SuspectDniNavigation;
  }

  export interface CriminalGroup {
      idCg:number;
      nombreGrupoCriminal:string;
  }
