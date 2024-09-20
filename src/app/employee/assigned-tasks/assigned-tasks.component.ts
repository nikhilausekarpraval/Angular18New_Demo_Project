import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IEmployee, ITask, ITaskDto } from '../../Interfaces/interfaces';
import { employee, task } from '../../Constants/Constatns';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assigned-tasks',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './assigned-tasks.component.html',
  styleUrl: './assigned-tasks.component.scss'
})
export class AssignedTasksComponent {
  constructor(){

  }

  @Input() task:IEmployee = employee
  @Output() savedTask = new EventEmitter<ITaskDto>();
  currentTask : ITaskDto = {...task,employeeId:0};

  ngOnChanges(changes: SimpleChanges) {

    if (changes['task'] && this.task) {
      this.currentTask = {...this.task.tasks[0]}
    }
  }

  saveTask() {
    console.log('Task saved:', this.task);
    this.savedTask.emit(this.currentTask);
  }
}
