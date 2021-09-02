import { AuthenticationService } from './../../authentication.service';
import { SuspectService } from './../suspect.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Suspects } from '../interfaces/suspects';

@Component({
  selector: 'app-sospechoso-list-per-day',
  templateUrl: './sospechoso-list-per-day.component.html',
  styleUrls: ['./sospechoso-list-per-day.component.css']
})
export class SospechosoListPerDayComponent implements OnInit {
  @ViewChild('viewSuspectInfoModal', { static: true }) viewSuspectInfoModal: ModalDirective;
  userFilterSelected: string = '';
  totalRecords :number;
  page:number =1;
  Suspects: Suspects[];
  currentSuspect: Suspects;
  modalOpen :boolean=false;
  constructor(private suspectService:SuspectService,private authService:AuthenticationService) { }

  async ngOnInit() {
    await this.getRegistersPerDay(this.authService.currentUser.username);
  }

  async getRegistersPerDay(username){
    await this.suspectService.getSuspectsInsertedToday(username).then((resp)=>{
      this.Suspects = resp;
      console.log(this.Suspects)
      this.totalRecords = this.Suspects.length;
    })
  }

  ShowModal(suspect:Suspects){
    this.currentSuspect = suspect;
    this.modalOpen=true;
    this.viewSuspectInfoModal.show();
  }
  closeModal() {
    this.viewSuspectInfoModal.hide();
  }

}
