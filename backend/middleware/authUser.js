import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // Extract the token from the headers
    const { token } = req.headers;

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Token is missing." });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decodedToken.id;

    

    // Check if the token matches the admin credentials



    // If authentication is successful, proceed to the next middleware or route
    next();
  } catch (e) {
    console.error("Authentication error:", e.message);
    res.status(500).json({ success: false, message: "Failed to authenticate admin." });
  }
};

export default authUser;
