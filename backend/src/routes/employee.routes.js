import express from 'express';
import { 
  registerEmployee,
  updateEmployeeDetails,
  EmployeeList,
} 
from '../controllers/employee.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const employeeRouter = express.Router();

employeeRouter.route ( "/register").post ( verifyJWT , registerEmployee )
employeeRouter.route ( "/update").post ( verifyJWT , updateEmployeeDetails )
employeeRouter.route ( "/list").get ( verifyJWT , EmployeeList )

export default employeeRouter;