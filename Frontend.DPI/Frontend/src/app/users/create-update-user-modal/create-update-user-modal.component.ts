import { Component, OnInit, Output, ViewChild ,EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { Rol, User, Department, RolPrivilege } from '../interfaces/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-create-update-user-modal',
  templateUrl: './create-update-user-modal.component.html',
  styleUrls: [ './create-update-user-modal.component.css']
})
export class CreateUpdateUserModalComponent implements OnInit {

  @ViewChild('createUserModal', { static: true }) createUserModal: ModalDirective;
  @Output() setNewUser = new EventEmitter<boolean>();

  newUser:User = {} as User;
  passwordConfirm:string='';
  isUpdate:boolean = false;
  correctPassword:boolean=true;

  rolsData: Rol[];
  departmentsData: Department[];

  assignPermissions:boolean=false;
  rolPrivileges:RolPrivilege[];
  constructor(private userService:UsersService) { }


  ngOnInit(): void {

  }



  async buildModal(user:User= {} as User){
    if(user.username!=null){
      this.isUpdate = true;
      await this.getUserByUsername(user)
    }else{
      this.newUser = user;
      this.passwordConfirm = ''
    }
    this.assignPermissions = false;
    await this.getDataDepartments();
    await this.getDataRols();

    this.createUserModal.show();
  }


  closeModal(){
    this.createUserModal.hide();
  }

  async getUserByUsername(user:User){
    await this.userService.getUserByUsername(user).then(resp=>{
      this.newUser = resp;
      this.passwordConfirm = this.newUser.password;
      console.log('resp',resp);
      console.log('newUser',this.newUser);
    })
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
      if(resp){
        this.setNewUser.emit(true);
        this.closeModal();
      }
    })
  }

  async updateUser(newUser:User){
    console.log('user',newUser);

    await this.userService.updtUser(newUser).then(resp=>{
      console.log(resp);
      if(resp){
        this.setNewUser.emit(true);
        this.closeModal();
      }
    })
  }

  async getDataRolPriviliges(){
    this.assignPermissions = !this.assignPermissions
    if(this.assignPermissions){
      await this.userService.getRolPriviliges().then(resp=>{
        console.log(resp);
        this.rolPrivileges = resp;
      })
    }
  }

  async assignUserPrivileges(idRolPrivilege:number,username:string,specialPrivilege:number =0){

    await this.userService.updtUserPrivilege(idRolPrivilege,username,specialPrivilege).then(resp=>{
      console.log(resp);
      this.rolPrivileges = resp;
    })
  }

}
