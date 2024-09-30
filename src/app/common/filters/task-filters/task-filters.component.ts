import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ITask } from '../../../Interfaces/interfaces';
import { CreateTaskFormComponent } from '../../../forms/create-task-form/create-task-form.component';
import { ConfirmPopupComponent } from '../../confirm-popup/confirm-popup.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../service/task.service';

@Component({
  selector: 'app-task-filters',
  templateUrl: './task-filters.component.html',
  imports:[CreateTaskFormComponent,ConfirmPopupComponent,CommonModule],
  standalone:true,
  styleUrls: ['./task-filters.component.scss']
})
export class TaskFiltersComponent {

  constructor(private taskService:TaskService) { }

  search(){

  }

  @ViewChild('confirmDeleteTemplate', { static: false }) confirmDeleteTemplate!: TemplateRef<void>;
  @Input() tasks :ITask[]=[];
  @Input() selectedTasks: { id: number, isChecked: boolean }[] = [];
  @Output() clearSelectedTasks = new EventEmitter();

  isShowDelete:boolean =false;
  searchValue : string = "";
  isEditForm:boolean = false;
  selectedTask:ITask | null = null;


  showEdit(){
     this.isEditForm=true;
     if(this.selectedTasks.length ==1 && this.selectedTasks[0].isChecked){
        this.selectedTask = this.tasks.filter((item)=>item.id == this.selectedTasks[0].id)[0];
     }
     console.log("showedit")
  }

  save(){
        // save changes of the edit form
        this.clearSelectedTasks.emit();
        this.isEditForm = false;
        console.log("save")
  }

  clearForm(){
     this.isEditForm = false;
  }

  clearPopup(){
     console.log("clear pop up called")
     this.isShowDelete = false;
  }


  showDelete(){
     this.isShowDelete = true;
     // execute when click on delete in filter
  }

 async delete(){
     // will execute if delete 
     //now pass selected employee to delete
     this.selectedTasks.map( async(task)=>{
       if(task.isChecked){
       await  this.taskService.deleteTask(task.id);
       }
     })
     
     this.clearSelectedTasks.emit();
     console.log("deleted")
  }

  create(){
     this.selectedTask = null;
     this.isEditForm = true;
  }

}
