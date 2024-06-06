import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import generateTokenandSetCookie from "../utils/helpers/generateTokenandSetCookie.js";
import {v2 as cloudinary} from "cloudinary"

//getUserProfile

const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    // Validate the post ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: "User not found" });
    } 
    const user = await User.findOne({ username })
      .select("-password")
      .select("-updatedAt");
    if (!user) return res.status(400).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getUserProfile: ", error.message);
  }
};

//Signup User

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

       // Validate the request body
       if (!name || !email || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

    // Check if the user already exists
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    if (newUser) {
      generateTokenandSetCookie(newUser._id, res);
      // Respond with the new user's information
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
        // followers: newUser.followers,
        // following: newUser.following,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    // Handle errors and send a response
    res.status(500).json({ error: err.message });
    console.log("Error in signupUser: ", err.message);
  }
};

//Login User

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid User name or Password" });
    }

    generateTokenandSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
      // followers: user.followers,
      // following: user.following,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in LoginUser: ", error.message);
  }
};

//Logout User

const logoutUser = (req, res) => {
  try {
    res.cookie("jwt-socialApp", "", { maxAge: 1 });
    res.status(200).json({ message: "User Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in LogoutUser: ", error.message);
  }
};

//followUnfollowUser

const followUnfollowUser = async (req, res) => {
  try {
    // Validate the post ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: "User not found" });
    }
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ error: "You cannot follow / unfollow yourself" });

    if (!userToModify || !currentUser)
      return res.status(400).json({ error: "User does not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      //Unfollow user
      // Modify current user following, modify followers of userToModify
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({ message: "User Unfollowed successfully" });
    } else {
      //Follow user
      // Modify current user following, modify followers of userToModify
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({ message: "User Followed successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in followUnfollowUser: ", error.message);
  }
};

//updateUser

const updateUser = async (req, res) => {
  const { name, email, username, password,  bio } = req.body;
  let {profilePic} = req.body;

  const userId = req.user._id;
  try {
    // Validate the post ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: "Usert not found" });
    }

    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "You cannot update other user's profile" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // if(profilePic){
    //   if(user.profilePic){
    //     await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
    //   }
    //   const uploadedResponse = await cloudinary.uploader.upload(profilePic, {
    //     upload_preset: "socialApp",
    //   });
    //   profilePic = uploadResponse.secure_url;
      
    // }

    if (profilePic) {
      // Check if the user already has a profile picture
      if (user.profilePic) {
        // Extract the public ID from the URL and destroy the old picture
        const publicId = user.profilePic.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
    
      // Upload the new profile picture
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        upload_preset: 'social_app',
      });
    
      // Update the profilePic variable with the URL of the uploaded image
      profilePic = uploadResponse.secure_url;
    }
    

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in updateUser: ", error.message);
  }
};

export {
  getUserProfile,
  signupUser,
  loginUser,
  logoutUser,
  followUnfollowUser,
  updateUser,
};
