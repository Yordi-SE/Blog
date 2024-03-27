import User from "../model/userSchema";
import { Request, Response } from "express";
import mongoose from "mongoose";



// create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { 
            username, 
            email, 
            password, 
            name, 
            bio, 
            profilePicture, 
            role 
        } = req.body;

        // Check if the user already exists
        const user = await User.findOne({ username, email});
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        };

        // Create a new user
        const createdUser = await User.create({
            username,
            email,
            password,
            name,
            bio,
            profilePicture,
            role
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
export const getUser = async (req: Request, res: Response) => { 
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
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { 
            username, 
            email, 
            password, 
            name, 
            bio, 
            profilePicture, 
            // role 
        } = req.body;


        
        const updateFields:any = {};
        if (username) updateFields.username = username;
        if (email) updateFields.email = email;
        if (password) updateFields.password = password;
        if (name) updateFields.name = name;
        if (bio) updateFields.bio = bio;
        if (profilePicture) updateFields.profilePicture = profilePicture;
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

export const InactiveUser = async (req: Request, res: Response) => {
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

export const getAllUsers = async (req: Request, res: Response) => {
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