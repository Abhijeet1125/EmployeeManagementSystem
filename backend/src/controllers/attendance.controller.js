import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Attendance } from './../models/attendance.model.js';


const registerAttendance = asyncHandler(async (req, res) => {
    const attendanceData = req.body;

    for (const attendance of attendanceData) {
        if (!attendance.employee || !attendance.date || !attendance.workday) {
            throw new ApiError(400, "Fill the required fields");
        }

        const existingAttendance = await Attendance.findOne({
            employee: attendance.employee,
            date: attendance.date,
        });

        if (existingAttendance) {
            await Attendance.findByIdAndUpdate(existingAttendance._id, attendance, {
                new: true,
                runValidators: true, // Ensure enum and other validations are triggered
            });
        } else {
            const newAttendance = new Attendance(attendance);
            await newAttendance.save();
        }
    }

    return res.status(201).json(
        new ApiResponse(200, { "updated count": attendanceData.length }, "Attendance registered successfully")
    );
});

 


export {
    registerAttendance,
}