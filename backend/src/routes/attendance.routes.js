import express from 'express';
import { 
    registerAttendance
} 
from '../controllers/attendance.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const Router = express.Router();

Router.route ( "/register").post ( verifyJWT , registerAttendance )

export default Router;