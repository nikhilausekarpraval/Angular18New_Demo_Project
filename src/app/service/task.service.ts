import axios, { AxiosResponse } from 'axios';
import { ITask, ITaskDto } from '../Interfaces/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes the service available globally (recommended)
})
export class TaskService {

    // private baseUrl: string = 'http://localhost:8080/task'// spring end point
    // private baseUrl: string = 'http://localhost:9091/task'// core end point
    // private baseUrl: string = 'http://localhost:5003/gateway/task';//oceloat-gateway : spring
    // private baseUrl: string = 'http://localhost:5003/core-gateway/task';//oceloat-gateway : core

    private baseUrl: string = 'http://localhost:8585/spring-application/task';//spring-cloud-gateway : spring-application

    //private baseUrl: string = 'http://localhost:8585/mydotnetcoreapp/task';//spring-cloud-gateway : core-application

    // Get all tasks
    getTasks(): Promise<AxiosResponse<ITask[]>> {
        return axios.get<ITask[]>(`${this.baseUrl}/get`);
    }

    // Get a single task by ID
    getTaskById(id: number): Promise<AxiosResponse<ITask>> {
        return axios.get<ITask>(`${this.baseUrl}?id=${id}`);
    }

    // Create a new task
    createTask(taskDto: ITaskDto): Promise<AxiosResponse<ITaskDto>> {
        return axios.post<ITaskDto>(`${this.baseUrl}/register`, taskDto);
    }

    // Update an existing task
    updateTask(id: number, taskDto: ITaskDto): Promise<AxiosResponse<ITaskDto>> {
        return axios.put<ITaskDto>(`${this.baseUrl}/update`, taskDto);
    }

    // Delete a task by ID
    deleteTask(id: number): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${this.baseUrl}/delete?id=${id}`);
    }
}
