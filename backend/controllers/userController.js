import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenandSetCookie from "../utils/helpers/generateTokenandSetCookie.js";

//Signup User

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    // Check if the user already exists
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
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
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    // Handle errors and send a response
    res.status(500).json({ message: err.message });
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
      return res.status(400).json({ message: "Invalid User name or Password" });
    }

    generateTokenandSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in LoginUser: ", error.message);
  }
};

//Logout User

const logoutUser = (req, res) => {
  try {
    res.cookie("jwt-socialApp", "", { maxAge: 1 });
    res.status(200).json({ message: "User Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in LogoutUser: ", error.message);
  }
};

const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id)
      return res
        .status(400)
        .json({ message: "You cannot follow/unfollow yourself" });

    if (!userToModify || !currentUser)
      return res.status(400).json({ message: "User does not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      //Unfollow user
      // Modify current user following, modify followers of userToModify
      await User.findByIdAndUpdate(req.user._id,{$pull:{following: id}});
      await User.findByIdAndUpdate(id,{$pull:{followers: req.user._id}});

    } else {
      //Follow user
      // Modify current user following, modify followers of userToModify
      await User.findByIdAndUpdate(req.user._id,{$push:{following: id}});
      await User.findByIdAndUpdate(id,{$push:{followers: req.user._id}});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in followUnfollowUser: ", error.message);
  }
};

export { signupUser, loginUser, logoutUser, followUnfollowUser };
