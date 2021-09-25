import { Component, OnInit } from '@angular/core';
import { CriminalRecord } from '../../criminals/Interfaces/criminal-interface';
import { Department } from '../../users/interfaces/user';
import { UsersService } from '../../users/users.service';
import { CriminalRecordService } from '../criminals.record.service';

@Component({
  selector: 'app-criminal-record-list',
  templateUrl: './criminal-record-list.component.html',
  styleUrls: ['./criminal-record-list.component.css']
})
export class CriminalRecordListComponent implements OnInit {
  totalRecords :number;
  page:number =1;
  userFilterSelected: string = '';

  criminalRecords: CriminalRecord[];
  constructor(private criminalRecord: CriminalRecordService) {}

  async ngOnInit() {
    await this.getDepartments();
  }

  async getDepartments() {
    await this.criminalRecord.getCriminalRecords().then((resp) => {
      this.criminalRecords = resp;
      console.log(this.criminalRecords)
    });
  }

}
