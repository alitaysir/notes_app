import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const middleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, "secretkeyforlogin@123");

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User doesn't exist",
      });
    }

    const newuser = { name: user.name, id: user._id };
    req.user = newuser;

    next();
    
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Please login",
    });
  }
};

export default middleware;
