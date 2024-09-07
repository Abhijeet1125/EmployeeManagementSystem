import express from 'express';
import { 
    registerDesignation,
    upadateDesignation ,
} 
from '../controllers/designation.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const Router = express.Router();

Router.route ( "/register").post ( verifyJWT , registerDesignation )
Router.route ( "/update").post ( verifyJWT , upadateDesignation )

export default Router;