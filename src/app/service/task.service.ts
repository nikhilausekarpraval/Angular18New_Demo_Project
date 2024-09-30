import axios, { AxiosResponse } from 'axios';
import { ITask, ITaskDto } from '../Interfaces/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes the service available globally (recommended)
})
export class TaskService {

    // private baseUrl: string = 'http://localhost:8080/task'// spring end point
    private baseUrl: string = 'http://localhost:9091/task'// core end point
     // private baseUrl: string = 'https://localhost:5003/gateway/task';//oceloat-gateway : spring
     //private baseUrl: string = 'https://localhost:5003/core-gateway/task';//oceloat-gateway : core
    //private baseUrl: string = 'http://localhost:8585/core-gateway/task';//spring-cloud-gateway : core-application

    //private baseUrl: string = 'http://localhost:8585/spring-gateway/task';//spring-cloud-gateway : spring-application

    // Get all tasks
  // async  getTasks(): Promise<AxiosResponse<ITask[]>> {
  //    return await axios.get<ITask[]>(`${this.baseUrl}/get`);
  //   }

    async getTasks(): Promise<AxiosResponse<ITask[]>> {
      const options = {
          headers: {
              'Access-Control-Allow-Origin': 'https://localhost:4200'
          }
      };
  
      return await axios.get<ITask[]>(`${this.baseUrl}/get`, options);
  }

    // Get a single task by ID
  async  getTaskById(id: number): Promise<AxiosResponse<ITask>> {
     return await axios.get<ITask>(`${this.baseUrl}?id=${id}`);
    }

    // Create a new task
  async  createTask(taskDto: ITaskDto): Promise<AxiosResponse<ITaskDto>> {
     return await axios.post<ITaskDto>(`${this.baseUrl}/register`, taskDto);
    }

    // Update an existing task
   async updateTask(id: number, taskDto: ITaskDto): Promise<AxiosResponse<ITaskDto>> {
      return await axios.put<ITaskDto>(`${this.baseUrl}/update`, taskDto);
    }

    // Delete a task by ID
    async deleteTask(id: number): Promise<AxiosResponse<void>> {
        return await axios.delete<void>(`${this.baseUrl}/delete?taskId=${id}`);
    }
}
