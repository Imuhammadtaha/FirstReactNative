import express from "express";
import { requireSignIn } from "../controllers/userController.js";

import {
  createPostController,
  deletePostController,
  getAllPostsContoller,
  getUserPostsController,
  updatePostController,
} from "../controllers/postController.js";

const router = express.Router();

// CREATE POST || POST
router.post("/create-post", requireSignIn, createPostController);

//GET ALL POSTs
router.get("/get-all-post", getAllPostsContoller);

//GET USER POSTs
router.get("/get-user-post", requireSignIn, getUserPostsController);

//DELEET POST
router.delete("/delete-post/:id", requireSignIn, deletePostController);

//UPDATE POST
router.put("/update-post/:id", requireSignIn, updatePostController);

export default router;
