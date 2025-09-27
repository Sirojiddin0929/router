import { Router } from "express";
import { createPost,deletePost,getAllPosts,getOnePost,updatePost } from "../controllers/posts.controller.js";

let PostRouter=Router()

PostRouter.get("/",getAllPosts)
PostRouter.post("/",createPost)
PostRouter.get("/:id",getOnePost)
PostRouter.put("/:id",updatePost)
PostRouter.delete("/:id",deletePost)

export default PostRouter
