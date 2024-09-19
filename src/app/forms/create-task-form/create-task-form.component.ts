import { Component, EventEmitter, Input, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ITask } from '../../Interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-task-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.scss'
})
export class CreateTaskFormComponent {

  constructor(private modalService: BsModalService) {

  }

  @Output() save = new EventEmitter();
  @Output() clearForm = new EventEmitter();
  @Input() isEditForm: boolean = false;
  @Input() task:ITask | null = null;
  @ViewChild('taskEditForm') taskEditForm!: TemplateRef<void>;
  modalRef?: BsModalRef;
  updatedTask:ITask  =  { id: null, name: '', endDate: null, description: '', assignedOnDt: null, createdOnDt:null,createdBy:""};
  formOperation:String = "Edit";


  ngOnChanges(changes: SimpleChanges) {

    if (changes['isEditForm'] && this.isEditForm) {
        this.formOperation = this.task ? "Edit" : "Create";
        this.updatedTask = Object.assign({},this.task ? this.task : this.updatedTask);
        this.openModal(); 

    }
  }

   config: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    animated: true,
    class:"modal-lg",
    ignoreBackdropClick: true,
    initialState: {
      data1: 'new-user',
      username: 'test'
    }
  };

  openModal() {
    this.modalRef = this.modalService.show(this.taskEditForm,this.config); // Use saved template if no template passed
  }

  cancel() {
      this.modalRef?.hide();
      this.clearForm.emit();
  }

  handleFormSubmit(event:any){
      this.save.emit();
      this.modalRef?.hide();
  }

}
