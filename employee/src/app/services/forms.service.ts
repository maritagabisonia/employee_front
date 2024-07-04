import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable  } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  public EmployeeForms: Employee[] = []
  constructor(public http: HttpClient) { }

  addEmployeeForm(employeeForm:Employee):void{
    this.EmployeeFormsList.push(employeeForm)
    console.log("added")
    console.log(employeeForm)
  }
  deleteEmployeeForm(personId: string): void {
    this.EmployeeFormsList = this.EmployeeFormsList.filter(form => form.personId !== personId);
    console.log("deleted");
    console.log(personId)

  }
  addEmployeeList(): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<any>("https://localhost:7245/api/employee/list", this.EmployeeFormsList , httpOptions);
  };
  clearEmployeeFormsList(): void {
    this.EmployeeFormsList = [];
    console.log("all data deleted");
  }

  get EmployeeFormsList(): Employee[] {
    return this.EmployeeForms
  }
  set EmployeeFormsList(list: Employee[]) {
    this.EmployeeForms = list;
  }
}
