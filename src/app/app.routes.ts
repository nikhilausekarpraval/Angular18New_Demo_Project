import { Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';


export const routes: Routes = [
    {
        path:"employee",
        component:EmployeeDashboardComponent
    }
    // ,{
    //     component:TaskDashboardComponent,
    //     path:"task/"
    // }
];
