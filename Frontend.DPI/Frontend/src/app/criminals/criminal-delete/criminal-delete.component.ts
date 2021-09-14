import { Component, OnInit } from '@angular/core';
import { CriminalsService } from '../criminals.service';
import { Criminal } from '../Interfaces/criminal-interface';

@Component({
  selector: 'app-criminal-delete',
  templateUrl: './criminal-delete.component.html',
  styleUrls: ['./criminal-delete.component.css']
})
export class CriminalDeleteComponent implements OnInit {

  criminalData: Criminal[];
  dniCriminal: string;


  constructor(
    private criminalService:CriminalsService
  ) { }

  ngOnInit(): void {
  }

  async getCriminalDataByDNI(dni:string){
    await  this.criminalService.getCriminalByDNI(dni).then(resp=>{
       this.criminalData = resp;
       console.log(this.criminalData);

     })
   }


}
