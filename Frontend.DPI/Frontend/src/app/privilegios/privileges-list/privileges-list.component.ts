import { PrivilegesService } from './../privileges.service';
import { Component, OnInit } from '@angular/core';
import { Privileges } from '../../users/interfaces/user';

@Component({
  selector: 'app-privileges-list',
  templateUrl: './privileges-list.component.html',
  styleUrls: ['./privileges-list.component.css']
})
export class PrivilegesListComponent implements OnInit {
  totalRecords :number;
  page:number =1;
  privilegeFilterSelected: string = '';
  privileges: Privileges[];
  constructor(private privilegesService: PrivilegesService) {}

  async ngOnInit() {
    await this.getPrivileges();
  }

  async getPrivileges() {
    await this.privilegesService.getPrivileges().then((resp) => {
      this.privileges = resp;
    });
  }

}
