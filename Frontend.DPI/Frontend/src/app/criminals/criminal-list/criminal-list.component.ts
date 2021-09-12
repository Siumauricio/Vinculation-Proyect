import { Component, OnInit } from '@angular/core';
import { CriminalsService } from '../criminals.service';
import { Criminal } from '../Interfaces/criminal-interface';

@Component({
  selector: 'app-criminal-list',
  templateUrl: './criminal-list.component.html',
  styleUrls: ['./criminal-list.component.css']
})
export class CriminalListComponent implements OnInit {

  totalRecords :number;
  page:number =1;
  criminalsFilter:string;
  criminals: Criminal[];

  constructor(
    private criminalService:CriminalsService
    ) { }

  async ngOnInit() {
    await this.getCriminalsData();
  }

  async getCriminalsData(){
    await this.criminalService.getCriminals().then(resp=>{
      if(resp !=null){
        this.criminals = resp;
        this.totalRecords = this.criminals.length;
        console.log(this.criminals);

      }
    })
  }

}
