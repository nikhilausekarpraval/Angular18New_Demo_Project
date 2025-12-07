import { IEmployee,IEmployeeDto } from '../Interfaces/interfaces';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root' // This makes the service available globally (recommended)
})

export class EmployeeService {
    commonService: any;
    constructor( ) {
        this.commonService = new CommonService()
    }
    // private baseUrl: string = 'http://localhost:8080/employee'// spring end point
     private baseUrl: string = 'http://localhost:9091/employee'// core end point
     //private baseUrl: string = 'https://localhost:5003/gateway/employee';//oceloat-gateway : spring
    // private baseUrl: string = 'https://localhost:5003/core-gateway/employee';//oceloat-gateway : core
    //private baseUrl: string = 'http://localhost:8585/core-gateway/employee';//spring-cloud-gateway : core-application
    //private baseUrl: string = 'http://localhost:8585/spring-gateway/employee';//spring-cloud-gateway : spring-application

    // Get all employees
   async getEmployees(): Promise<IEmployee[]> {
        this.commonService.getAll(`${this.baseUrl}/get`).subscribe((data: IEmployee[]) => {
            return data;
        });
        return [];
    }

    // Get a single employee by ID
   async getEmployeeById(id: number): Promise<IEmployee> {
        return  this.commonService.getSingle(`${this.baseUrl}?id=${id}`).subscribe((data: IEmployee) => {
            return data;
        });
    }

    // Create a new employee
  async  createEmployee(employeeDto: IEmployeeDto): Promise<IEmployeeDto> {
        return  this.commonService.create(`${this.baseUrl}/register`, employeeDto).subscribe((data: IEmployeeDto) => {
            return data;
        }); 
    }

    // Update an existing employee
    async updateEmployee(id: number, employeeDto: IEmployeeDto): Promise<IEmployeeDto> {
        return  this.commonService.update(`${this.baseUrl}/update`, employeeDto).subscribe((data: IEmployeeDto) => {
            return data;
        });
    }

    // Delete an employee by ID
  async  deleteEmployee(id: number): Promise<void> {
        return  this.commonService.delete(`${this.baseUrl}/delete?employeeId=${id}`).subscribe(() => {
            return;
        });
    }
}
