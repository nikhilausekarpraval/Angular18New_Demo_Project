export interface IEmployee{
          id:number | null;
          name:string;
          position:string;
          designation:string;
          email:string;
          mobileNo:string;
          createdOnDt:Date | null;
          createdBy:string;
          tasks:ITaskDto[];
}

export interface ITask{
        id:number | null;
        name:string;
        description:string;
        assignedOnDt:Date | null;
        status:string;
        endDate:Date | null;
        createdOnDt : Date | null;
        createdBy:string;
        employees:IEmployeeDto[];
}   


export interface IEmployeeDto{
        id:number | null;
        name:string;
        position:string;
        designation:string;
        email:string;
        mobileNo:string;
        createdOnDt:Date | null;
        createdBy:string;
}

export interface ITaskDto{
      id:number | null;
      employeeId:number;
      name:string;
      description:string;
      assignedOnDt:Date | null;
      status:string;
      endDate:Date | null;
      createdOnDt : Date | null;
      createdBy:string;
}   
