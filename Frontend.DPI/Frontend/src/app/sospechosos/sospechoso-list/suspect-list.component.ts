import { FormGroup } from '@angular/forms';
import { SuspectService } from './../suspect.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Suspects } from '../interfaces/suspects';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-suspect-list',
  templateUrl: './suspect-list.component.html',
  styleUrls: ['./suspect-list.component.css']
})
export class SuspectListComponent implements OnInit {
  @ViewChild('viewSuspectInfoModal', { static: true }) viewSuspectInfoModal: ModalDirective;
  userFilterSelected: string = '';
  Suspects: Suspects[];
  currentSuspect: Suspects;
  modalOpen :boolean=false;
  constructor(private SuspectService: SuspectService) {}

  async ngOnInit() {
    await this.getSuspects();
  }

  async getSuspects() {
    await this.SuspectService.getSuspects().then((resp) => {
      console.log(resp);
      this.Suspects = resp;
    });
  }
  ShowModal(suspect:Suspects){
    this.currentSuspect = suspect;
    this.modalOpen=true;
    console.log(this.currentSuspect.dniSuspect)
    this.viewSuspectInfoModal.show();
  }
  closeModal() {
    this.viewSuspectInfoModal.hide();
  }
}
