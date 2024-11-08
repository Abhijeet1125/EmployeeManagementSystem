import express from 'express';
import { 
    registerSalary,
    getSalary,
    calculatePayment,
    setPayFrom,
} 
from '../controllers/salary.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const Router = express.Router();

Router.route ( "/register").post ( verifyJWT , registerSalary )
Router.route ( "/get").post ( verifyJWT , getSalary )
Router.route ( "/calculate").post ( verifyJWT , calculatePayment )
Router.route ( "/set-pay").post ( verifyJWT , setPayFrom )


export default Router;