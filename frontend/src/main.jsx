import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Layout, SignIn , EmployeePage , Test , EmpList} from './pages'
import { Provider } from 'react-redux';
import store from './store/store.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/sign-in' element={<SignIn />}> </Route>
      <Route path='/Employees' element={<EmployeePage/>}> 
        <Route path='list' element={<EmpList/>}> </Route>
        <Route path='' element={<Test/>}> </Route>
      </Route>
      <Route path='/test' element={<Test/>}> </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  </React.StrictMode>,
)
