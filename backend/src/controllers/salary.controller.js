import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Salary } from './../models/Salary.model.js';
import { Employee } from "./../models/employee.model.js"
import { Attendance } from "./../models/attendance.model.js"
import { Transaction } from "../models/transaction.model.js";


const registerSalary = asyncHandler(async (req, res) => {
    const { employee, salary } = req.body;

    // Check if a salary record already exists for the employee
    let existingSalary = await Salary.findOne({ employee });

    if (existingSalary) {
        // Update the existing salary record
        existingSalary.salary = salary;
        await existingSalary.save();

        return res.status(200).json(
            new ApiResponse(200, existingSalary, "Salary updated successfully")
        );
    } else {
        // Create a new salary record
        const newSalary = await Salary.create({ employee, salary });

        if (!newSalary) {
            throw new ApiError(400, "Salary registration failed");
        }

        return res.status(201).json(
            new ApiResponse(201, newSalary, "Salary registered successfully")
        );
    }
});


const getSalary = asyncHandler(async (req, res) => {
    const { employeeId } = req.body;

    const salaryRecords = await Salary.find({ employee: employeeId });

    if (!salaryRecords || salaryRecords.length === 0) {
        throw new ApiError(404, "No salary records found for this employee");
    }

    return res.status(200).json(
        new ApiResponse(200, salaryRecords, "Salary records retrieved successfully")
    );
});


const calculatePayment = asyncHandler(async (req, res) => {
    const { employeeId, endDate } = req.body;


    const employee = await Employee.findById(employeeId);
    if (!employee) {
        throw new ApiError(404, `Employee not found  id  ${employee}`);
    }

    const salaryRecord = await Salary.findOne({ employee: employeeId }).sort({ createdAt: -1 });
    if (!salaryRecord) {
        throw new ApiError(404, "Salary record not found for this employee");
    }

    const startDate = employee.payfrom;
    const salary = salaryRecord.salary;


    const attendanceRecords = await Attendance.find({
        employee: employeeId,
        date: { $gte: startDate, $lte: new Date(endDate) },
        workday: "Full Day",
    });

    const fullDaysWorked = attendanceRecords.length;
    const payment = fullDaysWorked * salary;

    return res.status(200).json(
        new ApiResponse(200, { payment, fullDaysWorked, startDate }, "Payment calculated successfully")
    );
});

const setPayFrom = asyncHandler(async (req, res) => {
    const { employeeId, payfrom, startDate, transId, paymentAmount } = req.body;

    const transaction = new Transaction({
        employee: employeeId,
        transactionId: transId,
        fromDate: startDate,
        toDate: payfrom,
        paymentAmount: paymentAmount,
    });

    await transaction.save();


    const newPayFromDate = new Date(payfrom);
    newPayFromDate.setDate(newPayFromDate.getDate() + 1); // Increment by one day

    const updatedEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        { payfrom: newPayFromDate },
        { new: true }
    );

    if (!updatedEmployee) {
        throw new ApiError(404, "Employee not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedEmployee, "Pay from date updated and transaction recorded successfully")
    );
});



export {
    registerSalary,
    getSalary,
    calculatePayment,
    setPayFrom

}