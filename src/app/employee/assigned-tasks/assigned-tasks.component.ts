import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ITask } from '../../Interfaces/interfaces';
import { task } from '../../Constants/Constatns';
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

  @Input() task:ITask = task
  @Output() savedTask = new EventEmitter<ITask>();
  currentTask : ITask = task;

  ngOnChanges(changes: SimpleChanges) {

    if (changes['task'] && this.task) {
      this.currentTask = {...this.task}
    }
  }

  saveTask() {
    console.log('Task saved:', this.task);
    this.savedTask.emit(this.currentTask);
  }
}
