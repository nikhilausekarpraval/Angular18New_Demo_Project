import { Component } from '@angular/core';
import { FiltersComponent } from '../../common/filters/filters.component';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';
import { EmployeeService } from '../../service/employee.service';
import { IEmployee, ITask, ITaskDto } from '../../Interfaces/interfaces';
import { employee, task } from '../../Constants/Constatns';
import { AssignedTasksComponent } from '../assigned-tasks/assigned-tasks.component';
import { TaskService } from '../../service/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [FiltersComponent,EmployeeTableComponent,AssignedTasksComponent,FormsModule,CommonModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})

export class EmployeeDashboardComponent {

  constructor(private employeeService: EmployeeService,private taskService : TaskService){

  }

  employees:IEmployee[] = []

  ngOnInit(): void {
    this.getEmployees();
  }

  async getEmployees (){
    let object = await this.employeeService.getEmployees() as any
    console.log(object,"Fetch data called ")
    if(object.data.employees){
      this.employees = object.data.employees;
    }else {
      this.employees = object.data;
    } 
  }

   selectedEmployees: { id: number, isChecked: boolean }[] = [];
   selectedEmployee:IEmployee = employee;
   isTask:boolean = false;

  // Method to handle employee selection changes
  onEmployeeSelectionChanged(event: { id: number, isChecked: boolean }): void {
    
    const index = this.selectedEmployees.findIndex(emp => emp.id === event.id);

    if (index > -1) {
      if (event.isChecked) {
        this.selectedEmployees[index] = event;
      } else {
        this.selectedEmployees.splice(index, 1);
      }
    } else if (event.isChecked) {
      this.selectedEmployees.push(event);
    }
    console.log("changed called is selected active")
    this.getEmployee()

    this.isSelectedEmployeeHaveTask();
  }





  getEmployee(){

    if(this.selectedEmployees.length == 1 ){
     const emp = this.employees.find((item)=>item.id == this.selectedEmployees[0].id && this.selectedEmployees[0].isChecked)
     this.selectedEmployee = emp as any;
     console.log(this.selectedEmployee,"selected emp hsdf")
    }else {
      this.selectedEmployee = null as any;
    }
  }

  clearSelectedEmployees (){
    this.getEmployees();
    this.selectedEmployees = []
    console.log("clear selected called")
   
  }

  savedTask(updatedTask: ITaskDto) {
    let newTask = { 
      ...updatedTask as any, 
      employeeId: this.selectedEmployee.id // Assign employeeId from the first employee
    } as any;
    this.taskService.updateTask(newTask.id as any,newTask)
    console.log(updatedTask)
  }

  isSelectedEmployeeHaveTask(){
    let status = false;
    console.log(this.selectedEmployee,this.selectedEmployees)
    if(this.selectedEmployees.filter((item)=> item.isChecked).length > 0){
      //console.log(this.selectedEmployee.tasks !== null,"have or not");
      if(this.selectedEmployee?.tasks){
        status = this.selectedEmployee?.tasks.length > 0;
      }
      
    }
    
    this.isTask = status;
  }

  //  this.employees = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     position: "Developer",
  //     designation: "Senior Developer",
  //     email: "john.doe@example.com",
  //     mobileNo: "1234567890",
  //     createdOnDt: new Date(2023, 4, 15),
  //     createdBy: "Nikhil"
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     position: "Analyst",
  //     designation: "Business Analyst",
  //     email: "jane.smith@example.com",
  //     mobileNo: "0987654321",
  //     createdOnDt: new Date(2023, 5, 20),
  //     createdBy: "Nikhil"
  //   },
  //   {
  //     id: 3,
  //     name: "Michael Johnson",
  //     position: "Designer",
  //     designation: "Lead Designer",
  //     email: "michael.j@example.com",
  //     mobileNo: "1122334455",
  //     createdOnDt: new Date(2023, 6, 25),
  //     createdBy: "Nikhil"
  //   },
  //   {
  //     id: 4,
  //     name: "Emily Davis",
  //     position: "Manager",
  //     designation: "Product Manager",
  //     email: "emily.davis@example.com",
  //     mobileNo: "2233445566",
  //     createdOnDt: new Date(2023, 7, 30),
  //     createdBy: "Nikhil"
  //   },
  //   {
  //     id: 5,
  //     name: "Chris Brown",
  //     position: "Engineer",
  //     designation: "Software Engineer",
  //     email: "chris.brown@example.com",
  //     mobileNo: "3344556677",
  //     createdOnDt: new Date(2023, 8, 5),
  //     createdBy: "nikhil"
  //   }
  // ];
  

  
}
