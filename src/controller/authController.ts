import { Request, Response } from "express";
import User from "../model/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async (req: Request, res: Response) => { 

    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email
        }); 
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        };
        if (!process.env.SECRET_KEY) {
            return res.status(500).json({ message: "Secret key not defined" });
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.setHeader("auth-token", token);

        res.status(200).json({
            message: "Login successful",
            user: {
                username: user.username,
                email: user.email,
                name: user.name,
                bio: user.bio,
                profilePicture: user.profilePicture,
                role: user.role,
                active: user.active
            }
            
        });
    } catch (err) {
        res.status(400).json(err);
    }
}