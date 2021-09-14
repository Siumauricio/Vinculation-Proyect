import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-rol-create',
  templateUrl: './rol-create.component.html',
  styleUrls: ['./rol-create.component.css']
})
export class RolCreateComponent implements OnInit {
  RolForm : FormGroup;

  constructor(private RolesService: RolesService,private formBuilder:FormBuilder) { 
    this.RolForm = this.formBuilder.group({
    rolName: ['',Validators.required],
  })
}

  ngOnInit(): void {
  }


  async onSubmit(){
    await this.RolesService.createRol(this.RolForm.controls['rolName'].value.trim()).then((resp)=>{
      if (resp == true) {
        this.RolForm.setValue({
          rolName:''
        })
      }
    });
 }

keyPressAlphanumeric(event) {
   var inp = String.fromCharCode(event.keyCode);
   if (/^[a-zA-Z0-9_ ]*$/.test(inp)) {
     return true;
   } else {
     event.preventDefault();
     return false;
   }
 }
}
