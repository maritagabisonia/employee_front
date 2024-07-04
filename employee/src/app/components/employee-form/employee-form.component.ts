import { Component } from '@angular/core';
import { FormBuilder, Validators,ReactiveFormsModule,AbstractControl,ValidationErrors,FormGroup ,FormArray  }
  from '@angular/forms';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../services/employee.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown'; 
import { ProfessionsService } from '../../services/professions.service';
import { profession } from '../../model/profession';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsService } from '../../services/forms.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { EmployeeWithContacts } from '../../model/employeeWithContacts';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    CheckboxModule ,
    FormsModule,NgFor
    ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
  providers: [ConfirmationService, MessageService]
})
export class EmployeeFormComponent {
  employee: Employee = new Employee();
  empContact: EmployeeWithContacts = new EmployeeWithContacts();
  professions :profession[]= [];
  checked: boolean = false;
  empForm: FormGroup;

  // employeeForm = this.fb.group({
  //   firstName: ['', this.validateFirstName],
  //   lastName: ['', Validators.required],
  //   age: [, Validators.required],
  //   personId: ['', Validators.required],
  //   professionId: [, Validators.required],
  //   contactsDetails: this.fb.array([this.createContact()])
  // });


  validateFirstName(control: AbstractControl): ValidationErrors | null {
    return control.value.length < 3 || control.value.length > 7 ? { wrongUserName: { value: control.value } } : null;

  }


  constructor(private confirmationService: ConfirmationService, 
              private messageService: MessageService, 
              private fb: FormBuilder,
              public EmployeeService:EmployeeService,
              private router: Router,
              public professionsService:ProfessionsService,
              public formsService:FormsService) 
  {
    this.empForm = this.fb.group({
        firstName: ['', this.validateFirstName],
        lastName: ['', Validators.required],
        age: [, Validators.required],
        personId: ['', Validators.required],
        professionId: [, Validators.required],
        contactsDetails: this.fb.array([this.createContact()])
    });

  }
  ngOnInit() {
    this.professionsService.getProfessions().subscribe(data => {
      console.log(data);

      this.professionsService.professionsList = data;
      this.professions = this.professionsService.professionsList;
    }
    );

  }
  get contactsDetails(): FormArray {
    return this.empForm.get('contactsDetails') as FormArray;
  }
   createContact(): FormGroup {
    return this.fb.group({
      phoneNumber: ['', Validators.required]
    });
  }
  addContact(): void {
    this.contactsDetails.push(this.createContact());
  }
  AddEmployee(){
    console.log(this.empForm.value)

    Object.assign(this.empContact, this.empForm.value)
    console.log(this.empContact)
    this.EmployeeService.addEmployeeWithContacts(this.empContact).subscribe(res => {
      this.EmployeeService.getEmployees().subscribe(
          data => {
              this.EmployeeService.EmployeeList = data;
             this.router.navigate(['']);
          })
    })
    // this.EmployeeService.addEmployee(this.employee).subscribe(res => {
    //   this.EmployeeService.getEmployees().subscribe(
    //     data => {
    //       this.EmployeeService.EmployeeList = data;
    //       this.router.navigate(['']);
    //     })
    // }
    // );
  
  }
    confirm1(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to save?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
                setTimeout(() => {
                  this.AddEmployee(); 
                }, 1000); 
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }

    confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",

            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' , life: 2000 });
                this.router.navigate(['']);
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 2000 });
            }
        });
    }

    toggleForm(event: any): void {
      if (this.checked) {
        this.AddNewFormToList();
      } else {
        this.removeFormFromList();
      }
    }

    AddNewFormToList(){
       console.log(this.empForm.value)
       Object.assign(this.employee, this.empForm.value)
      this.formsService.addEmployeeForm(this.employee)

    }
    removeFormFromList(){
      console.log(this.empForm.value)
      Object.assign(this.employee, this.empForm.value)
      this.formsService.deleteEmployeeForm(this.employee.personId)
    }




}
