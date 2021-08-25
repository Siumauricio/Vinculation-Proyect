import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateUpdateUserModalComponent } from '../create-update-user-modal/create-update-user-modal.component';
import { User, Rols } from '../interfaces/user';
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


}
