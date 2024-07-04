import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { EmployeeService } from '../../services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { Employee } from '../../model/employee';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { Validators, FormBuilder,ReactiveFormsModule,AbstractControl,ValidationErrors} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ProfessionsService } from '../../services/professions.service';
import { profession } from '../../model/profession';
import { DropdownModule } from 'primeng/dropdown'; 
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';



@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [TableModule,
    HttpClientModule,
    ButtonModule,
    DialogModule,
    CommonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    ConfirmPopupModule,
    DropdownModule,
    ToastModule    
  ],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css',
  providers: [ConfirmationService, MessageService]
})
export class EmployeeTableComponent  implements OnInit{
  employees: any[] = [];
  visible: boolean = false;
  selectedEmployeeId: number | null = null;
  employee:Employee = new Employee();
  selectedEmployee: Employee = new Employee();
  professions :profession[]= [];

  updateEmployeeForm = this.fb.group({
    firstName: ['', this.validateFirstName],
    lastName: ['', Validators.required],
    age: [0, Validators.required],
    personId: ['', Validators.required],
    professionId: [0, Validators.required],
  });


  validateFirstName(control: AbstractControl): ValidationErrors | null {
    return control.value.length < 3 || control.value.length > 7 ? { wrongUserName: { value: control.value } } : null;

  }

  constructor(private confirmationService: ConfirmationService, 
              private messageService: MessageService,
              public EmployeeService:EmployeeService,
              private router: Router,private fb: FormBuilder,
              public professionsService:ProfessionsService ) { }

  ngOnInit() {
    this.EmployeeService.getEmployees().subscribe(data => {
      console.log("API CALL ENDED");
      console.log(data);

      this.EmployeeService.EmployeeList = data;
      this.employees = this.EmployeeService.EmployeeList;
    }
    );
    this.professionsService.getProfessions().subscribe(data => {
      console.log(data);

      this.professionsService.professionsList = data;
      this.professions = this.professionsService.professionsList;
    }
    );


  }
  deleteEmployee(Employee : Employee):void {
    console.log(Employee.id);
    this.EmployeeService.deleteEmployee(Employee).subscribe(res => {
      this.EmployeeService.getEmployees().subscribe(
        data => {
          this.EmployeeService.EmployeeList = data
          this.employees = this.EmployeeService.EmployeeList;
        })
    }
    );
  }

  goToAddPage(){
    this.router.navigate(['/add']);
  }
  showDialog(selectedEmployee : Employee) {
    this.visible = true;

    this.selectedEmployeeId = selectedEmployee.id;
    Object.assign(this.selectedEmployee, selectedEmployee)

    this.updateEmployeeForm.patchValue({
      firstName: this.selectedEmployee.firstName ,
      lastName: this.selectedEmployee.lastName ,
      age: this.selectedEmployee.age ,
      personId: this.selectedEmployee.personId ,
      professionId: this.selectedEmployee.professionId 
    });
   
    console.log(selectedEmployee)
    console.log(this.selectedEmployee)
    console.log(this.selectedEmployeeId)
  }

  UpdateEmployee(){
    console.log( this.selectedEmployeeId)
    console.log(this.updateEmployeeForm.value)

    const formValues = this.updateEmployeeForm.value;
    Object.assign(this.employee, this.updateEmployeeForm.value)
    if(this.selectedEmployeeId != null){
        this.employee.id=this.selectedEmployeeId;
    }

    console.log(this.employee)
    this.EmployeeService.updateEmployee(this.employee).subscribe(res => {
      this.EmployeeService.getEmployees().subscribe(
        data => {
          this.EmployeeService.EmployeeList = data;
          this.employees = this.EmployeeService.EmployeeList;
          this.visible = false;
        })
    }
    );
    
  }
  confirm1(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure that you want to update?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted',life: 3000});
            setTimeout(() => {
              this.UpdateEmployee(); 
            }, 1000);
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

  confirm2(event: MouseEvent, employee:Employee) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete?',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 2000});
        setTimeout(() => {
          this.deleteEmployee(employee); 
        }, 1000); 
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected',life: 2000  });
      }
    });
  }

}
