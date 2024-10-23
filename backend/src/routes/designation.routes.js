import express from 'express';
import { 
    registerDesignation,
    upadateDesignation ,
    getDesignation
} 
from '../controllers/designation.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const Router = express.Router();

Router.route ( "/register").post ( verifyJWT , registerDesignation )
Router.route ( "/update").post ( verifyJWT , upadateDesignation )
Router.route ( "/list").get ( verifyJWT , getDesignation )

export default Router;