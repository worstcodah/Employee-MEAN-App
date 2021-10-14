import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Employee } from '../models/employee'
import { EmployeeService } from '../services/employee.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees()
  }

  resetForm(form: NgForm) {
    form.reset()
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      (res) => {
        this.employeeService.employees = res
      },
      (err) => console.error(err),
    )
  }

  addEmployee(form: NgForm) {
    if (form.value._id) {
      this.employeeService.editEmployee(form.value).subscribe((res) => {
        console.log(res)
      })
    } else {
      this.employeeService.createEmployee(form.value).subscribe(
        (res) => {
          this.getEmployees()
          form.reset()
        },
        (err) => {
          console.log(err)
        },
      )
    }
  }

  deleteEmployee(id: string) {
    const res = confirm(
      `are you sure you wanna delete the employee with id ${id}?`,
    )
    if (res) {
      this.employeeService.deleteEmployee(id).subscribe(
        (res) => {
          this.getEmployees()
        },
        (err) => {
          console.log(err)
        },
      )
    }
  }

  editEmployee(employee: Employee) {
    if (this.employeeService.selectedEmployee != ({} as any)) {
      this.employeeService.selectedEmployee = employee
    } else {
      this.employeeService.selectedEmployee = {} as any
    }
  }
}
