import Rating from '../model/ratingSchema';
import { Request, Response } from 'express';
import mongoose from 'mongoose';


export const createRating = async (req: any, res: Response) => {
    try {
        // const { userId, blogId, ratingValue } = req.body;
        const {id} = req.user;
        const {blogId,ratingValue} = req.body;
        const rating = await Rating.create({
            userId: id,
            blogId: blogId,
            ratingValue
        });
        res.status(201).json({
            message: "Rating created successfully",
            rating
        });
    } catch (err) {
        res.status(400).json(err);
    }
}
