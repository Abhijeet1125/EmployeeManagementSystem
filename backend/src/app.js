import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import adminRouter  from "./routes/admin.routes.js"
import employeeRouter from "./routes/employee.routes.js"
import departmentRouter  from "./routes/department.routes.js"
import designationRoute  from "./routes/designation.routes.js"


//routes declaration
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/employee", employeeRouter)
app.use("/api/v1/department", departmentRouter)
app.use("/api/v1/designation", designationRoute)


// http://localhost:8000/api/v1/users/register

export { app }