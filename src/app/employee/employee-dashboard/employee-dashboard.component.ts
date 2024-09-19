import { Component } from '@angular/core';
import { FiltersComponent } from '../../common/filters/filters.component';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';


@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [FiltersComponent,EmployeeTableComponent],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})
export class EmployeeDashboardComponent {

  constructor(){

  }

   selectedEmployees: { id: number, isChecked: boolean }[] = [];

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
    console.log("changed")
  }

  clearSelectedEmployees(){
    this.selectedEmployees = []
    console.log("clear selected called")
  }

   employees = [
    {
      id: 1,
      name: "John Doe",
      position: "Developer",
      designation: "Senior Developer",
      email: "john.doe@example.com",
      mobileNo: "1234567890",
      createdOnDt: new Date(2023, 4, 15),
      createdBy: "Nikhil"
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Analyst",
      designation: "Business Analyst",
      email: "jane.smith@example.com",
      mobileNo: "0987654321",
      createdOnDt: new Date(2023, 5, 20),
      createdBy: "Nikhil"
    },
    {
      id: 3,
      name: "Michael Johnson",
      position: "Designer",
      designation: "Lead Designer",
      email: "michael.j@example.com",
      mobileNo: "1122334455",
      createdOnDt: new Date(2023, 6, 25),
      createdBy: "Nikhil"
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "Manager",
      designation: "Product Manager",
      email: "emily.davis@example.com",
      mobileNo: "2233445566",
      createdOnDt: new Date(2023, 7, 30),
      createdBy: "Nikhil"
    },
    {
      id: 5,
      name: "Chris Brown",
      position: "Engineer",
      designation: "Software Engineer",
      email: "chris.brown@example.com",
      mobileNo: "3344556677",
      createdOnDt: new Date(2023, 8, 5),
      createdBy: "nikhil"
    }
  ];
  

  
}
