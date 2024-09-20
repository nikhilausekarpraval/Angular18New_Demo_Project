import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

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
  pageCount:number = 1;
  currentPage: number = 0; // Track the current page
  pageSize: number = 5; // Number of records per page


  ngOnChanges(changes: SimpleChanges) {

    if (changes['tasks'] && this.tasks) {
      this.pageCount = Math.ceil(this.tasks.length / this.pageSize); // Calculate total pages
      console.log(this.pageCount+"page count",this.tasks.length,this.pageSize)
    }
  }

  selectTask(newId: number | null, event: any): void {
    let id = newId ? newId : 0 as number;
    let isChecked = event.target.checked;
    this.taskSelectionChanged.emit({ id, isChecked });// in parent not executing function 
    
  }

  isTaskChecked(taskId: number|null): boolean {
    const selectedTask = this.selectedTasks.find(item => item.id === taskId);
    return selectedTask ? selectedTask.isChecked : false;
  }

 paginatedTasks() {
  console.log(this.tasks.length)
    const start = this.currentPage * this.pageSize;
    return this.tasks.slice(start, start + this.pageSize);
  }

  nextPage(){
    if (this.currentPage < this.pageCount - 1) {
      this.currentPage++;
    }
  }

  prevPage(){
    if(this.currentPage>0){
      this.currentPage -= 1 ;
    }
  }
}
