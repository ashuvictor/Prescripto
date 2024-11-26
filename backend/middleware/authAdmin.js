import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    // Extract the token from the headers
    const { atoken } = req.headers;

    // Check if the token exists
    if (!atoken) {
      return res.status(401).json({ success: false, message: "Not Authorized. Token is missing." });
    }

    // Verify the token
    const decodedToken = jwt.verify(atoken, process.env.JWT_SECRET);

    // Check if the token matches the admin credentials
    if (
      decodedToken !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ success: false, message: "Not Authorized. Invalid token." });
    }

    // If authentication is successful, proceed to the next middleware or route
    next();
  } catch (e) {
    console.error("Authentication error:", e.message);
    res.status(500).json({ success: false, message: "Failed to authenticate admin." });
  }
};

export default authAdmin;
