import { Component,EventEmitter,Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { IEmployee, ITask } from '../../Interfaces/interfaces';
import { CreateEmployeeFormComponent } from '../../forms/create-employee-form/create-employee-form.component';
// import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule,ConfirmPopupComponent,CreateEmployeeFormComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

   constructor(){

   }

   search(){

   }

   @ViewChild('confirmDeleteTemplate', { static: false }) confirmDeleteTemplate!: TemplateRef<void>;
   @Input() employees :IEmployee[]=[];
   @Input() selectedEmployees: { id: number, isChecked: boolean }[] = [];
   @Output() clearSelectedEmployees = new EventEmitter();

   isShowDelete:boolean =false;
   searchValue : string = "";
   isEditForm:boolean = false;
   selectedEmployee:IEmployee | null = null;
   selectedTask:ITask | null = null;


   showEdit(){
      this.isEditForm=true;
      if(this.selectedEmployees.length ==1 && this.selectedEmployees[0].isChecked){
         this.selectedEmployee = this.employees.filter((item)=>item.id == this.selectedEmployees[0].id)[0];
      }
      console.log("showedit")
   }

   save(){
         // save changes of the edit form
         this.clearSelectedEmployees.emit();
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

   delete(){
      // will execute if delete 
      //now pass selected employee to delete
      this.clearSelectedEmployees.emit();
      console.log("deleted")
   }

   create(){
      this.selectedEmployee = null;
      this.isEditForm = true;
      console.log(this.selectedEmployees)
   }

}
