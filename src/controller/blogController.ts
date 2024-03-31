import { Request, Response, NextFunction } from "express";
import Blog from '../model/blogModel';
import Tag from "../model/tagSchema";
import User from "../model/userSchema";
import NotFound from "../error/notFound";
import BadRequestError from "../error/badRequest";
import commentModel from "../model/commentModel";
import likeModel from "../model/likeModel";
import Rating from "../model/ratingSchema";
import mongoose from "mongoose";
const getAll = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const page_number:number = req.query.page ? parseInt(req.query.page as string): 1
        const Page_size:number = req.query.page_size ? parseInt(req.query.page_size as string): 10
        const blogs = await Blog.find().select('-userId').populate('tagId').skip((page_number - 1) * Page_size).limit(Page_size)
        if (blogs.length === 0){
            throw new NotFound({message:"no task found"})
        }
        res.status(200).json(blogs)
    }
    catch(err){
        console.log("erro occured while getting blog",err)
        next(err)
    }
}
const getById = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const blog = await Blog.findById(req.params.id).select('-userId').populate('tagId')
        if (!blog){
            throw new NotFound()
        }
        res.status(200).json(blog)
    }
    catch(err){
        console.log("erro occured while getting blog",err)
        next(err)
    }
}
const getMyBlog = async (req:any,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const page_number:number = req.query.page ? parseInt(req.query.page as string): 1
        const Page_size:number = req.query.page_size ? parseInt(req.query.page_size as string): 10
        const blogs = await Blog.find({userId:req.user.id}).select('-userId').populate('tagId').skip((page_number - 1) * Page_size).limit(Page_size)
        if (blogs.length === 0){
            throw new NotFound({message:"no task found"})
        }
        res.status(200).json(blogs)
    }
    catch(err){
        console.log("erro occured while getting blog",err)
        next(err)
    }
}
const getUserBlog = async (req:any,res:Response,next:NextFunction):Promise<any>=>{
    try{
        const page_number:number = req.query.page ? parseInt(req.query.page as string): 1
        const Page_size:number = req.query.page_size ? parseInt(req.query.page_size as string): 10
        const user = await User.findOne({username: req.params.username})
        if (!user){
            throw new NotFound({code:404, message:'user not found'})
        }
        const blogs = await Blog.find({userId:user._id}).select('-userId').populate('tagId').skip((page_number - 1) * Page_size).limit(Page_size)
        if (blogs.length === 0){
            throw new NotFound({message:"no task found"})
        }
        res.status(200).json(blogs)
    }
    catch(err){
        console.log("erro occured while getting blog",err)
        next(err)
    }
}
const createBlog = async (req:any,res:Response,next:NextFunction):Promise<void>=>{
    try {
        for (const id in req.body.tagId){
            const tag = await Tag.findById(req.body.tagId[id])
            if (!tag){
                throw new NotFound({code:404,message:"Tag Not Found"})
            }
        }
        const new_blog = {
            title: req.body.title,
            userId:req.user.id,
            content: req.body.content,
            tagId: req.body.tagId
        }
        const blog = await Blog.create(new_blog);
        const populatedBlog = await Blog.findById(blog._id).select('-userId').populate('tagId')
        res.status(201).json(populatedBlog)
    }
    catch(err:any){
        console.log("error occured while updating the blog",err)
        next(err)
    }
}
const patchBlog = async (req:any,res:Response,next:NextFunction):Promise<void>=>{
    try {
        for (const id in req.body.tagId){
            const tag = await Tag.findById(req.body.tagId[id])
            if (!tag){
                throw new NotFound({code:404,message:"Tag Not Found"})
            }
        }
        const blog = {
            title: req.body.title,
            content:req.body.content,
            tagId:req.body.tagId

        }
        await Blog.findOneAndUpdate({$and: [{_id:req.params.id},{userId:req.user.id}]},blog)
        const updatedBlog = await Blog.findOne({$and: [{_id:req.params.id},{userId:req.user.id}]}).populate('tagId').select('-userId');
        if (!updatedBlog){
            throw new NotFound({code:404,message:"Blog Not Found"})
        }
        res.status(200).json(updatedBlog)

    }
    catch(err:any){
        console.log("error occured while updating the blog")
        next(err)
    }

}
const deleteBlog = async (req:any,res:Response,next:NextFunction):Promise<void>=>{
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();

        const blog = await Blog.findById(req.params.id)
        if (!blog){
            throw new NotFound({code:404,message:"Blog Not Found"})
        }
        console.log("user",blog.userId,req.user.id)
        if (blog.userId.toString() !== req.user.id && req.user.role != 'Admin'){
            throw new BadRequestError({code:403,message:'unauthorized'})
        }
        await Promise.all([
            await Blog.findByIdAndDelete(req.params.id),
            await commentModel.findOneAndDelete({blogId:req.params.id}),
            await likeModel.findOneAndDelete({blogId:req.params.id}),
            await Rating.findOneAndDelete({blogId:req.params.id})
        ])
        await session.commitTransaction();
        res.status(204).send()
    }
    catch(err:any){
        session.abortTransaction()
        console.log("error occured while updating the blog")
        next(err)
    }
    finally {
        session.endSession()
    }
}
export default {createBlog,patchBlog,getAll,deleteBlog,getById,getMyBlog,getUserBlog}