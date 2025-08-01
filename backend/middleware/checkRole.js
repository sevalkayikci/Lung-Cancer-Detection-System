import jwt from "jsonwebtoken";

const checkRole = (roles) => (req, res, next) => {
const userRole = req.user.role?.toLowerCase(); 
const allowedRoles = roles.map(r => r.toLowerCase());

if (!allowedRoles.includes(userRole)) {
    return res.status(403).json({ message: 'Forbidden' });
}
  next();
};
export default checkRole;
