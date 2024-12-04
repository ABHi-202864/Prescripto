import jwt from "jsonwebtoken";

// ADMIN AUTHENTICATION MIDDLEWARE
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.status(401).json({ success: false, message: "Not Authorized Login Again" });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(403).json({ success: false, message: "Not Authorized Login Again" });
    }

    next();

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export default authAdmin;