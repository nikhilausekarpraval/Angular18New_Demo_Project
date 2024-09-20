export const EMPLOYEE_TABLE_HEADERS =["Id","Name","Position","Designation","Email","Mobile. No.","Created On Date","Created By"];
export const TASK_TABLE_HEADERS =["Id","Name","Status","Description","Assigned On Date","End Date","Created On Date","Created By"];
export const BASE_URL ="api/"
export const task = { id: null, name: '', status:'',employees:[], endDate: null, description: '', assignedOnDt: null, createdOnDt:null,createdBy:""};
export const employee = { id: null, name: '', email: '',tasks:[], mobileNo: '', designation: '', position:"",createdBy:"",createdOnDt:new Date()};