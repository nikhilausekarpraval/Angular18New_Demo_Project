import { CommonModule } from '@angular/common';
import { Component,Input,EventEmitter, Output, SimpleChanges } from '@angular/core';
import { IEmployee } from '../../Interfaces/interfaces';
import { EMPLOYEE_TABLE_HEADERS } from '../../Constants/Constatns';


@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})

export class EmployeeTableComponent {

  constructor(){

  }

  @Input() employees:IEmployee [] = [];
  @Input() selectedEmployees :{ id: number, isChecked: boolean }[] = []
  @Output() employeeSelectionChanged = new EventEmitter<{ id: number, isChecked: boolean }>();
  EMPLOYEE_TABLE_HEADERS: any = EMPLOYEE_TABLE_HEADERS;
  pageCount:number = 1;
  currentPage: number = 0; // Track the current page
  pageSize: number = 5; // Number of records per page

  selectEmployee(newId: number | null, event: any): void {
    let isChecked = event.target.checked;
    let id = newId ? newId : 0;
    this.employeeSelectionChanged.emit({ id, isChecked });// in parent not executing function 
    
  }

  isEmployeeChecked(employeeId: number|null): boolean {
    const selectedEmployee = this.selectedEmployees.find(item => item.id === employeeId);
    return selectedEmployee ? selectedEmployee.isChecked : false;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['employees'] && this.employees) {
      this.pageCount = Math.ceil(this.employees.length / this.pageSize); // Calculate total pages
      console.log(this.pageCount+"page count",this.employees.length,this.pageSize)
    }
  }

  getPaginatedEmployees() {
      const start = this.currentPage * this.pageSize;
      return this.employees.slice(start, start + this.pageSize);
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
