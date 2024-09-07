import { mongoose , Schema } from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const departmentSchema = new Schema (
    {
        departmentname : {
            type : String ,
            required : true,
            trim : true            
        },
        location : { 
            type : String ,
            required : true , 
            trim : true 
        },
        desc : {
            type : String ,
        },
        head : { 
            type : Schema.Types.ObjectId,
            ref : "Employee"
        }
    },
    {
        timestamps: true ,
    }
)

departmentSchema.index({ departmentname: 1, location: 1 }, { unique: true });

departmentSchema.plugin(mongooseAggregatePaginate)


export const Department = mongoose.model("Department" , departmentSchema)