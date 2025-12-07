import { ITask, ITaskDto } from '../Interfaces/interfaces';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root' // This makes the service available globally (recommended)
})
export class TaskService {

      commonService: any;
      constructor( ) {
          this.commonService = new CommonService()
      }
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

    async getTasks(): Promise<ITask[]> {
  
      return  this.commonService.getAll(`${this.baseUrl}/get`).subscribe((data: ITask[]) => {
          return data;
      });
  }

    // Get a single task by ID
  async  getTaskById(id: number): Promise<ITask> {
     return  this.commonService.getSingle(`${this.baseUrl}?id=${id}`).subscribe((data: ITask) => {
         return data;
     });
    }

    // Create a new task
  async  createTask(taskDto: ITaskDto): Promise<ITaskDto> {
     return  this.commonService.Create(`${this.baseUrl}/register`, taskDto).subscribe((data: ITaskDto) => {
         return data;
     });
    }

    // Update an existing task
   async updateTask(id: number, taskDto: ITaskDto): Promise<ITaskDto> {
      return  this.commonService.Update(`${this.baseUrl}/update`, taskDto).subscribe((data: ITaskDto) => {
          return data;
      });
    }

    // Delete a task by ID
    async deleteTask(id: number): Promise<void> {
        return  this.commonService.delete(`${this.baseUrl}/delete?taskId=${id}`).subscribe(() => {
            return;
        });
    }
}
