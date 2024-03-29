import { Request, Response } from "express";
import Comment, { IComment } from "../model/commentModel";
import Blog from '../model/blogModel';

export const createComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { content } = req.body;
        const userId = req.params.userId;
        const blogId = req.params.blogId;

        if (!userId || !blogId || !content) {
            res.status(400).json({ message: 'Required fields are missing' });
            return;
        }

       
        const comment: IComment = new Comment({
            userId,
            blogId,
            content
        });


        await comment.save();
        const commentCount = await Comment.countDocuments({ blogId });
        await Blog.findByIdAndUpdate(blogId, { comments: commentCount });
        console.log(commentCount);

        res.status(201).json({ message: 'Comment created', comment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Internal server error occurred' });
    }
};


export const getComments = async (req: Request, res: Response): Promise<void> => {

    try {
        const blogId = req.params.blogId;
        const limit = 10
        console.log(blogId)

        const comment = await Comment.find({ blogId })
            .sort({ createdAt: -1 })
            .limit(limit);

        res.status(200).json({ comment });

    } catch (error) {
        res.status(500).json({ message: 'internal server error occured' });
    }
}

export const updateComment = async (req: Request, res: Response): Promise<void> => {

    try {
        const commentId = req.params.postId;
        const content = req.body

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { content },
            { new: true });
        if (!updatedComment) {
            res.status(404).json({ message: 'comment not found' });
        }
        res.status(200).json({ message: 'comment updated', updatedComment });
    } catch (error) {
        res.status(500).json({ message: 'internal server error occured' });
    }
}


export const deleteComment = async (req: Request, res: Response): Promise<void> => {

    try {
        const commentId = req.params.postId
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            res.status(200).json({ message: 'comment not found' });
        }

        res.status(200).json({ mesaage: 'comment deleted' });

    } catch (error) {
        res.status(500).json({ message: 'internal server error occured' });
    }
}




