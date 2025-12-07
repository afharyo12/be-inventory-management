// middleware/AuthMiddleware.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // 1. Get token from header
    const bearerHeader = req.headers['authorization'];
    
    if (!bearerHeader) {
        return res.status(403).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        const token = bearerHeader.split(' ')[1];
        
        // 2. Decode/Verify the token
        // Note: For production, you must verify the signature using Keycloak's Public Key.
        // For development, decoding checks structure but not validity signature.
        const decoded = jwt.decode(token); 
        
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        // 3. Attach user info to request (so Controller can use it)
        req.user = decoded; 
        next();

    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// Optional: Middleware to check for specific roles (e.g. 'admin')
export const requireRole = (role) => {
    return (req, res, next) => {
        // Keycloak stores roles in realm_access.roles
        const roles = req.user.realm_access?.roles || [];
        if (!roles.includes(role)) {
            return res.status(403).json({ message: `Access Denied: Requires ${role} role` });
        }
        next();
    }
};