import express from 'express';
import { 
    registerSalary,
    updateLastSalaryAmount
} 
from '../controllers/salary.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const Router = express.Router();

Router.route ( "/register").post ( verifyJWT , registerSalary )
Router.route ( "/update").post ( verifyJWT , updateLastSalaryAmount )

export default Router;