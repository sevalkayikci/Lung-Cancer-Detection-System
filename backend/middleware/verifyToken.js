import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "token is needed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    console.log("token info:", req.user);

    next(); 
  } catch (err) {
    return res.status(403).json({ message: "invalid token" });
  }
}

export default verifyToken;
