import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.css']
})
export class CreateUserModalComponent implements OnInit {

  @ViewChild('createUserModal', { static: true }) createUserModal: ModalDirective;

  constructor() { }

  ngOnInit(): void {

  }



  buildModal(){
    this.createUserModal.show();
  }


  closeModal(){
    this.createUserModal.hide();
  }
}
