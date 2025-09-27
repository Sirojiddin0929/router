import { Router } from "express";
import PostRouter from "./posts.routes.js"
let MainRouter=Router()

MainRouter.use("/posts",PostRouter)

export default MainRouter