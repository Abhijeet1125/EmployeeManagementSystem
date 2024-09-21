import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Feedback  } from './../models/feedback.model.js';


const registerFeedback  = asyncHandler(async (req, res) => {
    const { employee , date , feedback } = req.body;

    if ( employee ==  "" || date == "" || feedback.trim() == ""){
        throw new ApiError ( "400" , "all fields are required")
    }

    const newfeedback = await  Feedback.create (
        {
            employee ,
            date ,
            feedback ,
        }
    )

    const createdfeedback = await  Feedback.findById ( newfeedback._id )

    if ( ! createdfeedback  ){
        throw new ApiError ( "500" , "Error in registering a new feedback")
    }

    return res.status(201).json(
        new ApiResponse(200, createdfeedback , "Feedback registered successfully")
    );
});


const deleteFeedback  = asyncHandler ( async ( req , res ) => { 
    const {id}  = req.body
    const feedback = await Feedback.findByIdAndDelete(id)
    if (!feedback) {
        throw new ApiError(404, "Feedback not found")
    }

    return res.status ( 201).json (
        new ApiResponse ( 200 , feedback , "Feedback deleted successfully")
    )

})

 


export {
    registerFeedback,
    deleteFeedback
}