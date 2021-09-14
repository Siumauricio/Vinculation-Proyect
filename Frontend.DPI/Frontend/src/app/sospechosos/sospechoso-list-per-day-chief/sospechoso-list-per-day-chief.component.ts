import { AuthenticationService } from '../../authentication.service';
import { SuspectService } from '../suspect.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Suspects } from '../interfaces/suspects';

@Component({
  selector: 'app-sospechoso-list-per-day-chief',
  templateUrl: './sospechoso-list-per-day-chief.component.html',
  styleUrls: ['./sospechoso-list-per-day-chief.component.css']
})
export class SospechosoListPerDayChiefComponent implements OnInit {
  @ViewChild('viewSuspectChiefInfoModal', { static: true }) viewSuspectChiefInfoModal: ModalDirective;
  userFilterSelected: string = '';
  totalRecords :number;
  page:number =1;
  Suspects: Suspects[];
  currentSuspect: Suspects;
  modalOpen :boolean=false;
  constructor(private suspectService:SuspectService,private authService:AuthenticationService) { }

  async ngOnInit() {
    await this.getRegistersPerDay();
  }

  async getRegistersPerDay(){
    await this.suspectService.getSuspectsInsertedToday().then((resp)=>{
      this.Suspects = resp;
      this.totalRecords = this.Suspects.length;
    })
  }

  ShowModal(suspect:Suspects){
    this.currentSuspect = suspect;
    this.modalOpen=true;
    this.viewSuspectChiefInfoModal.show();
  }
  closeModal() {
    this.viewSuspectChiefInfoModal.hide();
  }

}
