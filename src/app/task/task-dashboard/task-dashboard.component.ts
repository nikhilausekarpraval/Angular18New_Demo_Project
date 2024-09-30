import { Component } from '@angular/core';
import { TaskTableComponent } from '../task-table/task-table.component';
import { TaskFiltersComponent } from '../../common/filters/task-filters/task-filters.component';
import { TaskService } from '../../service/task.service';
import { ITask } from '../../Interfaces/interfaces';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [TaskTableComponent,TaskFiltersComponent],
  templateUrl: './task-dashboard.component.html',
  styleUrl: './task-dashboard.component.scss'
})
export class TaskDashboardComponent {

  constructor(private taskService : TaskService){

  }
  selectedTasks: { id: number, isChecked: boolean }[] = [];
  tasks:ITask[]=[]

  ngOnInit(): void {
    this.getTasks();
  }

  async getTasks(){

    let object = await this.taskService.getTasks() as any
    if(object.data.tasks){
      this.tasks = object.data.tasks;
    }else {
      this.tasks = object.data;
    }
  }

  // Method to handle employee selection changes
  onTaskSelectionChanged(event: { id: number, isChecked: boolean }): void {
    const index = this.selectedTasks.findIndex(emp => emp.id === event.id);

    if (index > -1) {
      if (event.isChecked) {
        this.selectedTasks[index] = event;
      } else {
        this.selectedTasks.splice(index, 1);
      }
    } else if (event.isChecked) {
      this.selectedTasks.push(event);
    }
    console.log("changed")
  }

 async clearSelectedTasks(){
    this.selectedTasks = []
    console.log("clear selected called")
    await this.getTasks();
  }

   // Array of 5 task objects
//  tasks = [
//   {
//       id: 1,
//       name: "Task 1",
//       description: "Complete the initial project setup",
//       assignedOnDt: new Date(2023, 8, 1),
//       endDate: new Date(2023, 9, 15),
//       createdOnDt: new Date(2023, 7, 20),
//       createdBy: "Admin"
//   },
//   {
//       id: 2,
//       name: "Task 2",
//       description: "Implement user authentication",
//       assignedOnDt: new Date(2023, 8, 5),
//       endDate: new Date(2023, 9, 25),
//       createdOnDt: new Date(2023, 7, 22),
//       createdBy: "Admin"
//   },
//   {
//       id: 3,
//       name: "Task 3",
//       description: "Set up database schema",
//       assignedOnDt: new Date(2023, 8, 10),
//       endDate: new Date(2023, 9, 20),
//       createdOnDt: new Date(2023, 7, 25),
//       createdBy: "Admin"
//   },
//   {
//       id: 4,
//       name: "Task 4",
//       description: "Develop REST API",
//       assignedOnDt: new Date(2023, 8, 15),
//       endDate: new Date(2023, 9, 30),
//       createdOnDt: new Date(2023, 7, 28),
//       createdBy: "Admin"
//   },
//   {
//       id: 5,
//       name: "Task 5",
//       description: "Deploy the application to cloud",
//       assignedOnDt: new Date(2023, 8, 20),
//       endDate: new Date(2023, 10, 5),
//       createdOnDt: new Date(2023, 8, 1),
//       createdBy: "Admin"
//   }
// ]

}
