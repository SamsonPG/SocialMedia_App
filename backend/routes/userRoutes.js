import express, { Router } from 'express';
import {signupUser, loginUser, logoutUser, followUnfollowUser, updateUser} from '../controllers/userController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();



router.post("/signup",signupUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.post("/follow/:id",protectRoute,followUnfollowUser)
router.post("/update/:id",protectRoute,updateUser)




export default router;