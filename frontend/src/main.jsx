import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Layout, SignIn , EmployeePage , Test , EmpList , AddEmployee, EmployeeDetails, DepartmentPage , DeptList , AddDepartment, DepartmentDetails} from './pages'
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
      </Route> 
      <Route path='/Departments' element={<DepartmentPage/>}> 
        <Route path='list' element={<DeptList/>}> </Route>
        <Route path='add-department' element={<AddDepartment/>}> </Route>
        <Route path='details/:id' element={<DepartmentDetails/>}> </Route>        
      </Route>      

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  
)
