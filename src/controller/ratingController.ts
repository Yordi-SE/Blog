import Rating from '../model/ratingSchema'
import { Request,Response } from 'express'
import blogModel from '../model/blogModel';
import mongoose from 'mongoose';



const createRating = async (req:any,res:Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {blogId,ratingValue} = req.body;
        const userId = req.user.id

        const newRating = new Rating({
            blogId,
            userId,
            ratingValue
        });

        const created = await newRating.save({session:session});
        const updatedBlog = await blogModel.findByIdAndUpdate(blogId, {$inc: {ratingNumber:1, ratingValue:ratingValue}},{new:true,session:session});
        if (!updatedBlog) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).send({message:"Blog not found"});
        }
        await session.commitTransaction();
        session.endSession();

        res.status(201).send(newRating);

    } catch (error) {
        res.status(400).send(error);
    }
};

const updateRating = async (req:any,res:Response) => {
    try {

        const {ratingValue} = req.body;
        const userId = req.user.id;
        const blogId = req.body.blogId;

        const rating = await Rating.findOne({userId,blogId});
        if(!rating){
            return res.status(404).send({message:"Rating not found"});
        };

        rating.ratingValue = ratingValue;
        await rating.save();
        res.status(200).send(rating);

    }
    catch (error) {
        res.status (400).send (error);
    }
};



const deleteRatingAndUpdateBlog = async (req:any,res:Response) => {

    const session = await mongoose.startSession();
    session.startTransaction();


    try {
        const userId = req.user.id;
        const blogId = req.body.blogId;

        const rating = await Rating.findOneAndDelete({userId,blogId}).session(session);

        if(!rating){
            session.abortTransaction();
            session.endSession();
            return res.status(404).send({success:false,message:"Rating not found"});
        };
        
        const updatedBlog = await blogModel.findByIdAndUpdate(blogId, {$inc: {ratingNumber:-1, ratingValue: -rating.ratingValue}},{new:true,session:session});

        if (!updatedBlog) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).send({message:"Blog not found"});
        }

        await session.commitTransaction();
        session.endSession();

        return res.status(200).send({ success:true, message:"Rating deleted successfully"});

    } catch (error) {
        res .status(400 ).send(error);
    }
};

const getBlogRatings = async (req:any,res:Response) => {
    try {

        const blogId = req.body.blogId;

        if (!blogId) {
            return res.status(400).send({message:"BlogId is required"});
        }

        const ratings = await Rating.find({blogId});
        if (!ratings) {
            return res.status(404).send({message:"Rating not found"});
        }

        res.status(200).send(ratings);
    } catch (error) {
        res .status(400 ).send(error);
    }
};


const getUserRatings = async (req:any,res:Response) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).send({message:"UserId is required"});
        }

        const ratings = await Rating .find({userId });
        if (!ratings) {
            return res.status(404).send({message:"Rating not found"});
        }
        res.status(200).send(ratings);
    }
    catch (error) {
        res.status(400).send (error);
    }
};

const getRating = async (req:any, res:Response) => {
    try {
        const userId = req.user.id;
        const {blogId} = req.body;

        if (!blogId) {
            return res.status(400).send({message:"BlogId is required"});
        };

        if (!userId) {
            return res.status(400).send({message:"UserId is required"});
        };

        const rating = await Rating.findOne({userId,blogId});
        if (!rating) {
            return res.status(404).send({message:"Rating not found"});
        }   

        return res.status(200).send(rating);
    }
    catch (error) {
        return res.status(400).send(error);
    }
};


export default {createRating,updateRating,deleteRatingAndUpdateBlog,getBlogRatings,getUserRatings,getRating};
