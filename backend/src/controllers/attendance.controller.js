import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Attendance } from './../models/attendance.model.js';


const markAttendance = asyncHandler(async (req, res) => {
    const { date, workday, id } = req.body;

    if (!id || !date || !workday) {
        throw new ApiError(400, "Employee ID, date, and workday are required.");
    }

    const attendance = await Attendance.findOneAndUpdate(
        { employee: id, date },
        { workday },
        { upsert: true, new: true }
    );

    if (!attendance) {
        throw new ApiError(500, "Error in marking attendance");
    }
    return res.status(201).json(
        new ApiResponse(200, attendance, "Attendance registered successfully")
    );

});

const getAttendanceForMonth = asyncHandler(async (req, res) => {
    const { id, year, month } = req.body;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Fetch only the `workday` and `date` fields
    const attendanceRecords = await Attendance.find({
        employee: id,
        date: { $gte: startDate, $lte: endDate }
    }).select("workday date"); // Selecting only `workday` and `date` fields

    return res.status(200).json(
        new ApiResponse(200, attendanceRecords, "Attendance fetched successfully")
    );
});


export {
    markAttendance,
    getAttendanceForMonth
};