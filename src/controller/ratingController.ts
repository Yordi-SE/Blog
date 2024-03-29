import Rating from '../model/ratingSchema'
import { Request,Response } from 'express'





const createRating = async (req:any,res:Response) => {
    try {
        const {blogId,ratingValue} = req.body;
        const userId = req.user.id

        const newRating = new Rating({
            blogId,
            userId,
            ratingValue
        });

        await newRating.save();
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
}

const deleteRating = async (req:any,res:Response) => {
    try {
        const userId = req.user.id;
        const blogId = req.body.blogId;

        const rating = await Rating.findOneAndDelete({userId,blogId});
        if(!rating){
            return res.status(404).send({message:"Rating not found"});
        };

        res.status(200).send({message:"Rating deleted successfully"});
    } catch (error) {
        res .status(400 ).send(error);
    }
}
