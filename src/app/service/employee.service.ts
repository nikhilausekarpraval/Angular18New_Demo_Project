import axios, { AxiosResponse } from 'axios';
import { IEmployee,IEmployeeDto } from '../Interfaces/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes the service available globally (recommended)
})

export class EmployeeService {
    // private baseUrl: string = 'http://localhost:8080/employee'// spring end point
    // private baseUrl: string = 'http://localhost:9091/employee'// core end point
    // private baseUrl: string = 'http://localhost:5003/gateway/employee';//oceloat-gateway : spring
    // private baseUrl: string = 'http://localhost:5003/core-gateway/employee';//oceloat-gateway : core

    private baseUrl: string = 'http://localhost:8585/spring-application/employee';//spring-cloud-gateway : spring-application

   // private baseUrl: string = 'http://localhost:8585/mydotnetcoreapp/employee';//spring-cloud-gateway : core-application

    // Get all employees
    getEmployees(): Promise<AxiosResponse<IEmployee[]>> {
        return axios.get<IEmployee[]>(`${this.baseUrl}/get`);
    }

    // Get a single employee by ID
    getEmployeeById(id: number): Promise<AxiosResponse<IEmployee>> {
        return axios.get<IEmployee>(`${this.baseUrl}?id=${id}`);
    }

    // Create a new employee
    createEmployee(employeeDto: IEmployeeDto): Promise<AxiosResponse<IEmployeeDto>> {
        return axios.post<IEmployeeDto>(`${this.baseUrl}/register`, employeeDto);
    }

    // Update an existing employee
    updateEmployee(id: number, employeeDto: IEmployeeDto): Promise<AxiosResponse<IEmployeeDto>> {
        return axios.put<IEmployeeDto>(`${this.baseUrl}/update`, employeeDto);
    }

    // Delete an employee by ID
    deleteEmployee(id: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${this.baseUrl}/delete?id=${id}`);
    }
}
