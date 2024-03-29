import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


// token is responded to the client after successful login. This token is used to authenticate the user in the subsequent requests.

const verifyToken = (req: any, res: Response, next: NextFunction) => {

    const token = req.header("auth-token");
    
    if (!token) {
        return res.status(401).json({
            message: "Access denied, token not provided"
        });
    }
    try {
        if (!process.env.SECRET_KEY) {
            return res.status(500).json({ message: "Secret key not defined" });
        }
        // decode the token
        jwt.verify(token, process.env.SECRET_KEY, (err:any, decoded:any) => {
            if (err) {
                return res.status(400).json({
                    message: "Invalid token"
                    });
                }
                req.user = {
                    id: decoded.id,
                    role: decoded.role
                }   
                next();
            });
    } catch (err) {
        res.status(400).json({
            message: "Invalid token"
        });
    };
};



// isAdmin middleware checks if the user is an admin before granting access to the route.
const isAdmin = (req: any, res: Response, next: NextFunction) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied, only admin can access this route"
        });
    }
    next();
};




export { verifyToken, isAdmin };


