import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Rols, User, Departments } from '../interfaces/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.css']
})
export class CreateUserModalComponent implements OnInit {

  @ViewChild('createUserModal', { static: true }) createUserModal: ModalDirective;
  newUser:User = {} as User;
  passwordConfirm:string;

  correctPassword:boolean=true;

  rolsData: Rols[] = [{"idRol":1,"name":"Administrador","rolPrivileges":[],"users":[]},{"idRol":3,"name":"Test","rolPrivileges":[],"users":[]}]
  departmentsData: Departments[] = [{"idDepartment":1,"name":"Estructura Criminal","users":[]},{"idDepartment":2,"name":"Dirección de Análisis Estratégico (DAES)","users":[]},{"idDepartment":3,"name":"Recursos Humanos (RRHH)","users":[]}]

  constructor(private userService:UsersService) { }


  ngOnInit(): void {

  }



  async buildModal(user:User= {} as User){
    this.newUser = user;
    // await this.getDataDepartments();
    // await this.getDataRols();

    this.createUserModal.show();
  }


  closeModal(){
    this.createUserModal.hide();
  }

  async getDataRols(){
    await this.userService.getRols().then( resp=>{
      console.log(resp);
      this.rolsData= resp;
    })
  }

  async getDataDepartments(){
    await this.userService.getDepartments().then( resp=>{
      console.log(resp);
      this.departmentsData= resp;
    })
  }

  checkPasswords(){
    if(this.newUser.password != this.passwordConfirm)
    this.correctPassword = false;
    else
    this.correctPassword=true;
  }

  async createUser(newUser:User){
    console.log('user',newUser);

    await this.userService.createUser(newUser).then(resp=>{
      console.log(resp);
    })
  }

}
