import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Employee } from '../models/employee'
import { Observable } from 'rxjs'
import { NgForm } from '@angular/forms'

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  URL_API = 'http://localhost:3000/api/employees'

  selectedEmployee: Employee = {} as any
  employees: Employee[] = []

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.URL_API)
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.URL_API, employee)
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.URL_API}/${id}`)
  }

  editEmployee(employee: Employee) {
    return this.http.put(`${this.URL_API}/${employee._id}`, employee)
  }
}
