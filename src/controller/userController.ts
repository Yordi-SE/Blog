import User from "../model/userSchema";
import { Request, Response } from "express";
import mongoose from "mongoose";
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig"
import { UploadedFile } from 'express-fileupload'
// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

const createUser = async (req: any, res: Response) => {
    
    try {
                
        const { 
            username, 
            email, 
            password, 
            name, 
            bio,
            profileImage
        } = req.body;
        // Check if the user already exists
        const user = await User.findOne({ username, email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const createdUser = await User.create({
            username,
            email,
            password,
            name,
            bio,
            profileImage // Save profile picture URL in the user document
        });

            // Send the response
        res.status(201).json({
            message: "User created successfully",
            user: createdUser
        });

    } catch (err) {
        res.status(400).json(err);
    }
};



// get specific user
const getUser = async (req: any, res: Response) => { 
    try {
        const {role} = req.user;
        if (role === 'admin') {
            
            const username = req.params.username;
            const user = await User.findOne({ username });

            if (!user) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.status(200).json(user);
            }
        }
        const { id } = req.user;

        if (!id) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User
            .findById(id)
            .exec();
        res.status(200).json(user);

    } catch (err) {
        res.status(400).json(err);
    }
};

// update user
const updateUser = async (req: any, res: Response) => {
    try {

        const { id } = req.user;
        const { 
            username, 
            email, 
            password, 
            name, 
            bio, 
            profileImage, 
            // role 
        } = req.body;


        
        const updateFields:any = {};
        if (username) updateFields.username = username;
        if (email) updateFields.email = email;
        if (password) updateFields.password = password;
        if (name) updateFields.name = name;
        if (bio) updateFields.bio = bio;
        if (profileImage) updateFields.profileImage = profileImage;
        // if (role) updateFields.role = role;

        // update the user
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (err) {
        res.status(400).json(err);
    }
};

// delete user

const InactiveUser = async (req: any, res: Response) => {
    try {
        const username = req.params.username
        const { role } = req.user;
        if (role != 'admin') {
            res.status(401).json({ message: "Unauthorized" });
        }
        const userTobeDeactivated = await User.findOne({ username }).select('-password').exec();

        let id: mongoose.Types.ObjectId;

        if (!userTobeDeactivated) {
            res.status(404).json({ message: "User not found" });
        } else {
            id = userTobeDeactivated._id;
            const user = await User.findByIdAndUpdate(
                id,
                { active: false },
                { new: true }
            );
            res.status(200).json({
                message: "User deleted successfully",
                user: user
            });
        }
      
    } catch (err) {
        res.status(400).json(err);
    }
};


// get all users

const getAllUsers = async (req: any, res: Response) => {
    try {
        const { role } = req.user;

        if (role != 'admin') {
            res.status(401).json({ message: "Unauthorized" });
        }
        const users = await User.find().select('-password').exec();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
};

export { createUser, getUser, updateUser, InactiveUser, getAllUsers };