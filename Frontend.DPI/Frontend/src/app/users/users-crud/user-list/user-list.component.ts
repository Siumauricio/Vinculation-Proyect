import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userFilterSelected: string = '';
  userData: User[];
  constructor(private userService: UsersService) {}

  async ngOnInit() {
    await this.getDataUsers();
  }

  async getDataUsers() {
    await this.userService.getUsuers().then((resp) => {
      this.userData = resp;
    });
  }
}
