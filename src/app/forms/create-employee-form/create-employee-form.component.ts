import { Component, EventEmitter, Input, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { IEmployee } from '../../Interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-employee-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './create-employee-form.component.html',
  styleUrl: './create-employee-form.component.scss'
})
export class CreateEmployeeFormComponent {

  constructor(private modalService: BsModalService) {

  }

  @Output() save = new EventEmitter();
  @Output() clearForm = new EventEmitter();
  @Input() isEditForm: boolean = false;
  @Input() employee:IEmployee | null = null;
  @ViewChild('employeeEditForm') employeeEditForm!: TemplateRef<void>;
  modalRef?: BsModalRef;
  updatedEmployee:IEmployee  =  { id: null, name: '', email: '', mobileNo: '', designation: '', position:"",createdBy:"",createdOnDt:new Date()};
  formOperation:String = "Edit";


  ngOnChanges(changes: SimpleChanges) {

    if (changes['isEditForm'] && this.isEditForm) {
       this.formOperation = this.employee ? "Edit" : "Create";
        this.updatedEmployee = Object.assign({},this.employee ? this.employee : this.updatedEmployee);
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
    this.modalRef = this.modalService.show(this.employeeEditForm,this.config); // Use saved template if no template passed
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
