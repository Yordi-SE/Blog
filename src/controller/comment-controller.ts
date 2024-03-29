import { Request, Response } from "express";
import Comment, { IComment } from "../model/comment";

export const createComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { blogId, content } = req.body
        const userId = req.params.userId;
        if (!userId || blogId) {
            res.status(400).json({ message: 'required feilds are missing' })
        }

        const comment: IComment = new Comment({
            userId,
            blogId,
            content
        });
        await comment.save();
        res.status(201).json({ message: 'comment created' });
    } catch (error) {
        res.status(500).json({ message: 'internal server error occured' });
    }
}

export const getComments = async (req: Request, res: Response): Promise<void> => {

    try {
        const postId = req.params.postId;
        const limit = 10

        const comment = await Comment.find({ blogId: postId })
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




