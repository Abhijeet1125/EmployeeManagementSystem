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
        $or: [
            { email: email },
            { mobileno: mobileno }
        ]
    });


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
        .json(new ApiResponse(200, employee, "Employee details updated successfully"))
});


const EmployeeList = asyncHandler(async (req, res) => {
    const { page = 1, PatternOn, Pattern } = req.query;

    let matchQuery = {};

    if (PatternOn && Pattern) {
        const patternField = PatternOn;
        matchQuery[patternField] = { $regex: new RegExp(Pattern, 'i') };
    }

    const aggregateQuery = Employee.aggregate([
        { $match: matchQuery },
        {
            $project: {
                firstname: 1,
                lastname: 1,
                email: 1,
                gender: 1,
                payfrom: 1,
            },
        },
    ]);

    const options = {
        page: parseInt(page),
        limit: 20,
    };

    const result = await Employee.aggregatePaginate(aggregateQuery, options);

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Employee List fetched successfully"))

});


const getEmp = asyncHandler(async (req, res) => {
    const { id } = req.query

    const employee = await Employee.findById(id)

    if (!employee) {
        throw new ApiError(500, `for this id ${id}  Something went wrong while fetching the employee`)
    }

    return res
        .status(200)
        .json(new ApiResponse(200, employee, "Employee data fetched successfully"))
});



export {
    registerEmployee,
    EmployeeList,
    updateEmployeeDetails,
    getEmp
}