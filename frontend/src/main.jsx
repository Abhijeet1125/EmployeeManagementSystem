import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Layout, SignIn , EmployeePage , Test , EmpList , AddEmployee, EmployeeDetails, AttendanceDetails,SalaryDetails,
  DepartmentPage , DeptList , AddDepartment, DepartmentDetails,
  DesignationPage , DesigList , AddDesignation , DesignationDetails
  } from './pages'
import { Provider } from 'react-redux';
import store from './store/store.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/sign-in' element={<SignIn />}> </Route>
      <Route path='/Employees' element={<EmployeePage/>}> 
        <Route path='list' element={<EmpList/>}> </Route>
        <Route path='add-employee' element={<AddEmployee/>}> </Route>
        <Route path='details/:id' element={<EmployeeDetails/>}> </Route>        
        <Route path='attendance/:id' element={<AttendanceDetails/>}> </Route>        
        <Route path='feedback/:id' element={<EmployeeDetails/>}> </Route>        
        <Route path='salary/:id' element={<SalaryDetails/>}> </Route>        
      </Route> 
      
      <Route path='/Departments' element={<DepartmentPage/>}> 
        <Route path='list' element={<DeptList/>}> </Route>
        <Route path='add-department' element={<AddDepartment/>}> </Route>
        <Route path='details/:id' element={<DepartmentDetails/>}> </Route>        
      </Route>   

      <Route path='/Designations' element={<DesignationPage/>}> 
        <Route path='list' element={<DesigList/>}> </Route>
        <Route path='add-designation' element={<AddDesignation/>}> </Route>
        <Route path='details/:id' element={<DesignationDetails/>}> </Route>        
      </Route>   

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  
)
