import axios, { AxiosResponse } from 'axios';
import { IEmployee,IEmployeeDto } from '../Interfaces/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes the service available globally (recommended)
})

export class EmployeeService {
    // private baseUrl: string = 'http://localhost:8080/employee'// spring end point
     private baseUrl: string = 'http://localhost:9091/employee'// core end point
     //private baseUrl: string = 'https://localhost:5003/gateway/employee';//oceloat-gateway : spring
    // private baseUrl: string = 'https://localhost:5003/core-gateway/employee';//oceloat-gateway : core
    //private baseUrl: string = 'http://localhost:8585/core-gateway/employee';//spring-cloud-gateway : core-application
    //private baseUrl: string = 'http://localhost:8585/spring-gateway/employee';//spring-cloud-gateway : spring-application

    // Get all employees
   async getEmployees(): Promise<AxiosResponse<IEmployee[]>> {
        return await axios.get<IEmployee[]>(`${this.baseUrl}/get`, {
            headers: {'Content-Type': 'application/json',},withCredentials: false  
        });
    }

    // Get a single employee by ID
   async getEmployeeById(id: number): Promise<AxiosResponse<IEmployee>> {
        return await axios.get<IEmployee>(`${this.baseUrl}?id=${id}`);
    }

    // Create a new employee
  async  createEmployee(employeeDto: IEmployeeDto): Promise<AxiosResponse<IEmployeeDto>> {
        return await axios.post<IEmployeeDto>(`${this.baseUrl}/register`, employeeDto);
    }

    // Update an existing employee
    async updateEmployee(id: number, employeeDto: IEmployeeDto): Promise<AxiosResponse<IEmployeeDto>> {
        return await axios.put<IEmployeeDto>(`${this.baseUrl}/update`, employeeDto);
    }

    // Delete an employee by ID
  async  deleteEmployee(id: number): Promise<AxiosResponse<void>> {
        return await axios.delete<void>(`${this.baseUrl}/delete?employeeId=${id}`);
    }
}
