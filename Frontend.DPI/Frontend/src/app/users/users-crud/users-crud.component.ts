import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { CreateUpdateUserModalComponent } from '../create-update-user-modal/create-update-user-modal.component';
import { User } from '../interfaces/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './users-crud.component.html',
  styleUrls: ['./users-crud.component.css']
})
export class UsersCrudComponent implements OnInit {

  @ViewChild('ctlCreateUser', {static:true}) ctlCreateUser:CreateUpdateUserModalComponent

  constructor(private userService:UsersService) { }

  userFilterSelected:string = '';
  userData: User[];

  async ngOnInit() {

    await this.getDataUsers();

  }

  async getDataUsers(){

    await this.userService.getUsuers().then(resp=>{
      console.log(resp);
      this.userData = resp;
    })
  }

  openControlCreate(user:User= {} as User){
    this.ctlCreateUser.buildModal(user);
  }

  async deleteUser(username:string){
     Swal.fire({
      title: '¿Seguro que desea eliminar el usuario?',
      text: "No podras revertir el cambio",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.userService.DeleteUser(username).then(resp=>{
          console.log(resp);
          if(resp==true   ){
            this.userData.splice(this.userData.findIndex(user=>user.username==username),1)
          }
        })
      }
    })


  }


}
