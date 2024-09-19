export interface IEmployee{
          id:number | null;
          name:string;
          position:string;
          designation:string;
          email:string;
          mobileNo:string;
          createdOnDt:Date | null;
          createdBy:string;
}

export interface ITask{
        id:number | null;
        name:string;
        description:string;
        assignedOnDt:Date | null;
        endDate:Date | null;
        createdOnDt : Date | null;
        createdBy:string;
}   
