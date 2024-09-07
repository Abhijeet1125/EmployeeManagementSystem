import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Employee } from "../models/employee.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";


const registerEmployee = asyncHandler(async (req, res) => {

    const { dob, email, lastname, firstname, gender, joiningdate, department, mobileno, address, payfrom, workingdays, designation } = req.body

    if (
        [firstname, gender, email, dob, joiningdate, payfrom].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Fill the required fields")
    }

    const existedEmployee = await Employee.findOne({
        email
    })

    if (existedEmployee) {
        throw new ApiError(409, "Employee with email already exists")
    }


    const employee = await Employee.create({
        dob,
        email,
        lastname,
        firstname,
        gender,
        joiningdate,
        department,
        mobileno,
        address,
        payfrom,
        workingdays,
        designation
    })

    const createdEmployee = await Employee.findById(employee._id)

    if (!createdEmployee) {
        throw new ApiError(500, "Something went wrong while registering the employee")
    }

    return res.status(201).json(
        new ApiResponse(200, createdEmployee, "Employee registered Successfully")
    )

})





const updateEmployeeDetails = asyncHandler(async (req, res) => {
    const { id, dob, email, lastname, firstname, gender, joiningdate, department, mobileno, address, payfrom, workingdays, designation } = req.body

    if (
        [id, firstname, gender, email, dob, joiningdate, payfrom].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Fill the required fields")
    }

    const employee = await Employee.findByIdAndUpdate(
        id,
        {
            $set: {
                dob,
                email,
                lastname,
                firstname,
                gender,
                joiningdate,
                department,
                mobileno,
                address,
                payfrom,
                workingdays,
                designation
            }
        },
        { new: true }

    )

    return res
        .status(200)
        .json(new ApiResponse(200, employee , "Employee details updated successfully"))
});








export {
    registerEmployee,
    updateEmployeeDetails
}