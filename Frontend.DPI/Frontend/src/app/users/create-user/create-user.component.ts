import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';
import { User } from '../interfaces/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @ViewChild('ctlCreateUser', {static:true}) ctlCreateUser:CreateUserModalComponent

  constructor(private userService:UsersService) { }

  userFilterSelected:User

  async ngOnInit() {
    // await this.getDataUsers();
  }

  async getDataUsers(){
    await this.userService.getUsuers().then(resp=>{
      console.log(resp);

    })
  }

  openControlCreate(){
    this.ctlCreateUser.buildModal();
  }

}
