import express from 'express';
import { 
    registerFeedback,
    deleteFeedback
} 
from '../controllers/feedback.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const Router = express.Router();

Router.route ( "/register").post ( verifyJWT , registerFeedback )
Router.route ( "/delete").post ( verifyJWT , deleteFeedback )

export default Router;