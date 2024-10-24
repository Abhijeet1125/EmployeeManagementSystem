import { configureStore } from '@reduxjs/toolkit';
import adminReducer from "./slices/admin_slice"
import employeeReducer from "./slices/employee_slice";
import departmentReducer from "./slices/department_slice"


const store = configureStore({
  reducer: {    
    admin : adminReducer , 
    employee : employeeReducer,
    department : departmentReducer,
  },
});

export default store;
