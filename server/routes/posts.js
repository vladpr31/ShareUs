import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  fetchPostsBySearch,
  fetchPost,
  postComment,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/search", fetchPostsBySearch);
router.get("/:id", fetchPost);
router.post("/", auth, createPost);
router.post("/:id/commentPost", auth, postComment);
router.patch("/:id", auth, updatePost);
router.patch("/:id/likePost", auth, likePost);
router.delete("/:id", auth, deletePost);

export default router;

//routers with auth, are actions that are needed to be checked if the user has the authorization to make those changes,
//such as creating,deleted,updating,liking,commenting.

//patch => Updating Existing Documents.
//post => Send/Create a Document.
//get => request Info/Document.
// (/:id)=> the ":" makes it "Dynamic"
