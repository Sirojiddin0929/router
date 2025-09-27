import express from 'express'
import Mainrouter from "./routes/index.js"
import dotenv from "dotenv"

dotenv.config()

let app=express()
app.use(express.json())

let PORT=process.env.PORT || 3333

app.use("/",Mainrouter)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})