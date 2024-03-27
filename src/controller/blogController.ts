import { Request, Response, NextFunction } from "express";
import Blog from '../model/blogModel';
import Tag from "../model/tagSchema";
import Like from '../model/likeModel';
import Comment from '../model/commentModel';
import Rating from "../model/ratingSchema";
const getAll = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const page_number:number = req.query.page ? parseInt(req.query.page as string): 1
        const Page_size:number = req.query.page_size ? parseInt(req.query.page_size as string): 10
        const array:any[] = [];
        const blogs = await Blog.find().select('-userId').populate('tagId').skip((page_number - 1) * Page_size)
        for (const i in blogs){
            const numOfRatings = await Rating.countDocuments({blogId: blogs[i]._id})
            let ratings = 0;
            const rate = await Rating.find({blogId:blogs[i]._id})
            for (const j in rate){
                ratings += rate[j].ratingValue
            }
            
            const new_blog = {
                blogId: blogs[i]._id,
                blogTitle: blogs[i].title,
                blogContent: blogs[i].content,
                blogTags: blogs[i].tagId,
                comments: blogs[i].comments || 0,
                likes : blogs[i].likes || 0,
                rating: Math.floor(ratings/numOfRatings)
            }
            array.push(new_blog)
        }


        res.status(200).json(array)
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
        const blog = await Blog.findById(req.params.id).populate('tagId')
        const numOfRatings = await Rating.countDocuments({blogId: blog?._id})

        let ratings = 0;
        const rate = await Rating.find({blogId:blog?._id})
        for (const j in rate){
            ratings += rate[j].ratingValue
        } 
        const new_blog = {
            blogId: blog?._id,
            blogTitle: blog?.title,
            blogContent: blog?.content,
            blogTags: blog?.tagId,
            comments: blog?.comments || 0,
            likes : blog?.likes || 0,
            rating: Math.floor(ratings/numOfRatings)
        }
        res.status(200).json(new_blog)
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
        const blogs = await Blog.find({$and: [{_id:req.params.id},{userId:req.userId}]}).select('-userId').populate('tagId').skip((page_number - 1) * Page_size)
        const array:any[] = [];
        for (const i in blogs){
            const numOfRatings = await Rating.countDocuments({blogId: blogs[i]._id})
            let ratings = 0;
            const rate = await Rating.find({blogId:blogs[i]._id})
            for (const j in rate){
                ratings += rate[j].ratingValue
            }
            
            const new_blog = {
                blogId: blogs[i]._id,
                blogTitle: blogs[i].title,
                blogContent: blogs[i].content,
                blogTags: blogs[i].tagId,
                comments: blogs[i].comments || 0,
                likes : blogs[i].likes || 0,
                rating: Math.floor(ratings/numOfRatings)
            }
            array.push(new_blog)
        }
        res.status(200).json(array)
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
            userId:req.userId,
            content: req.body.content,
            tagId: req.body.tagId
        }
        const blog = await Blog.create(new_blog);
        const populatedBlog = await Blog.findById(blog._id).populate('tagId')
        console.log(populatedBlog)
        res.status(201).json({
            blogId: populatedBlog?._id,
            blogTitle: populatedBlog?.title,
            blogContent: populatedBlog?.content,
            blogTags: populatedBlog?.tagId
        })
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
        const updatedBlog = await Blog.findOneAndUpdate({$and: [{_id:req.params.id},{userId:req.userId}]},blog);
        if (!updatedBlog){
            res.status(404).json({
                status: 'error',
                message: "blog not found"
            })
        }
        else {
            const populatedBlog = await Blog.findById(req.params.id).populate('tagId');
            res.status(200).json({
                blogId: populatedBlog?._id,
                blogTitle: populatedBlog?.title,
                blogContent: populatedBlog?.content,
                blogTags: populatedBlog?.tagId
            })
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
const deleteBlog = async (req:any,res:Response,next:NextFunction):Promise<void>=>{
    try {
        const blog = await Blog.findOneAndDelete({$and: [{_id:req.params.id},{userId:req.userId}]})
        if (blog){
            res.status(204).send()
        }
        else{
            res.status(404).json({
                status: 'error',
                message: "blog not found"
            })        
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
export default {createBlog,patchBlog,getAll,deleteBlog,getById,getMyBlog}