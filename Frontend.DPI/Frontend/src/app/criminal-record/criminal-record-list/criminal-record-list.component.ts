import { Component, OnInit } from '@angular/core';
import { Department } from '../../users/interfaces/user';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-criminal-record-list',
  templateUrl: './criminal-record-list.component.html',
  styleUrls: ['./criminal-record-list.component.css']
})
export class CriminalRecordListComponent implements OnInit {
  totalRecords :number;
  page:number =1;
  userFilterSelected: string = '';

  Departments: Department[];
  constructor(private userService: UsersService) {}

  async ngOnInit() {
    await this.getDepartments();
  }

  async getDepartments() {
    await this.userService.getDepartments().then((resp) => {
      this.Departments = resp;
    });
  }

}
