import { HttpClient,HttpHandler, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable,throwError  } from 'rxjs';
import { EmployeeDto } from '../model/employeeDto';
import { EmployeeWithContacts } from '../model/employeeWithContacts';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public EmployeeDto: EmployeeDto[] = []

  constructor(public http: HttpClient) { }

  getEmployees(): Observable<EmployeeDto[]> {
    console.log(1)
    return this.http.get<EmployeeDto[]>("https://localhost:7245/api/employee");

  };
  deleteEmployee(employee:Employee): Observable<any>{
      let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    console.log(employee)
    return this.http.delete<any>("https://localhost:7245/api/employee?id=" + employee.id, httpOptions);

  }
  addEmployee(employee:Employee): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<any>("https://localhost:7245/api/employee", employee , httpOptions);
  };
  updateEmployee(employee:Employee): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.put<any>("https://localhost:7245/api/employee", employee , httpOptions);
  }
  addEmployeeWithContacts(EmployeeWithContacts:EmployeeWithContacts): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<any>("https://localhost:7245/api/employee/contacts", EmployeeWithContacts , httpOptions);
  };

  get EmployeeList(): EmployeeDto[] {
    return this.EmployeeDto
  }
  set EmployeeList(list: EmployeeDto[]) {
    this.EmployeeDto = list;
  }
}
