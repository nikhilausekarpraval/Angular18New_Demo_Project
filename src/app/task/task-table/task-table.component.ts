import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ITask } from '../../Interfaces/interfaces';
import { TASK_TABLE_HEADERS } from '../../Constants/Constatns';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss'
})
export class TaskTableComponent {

  constructor(){

  }

  @Input() tasks:ITask [] = [];
  @Input() selectedTasks:{ id: number, isChecked: boolean }[] = []
  @Output() taskSelectionChanged = new EventEmitter<{ id: number, isChecked: boolean }>();
  TASK_TABLE_HEADERS: any = TASK_TABLE_HEADERS;

  selectTask(newId: number | null, event: any): void {
    let id = newId ? newId : 0 as number;
    let isChecked = event.target.checked;
    this.taskSelectionChanged.emit({ id, isChecked });// in parent not executing function 
    
  }

  isTaskChecked(taskId: number|null): boolean {
    const selectedTask = this.selectedTasks.find(item => item.id === taskId);
    return selectedTask ? selectedTask.isChecked : false;
  }
}
