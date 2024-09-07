import express from 'express';
import { 
  registerEmployee,
  updateEmployeeDetails
} 
from '../controllers/employee.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const employeeRouter = express.Router();

employeeRouter.route ( "/register").post ( verifyJWT , registerEmployee )
employeeRouter.route ( "/update").post ( verifyJWT , updateEmployeeDetails )

export default employeeRouter;