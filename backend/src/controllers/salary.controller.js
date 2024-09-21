import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Salary } from './../models/Salary.model.js';


const registerSalary = asyncHandler(async (req, res) => {
    const { employee, startdate, salary, payonholidays } = req.body;

    if (!employee || !startdate || !salary) {
        throw new ApiError(400, "Please provide required fields: employee, startdate, salary");
    }

    // Check if there is a previous salary record for this employee
    const previousSalary = await Salary.findOne({ employee }).sort({ startdate: -1 });

    if (previousSalary) {
        // Update the enddate of the previous record to startdate - 1
        previousSalary.enddate = new Date(new Date(startdate).setDate(new Date(startdate).getDate() - 1));
        await previousSalary.save();
    }

    // Create the new salary record
    const newSalary = new Salary({
        employee,
        startdate,
        salary,
        payonholidays: payonholidays !== undefined ? payonholidays : true, // Use the default if not provided
    });

    await newSalary.save();

    return res.status(201).json(
        new ApiResponse(200,  newSalary, "Salary registered successfully")
    );
});


const updateLastSalaryAmount = asyncHandler(async (req, res) => {
    const { employee, newSalaryAmount } = req.body;

    if (!employee || !newSalaryAmount) {
        throw new ApiError(400, "Please provide required fields: employee, newSalaryAmount");
    }

    // Find the latest salary record for the employee
    const lastSalary = await Salary.findOne({ employee }).sort({ startdate: -1 });

    if (!lastSalary) {
        throw new ApiError(404, "No salary record found for this employee");
    }

    // Update the salary
    lastSalary.salary = newSalaryAmount;
    await lastSalary.save();

    return res.status(200).json(
        new ApiResponse (200,  lastSalary, "Salary registered successfully")
    );
});

 


export {
    registerSalary,
    updateLastSalaryAmount
}