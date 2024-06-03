import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    // Use bracket notation for accessing the cookie
    const token = req.cookies['jwt-socialApp'];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by decoded user ID and exclude the password field
    const user = await User.findById(decoded.userId).select("-password");

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in User Authentication: ", error.message);
  }
};

export default protectRoute;

