import {Request,Response} from 'express';
import Like from '../model/likeModel';
import User from '../model/userSchema';
import Blog from '../model/blogModel'

export const likeBlog = async (req: Request, res: Response):Promise<any> => {
    const { userId, blogId } = req.body;
    try {
        if (!userId || !blogId) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = User.findOne({ userId: userId });
        const blog = Blog.findOne({ blogId: blogId })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        if (!blog) {
            return res.status(400).json({ message: "Blog not found" })
        }
        const existingLike = await Like.findOne({ userId, blogId });
        if (existingLike) {
            await Like.deleteOne({ userId, blogId });
            return res.status(200).json({ message: 'Blog unliked successfully' });
        }

        const newLike = new Like({ userId, blogId });
        await newLike.save();
        res.status(201).json({ message: 'Like created successfully', like: newLike });
    }
     catch (err) {
        res.status(400).json(err);

    }
}
export const unlikeBlog = async (req: Request, res: Response) => {
  const { userId, blogId } = req.body;
  try {
    if (!userId || !blogId) {
      return res.status(400).json({ error: 'Both userId and blogId are required' });
    } 
    const user = User.findOne({ userId: userId });
    const blog = Blog.findOne({ blogId: blogId })
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }
    if (!blog) {
        return res.status(400).json({ message: "Blog not found" })
    }

      const existingLike = await Like.findOneAndDelete({ userId, blogId });

    if (!existingLike) {
      return res.status(404).json({ error: 'Like not found' });
      }
    else {
        res.status(200).json({ message: 'Blog unliked successfully' });
    }
 

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getlikes = async (req: Request, res: Response) => {
    try {
        const likes = await Like.find({ userId: req.params.userId });
        res.status(200).json(likes);
    } catch {
        res.status(500).json({ error: "Internal server error" })
    }
}
