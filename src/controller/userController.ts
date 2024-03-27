import User from "../model/userSchema";
import { Request, Response } from "express";
import mongoose from "mongoose";
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig"

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

const createUser = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const { 
            username, 
            email, 
            password, 
            name, 
            bio,
        } = req.body;
        // Check if the user already exists
        const user = await User.findOne({ username, email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Upload profile picture to Cloudinary
        upload.single('profileImage')(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to upload profile picture',err });
            }

            let profilePictureUrl = null;

            // Check if file was uploaded
            if (req.file) {
                const result = await cloudinary.v2.uploader.upload(req.file.path);
                profilePictureUrl = result.secure_url;
            }

            // Create a new user with profile picture URL
            const createdUser = await User.create({
                username,
                email,
                password,
                name,
                bio,
                profileImage: profilePictureUrl, // Save profile picture URL in the user document
            });

            // Send the response
            res.status(201).json({
                message: "User created successfully",
                user: createdUser
            });
        });

    } catch (err) {
        res.status(400).json(err);
    }
}

// get specific user
const getUser = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const user = await User
            .findById(id)
            .populate("blogs")
            .populate("tags")
            .populate("comments")
            .populate("ratings")
            .exec();
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

// update user
const updateUser = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
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

const InactiveUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(
            id,
            { active: false },
            { new: true }
        );
        res.status(200).json({
            message: "User deleted successfully",
            user: user
        });
    } catch (err) {
        res.status(400).json(err);
    }
};


// get all users

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
            .populate("blogs")
            .populate("tags")
            .populate("comments")
            .populate("ratings")
            .exec();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
};

export { createUser, getUser, updateUser, InactiveUser, getAllUsers };