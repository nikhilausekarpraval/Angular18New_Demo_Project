import { CommonModule } from '@angular/common';
import { Component,Input,EventEmitter, Output } from '@angular/core';
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

  selectEmployee(newId: number | null, event: any): void {
    let isChecked = event.target.checked;
    let id = newId ? newId : 0;
    this.employeeSelectionChanged.emit({ id, isChecked });// in parent not executing function 
    
  }

  isEmployeeChecked(employeeId: number|null): boolean {
    const selectedEmployee = this.selectedEmployees.find(item => item.id === employeeId);
    return selectedEmployee ? selectedEmployee.isChecked : false;
  }
  

}
