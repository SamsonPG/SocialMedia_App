import express from 'express'
import { createPost,getPost,deletePost,likeUnlikePost,replayToPost,getFeedPosts } from '../controllers/postController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/feed",protectRoute, getFeedPosts)
router.get("/:id", getPost)
router.post("/create",protectRoute, createPost)
router.delete("/delete/:id",protectRoute, deletePost)
router.post("/like/:id",protectRoute, likeUnlikePost)
router.post("/replay/:id",protectRoute, replayToPost)

export default router 