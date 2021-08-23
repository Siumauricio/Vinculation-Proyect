import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private userService:UsersService) { }

  async ngOnInit() {
    await this.getDataUsers();
  }

  async getDataUsers(){
    await this.userService.getUsuers().then(resp=>{
      console.log(resp);

    })
  }

}
