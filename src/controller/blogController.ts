import { Request, Response, NextFunction } from "express";
import Blog from '../model/blogModel';
import Tag from "../model/tagSchema";
import User from "../model/userSchema";
const getAll = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const page_number:number = req.query.page ? parseInt(req.query.page as string): 1
        const Page_size:number = req.query.page_size ? parseInt(req.query.page_size as string): 10
        const blogs = await Blog.find().select('-userId').populate('tagId').skip((page_number - 1) * Page_size)
        res.status(200).json(blogs)
    }
    catch(err){
        console.log("erro occured while getting blog",err)
        res.status(400).json({
            status: 'error',
            message: "erro occured while getting blog"
        })
    }
}
const getById = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const blog = await Blog.findById(req.params.id).select('-userId').populate('tagId')
        res.status(200).json(blog)
    }
    catch(err){
        console.log("erro occured while getting blog",err)
        res.status(400).json({
            status: 'error',
            message: "erro occured while getting blog"
        })
    }
}
const getMyBlog = async (req:any,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const page_number:number = req.query.page ? parseInt(req.query.page as string): 1
        const Page_size:number = req.query.page_size ? parseInt(req.query.page_size as string): 10
        const blogs = await Blog.find({userId:req.user.id}).select('-userId').populate('tagId').skip((page_number - 1) * Page_size)
        res.status(200).json(blogs)
    }
    catch(err){
        console.log("erro occured while getting blog",err)
        res.status(400).json({
            status: 'error',
            message: "erro occured while getting blog"
        })
    }
}
const getUserBlog = async (req:any,res:Response,next:NextFunction):Promise<any>=>{
    try{
        const page_number:number = req.query.page ? parseInt(req.query.page as string): 1
        const Page_size:number = req.query.page_size ? parseInt(req.query.page_size as string): 10
        const user:any = User.findOne({username: req.params.username})
        if (!user){
            return res.status(404).json({
                status: 'error',
                message:'user not found'
            })
        }
        const blogs = await Blog.find({userId:user._id}).select('-userId').populate('tagId').skip((page_number - 1) * Page_size)
        res.status(200).json(blogs)
    }
    catch(err){
        console.log("erro occured while getting blog",err)
        res.status(400).json({
            status: 'error',
            message: "erro occured while getting blog"
        })
    }
}
const createBlog = async (req:any,res:Response,next:NextFunction):Promise<void>=>{
    try {
        for (const id in req.body.tagId){
            const tag = await Tag.findById(req.body.tagId[id])
            if (!tag){
                throw Error(`tagId ${req.body.tagId[id]} not found`)
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
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}
const patchBlog = async (req:any,res:Response,next:NextFunction):Promise<void>=>{
    try {
        for (const id in req.body.tagId){
            const tag = await Tag.findById(req.body.tagId[id])
            if (!tag){
                throw Error(`tagId ${req.body.tagId[id]} not found`)
            }
        }
        const blog = {
            title: req.body.title,
            content:req.body.content,
            tagId:req.body.tagId

        }
        const updatedBlog = await Blog.findOneAndUpdate({$and: [{_id:req.params.id},{userId:req.user.id}]},blog).populate('tagId').select('-userId');
        if (!updatedBlog){
            res.status(404).json({
                status: 'error',
                message: "blog not found"
            })
        }
        else {
            res.status(200).json(updatedBlog)
        }

    }
    catch(err:any){
        console.log("error occured while updating the blog")
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }

}
const deleteBlog = async (req:any,res:Response,next:NextFunction):Promise<any>=>{
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog){
            return res.status(404).json({
                status:'error',
                message: 'blog not found'
            })
        }
        if (blog.userId !== req.user.id && req.user.role != 'Admin'){
            return res.status(403).json({
                status: 'error',
                message: 'unauthorized'
            })
        }
        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).send()
    }
    catch(err:any){
        console.log("error occured while updating the blog")
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}
export default {createBlog,patchBlog,getAll,deleteBlog,getById,getMyBlog,getUserBlog}