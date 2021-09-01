import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../deparment.service';

@Component({
  selector: 'app-departamento-create',
  templateUrl: './departamento-create.component.html',
  styleUrls: ['./departamento-create.component.css']
})
export class DepartamentoCreateComponent implements OnInit {

  DepartmentForm : FormGroup;

  constructor(private DepartmentService: DepartmentService,private formBuilder:FormBuilder) { 
    this.DepartmentForm = this.formBuilder.group({
      departmentName: ['',Validators.required],
  })
}

  ngOnInit(): void {
  }


  async onSubmit(){
    await this.DepartmentService.createDepartment(this.DepartmentForm.controls['departmentName'].value.trim()).then((resp)=>{
      if (resp) {
        this.DepartmentForm.setValue({
          departmentName:''
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
