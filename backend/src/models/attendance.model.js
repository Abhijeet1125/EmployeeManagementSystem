import { mongoose, Schema } from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const attendanceSchema = new Schema(
    {
        employee: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
            index: true,
        },
        date: {
            type: Date,
            index: true,
        },
        workday: {
            type: String,
            enum: ["Full Day", "Half Day", "Holiday", "Paid Leave", "LWP"],
            required: true, 
        },
    },
    {
        timestamps: true,
    }
);

attendanceSchema.plugin(mongooseAggregatePaginate)


export const Attendance = mongoose.model("Attendance", attendanceSchema)