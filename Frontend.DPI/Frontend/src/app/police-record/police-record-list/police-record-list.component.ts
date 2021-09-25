import { PoliceRecord } from './../../criminals/Interfaces/criminal-interface';
import { Component, OnInit } from '@angular/core';
import { PoliceRecordService } from '../police.record.service';

@Component({
  selector: 'app-police-record-list',
  templateUrl: './police-record-list.component.html',
  styleUrls: ['./police-record-list.component.css']
})

export class PoliceRecordListComponent implements OnInit {

  totalRecords :number;
  page:number =1;
  userFilterSelected: string = '';

  policeRecord: PoliceRecord[];
  constructor(private criminalRecord: PoliceRecordService) {}

  async ngOnInit() {
    await this.getPoliceRecord();
  }

  async getPoliceRecord() {
    await this.criminalRecord.getPoliceRecords().then((resp) => {
      this.policeRecord = resp;
      console.log(this.policeRecord)
    });
  }

}
