import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Department } from './../models/department.model.js';


const registerDepartment = asyncHandler(async (req, res) => {

    const { departmentname , location , head , desc  } = req.body

    if (
        [departmentname , location ].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Fill the required fields")
    }

    const existed  = await Department.findOne({
        departmentname ,
        location
    })

    if (existed) {
        throw new ApiError(409, "department allready exist with email already exists")
    }


    const department  = await Department.create({
        departmentname , 
        location , 
        head , 
        desc
    })

    const created = await Department.findById(department._id)

    if (!created) {
        throw new ApiError(500, "Something went wrong while registering the department")
    }

    return res.status(201).json(
        new ApiResponse(200, created, "Department registered Successfully")
    )

})





const updateDepartment = asyncHandler(async (req, res) => {
    const { id ,  departmentname , location , head , desc  } = req.body

    if (
        [ id , departmentname , location ].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Fill the required fields")
    }

    const department = await Department.findByIdAndUpdate(
        id,
        {
            $set: {
                departmentname , 
                location , 
                head , 
                desc
            }
        },
        { new: true }

    )

    return res
        .status(200)
        .json(new ApiResponse(200, department , "Department details updated successfully"))
});








export {
    registerDepartment,
    updateDepartment
}