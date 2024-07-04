import { Component,OnInit  } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsService } from '../../services/forms.service';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forms-list',
  standalone: true,
  imports: [EmployeeFormComponent,ButtonModule,CommonModule],
  templateUrl: './forms-list.component.html',
  styleUrl: './forms-list.component.css'
})
export class FormsListComponent implements OnInit{
  employeeForms: FormGroup[] = [];

  constructor(private fb: FormBuilder, 
              public formsService:FormsService, 
              private router: Router,
              public EmployeeService:EmployeeService,) {}

  ngOnInit(): void {
    this.addNewForm();
  }

  addNewForm(): void {
    const form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      personId: ['', Validators.required],
      professionId: ['', Validators.required],
    });
    this.employeeForms.push(form);
  }
  addList():void {
    this.formsService.addEmployeeList().subscribe(res => {
      this.EmployeeService.getEmployees().subscribe(
        data => {
          this.EmployeeService.EmployeeList = data;
          this.router.navigate(['']);
          this.formsService.clearEmployeeFormsList()
        })
    }
    );;
    console.log(this.formsService.EmployeeFormsList)
  }

}
