import { mongoose, Schema } from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const salarySchema = new Schema(
    {
        employee: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
            index: true,
        },
        startdate: {
            type: Date,
            required : true ,
        },
        enddate: {
            type: Date,
        },
        salary: {
            type: Number,
            required : true , 
        },
        payonholidays : {
            type : Boolean ,
            default : true , 
        }
    },
    {
        timestamps: true,
    }
);

salarySchema.plugin(mongooseAggregatePaginate)


export const Salary  = mongoose.model("Salary", salarySchema)