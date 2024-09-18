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
    console.log(this.employees)
  }

  @Input() employees:IEmployee [] = [];
  @Output() employeeSelectionChanged = new EventEmitter<{ id: number, isChecked: boolean }>();
  EMPLOYEE_TABLE_HEADERS: any = EMPLOYEE_TABLE_HEADERS;

  selectEmployee(id: number, event: any): void {
    let isChecked = event.target.checked;
    this.employeeSelectionChanged.emit({ id, isChecked });// in parent not executing function 
  }

}
