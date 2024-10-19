import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Designation } from './../models/designation.model.js';


const registerDesignation = asyncHandler(async (req, res) => {

    const { designationName, description } = req.body

    if (
        [designationName].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Fill the required fields")
    }

    const existed = await Designation.findOne({
        designationName,
    })

    if (existed) {
        throw new ApiError(409, "Designation allready exist ")
    }

        const designation = await Designation.create({
            designationName,
            description
        })

        const created = await Designation.findById(designation._id)

        if (!created) {
            throw new ApiError(500, "Something went wrong while registering the designation")
        }

        return res.status(201).json(
            new ApiResponse(200, created, "Designation registered Successfully")
        )

    })





const upadateDesignation  = asyncHandler(async (req, res) => {
    const { id ,  designationName, description } = req.body

    if (
        [designationName , id ].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Fill the required fields")
    }

    const designation  = await Designation.findByIdAndUpdate(
        id,
        {
            $set: {
                designationName,
                description,            
            }
        },
        { new: true }

    )

    return res
        .status(200)
        .json(new ApiResponse(200, designation, "Designation details updated successfully"))
});


const getDesignation = asyncHandler(async (req, res) => {
    const { page = 1, PatternOn, Pattern } = req.query;

    let matchQuery = {};

    if (PatternOn && Pattern) {
        const patternField = PatternOn;
        matchQuery[patternField] = { $regex: new RegExp(Pattern, 'i') };
    }

    const aggregateQuery = Designation.aggregate([
        { $match: matchQuery },
        {
            $project: {
                designationName: 1,
                description: 1,            
            },
        },
    ]);

    const options = {
        page: parseInt(page),
        limit: 20,
    };

    const result = await Designation.aggregatePaginate(aggregateQuery, options);

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Designation List fetched successfully"))
});





export {
   registerDesignation , 
   upadateDesignation , 
   getDesignation,
}