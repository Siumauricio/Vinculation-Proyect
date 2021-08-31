import { Department } from './../../users/interfaces/user';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-departamento-list',
  templateUrl: './departamento-list.component.html',
  styleUrls: ['./departamento-list.component.css']
})
export class DepartamentoListComponent implements OnInit {

  userFilterSelected: string = '';
  Departments: Department[];
  constructor(private userService: UsersService) {}

  async ngOnInit() {
    await this.getDepartments();
  }

  async getDepartments() {
    await this.userService.getDepartments().then((resp) => {
      console.log(resp);
      this.Departments = resp;
    });
  }

}
