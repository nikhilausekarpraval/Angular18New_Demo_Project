import { Component, EventEmitter, Input, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { IEmployee, ITask, ITaskDto } from '../../Interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../service/task.service';
import { EmployeeService } from '../../service/employee.service';
import { task } from '../../Constants/Constatns';

@Component({
  selector: 'app-create-task-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.scss'
})
export class CreateTaskFormComponent {

  constructor(private modalService: BsModalService,private taskService: TaskService,private employeeService:EmployeeService) {

  }

  @Output() save = new EventEmitter();
  @Output() clearForm = new EventEmitter();
  @Input() isEditForm: boolean = false;
  @Input() task:ITask | null | any= null;
  @ViewChild('taskEditForm') taskEditForm!: TemplateRef<void>;
  modalRef?: BsModalRef;
  updatedTask:ITask =  task
  formOperation:String = "Edit";
  employeeList:IEmployee[] = []
  selectedEmployeeId: number = 0;


  ngOnChanges(changes: SimpleChanges) {
    this.getEmployees()
    if (changes['isEditForm'] && this.isEditForm) {
        this.selectedEmployeeId = this.task.employeeId
        this.formOperation = this.task ? "Edit" : "Create";
        this.updatedTask = Object.assign({},this.task ? this.task : {...task});
        this.openModal(); 
    }
  }

 async getEmployees(){
    let object = await this.employeeService.getEmployees() as any
    if(object.data.employees){
      this.employeeList = object.data.employees;
    }else {
      this.employeeList = object.data;
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

  onEmployeeSelect(value:any){
    this.selectedEmployeeId = value.value;
  }

 async handleFormSubmit(event:any){
      console.log(this.updatedTask);
      let { employee, ...rest } = this.updatedTask  as any; // Destructure to exclude the 'employees' field

      let newTask = { 
        ...rest, // Spread the remaining properties, excluding 'employees'
        employeeId: this.selectedEmployeeId // Assign employeeId from the first employee
      } as any;
      if(this.formOperation =="Edit"){
        
        await this.taskService.updateTask(this.updatedTask.id as number,newTask)
      }else {
        await this.taskService.createTask(newTask)
      }
      this.save.emit();
      this.modalRef?.hide();
  }

}
