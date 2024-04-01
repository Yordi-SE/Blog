import { Request, Response } from "express";
import Blog from '../blogSchema/blogSchema';
const getAll = async (req:Request,res:Response):Promise<any>=>{
    try{
        const page_number:number = req.query.page ? parseInt(req.query.page as string): 1
        const Page_size:number = req.query.page_size ? parseInt(req.query.page_size as string): 10
        const blogs = await Blog.find().select('-userId').skip((page_number - 1) * Page_size).limit(Page_size)
        if (blogs.length === 0){
            return res.status(404).send({
                message:"blog not found"
            })
        }
        res.status(200).json(blogs)
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error"})
    }
}
const getById = async (req:Request,res:Response):Promise<any>=>{
    try{
        const blog = await Blog.findById(req.params.id).select('-userId')
        if (!blog){
            return res.status(404).send({
                message:"blog not found"
            })
        }
        res.status(200).json(blog)
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error"})
    }
}
const createBlog = async (req:any,res:Response):Promise<void>=>{
    try {
        const new_blog = {
            title: req.body.title,
            userId:req.user.id,
            content: req.body.content,
        }
        const blog = await Blog.create(new_blog);
        const populatedBlog = await Blog.findById(blog._id).select('-userId')
        res.status(201).json(populatedBlog)
    }
    catch(err:any){
        res.status(500).send({message:"Internal Server Error"})
    }
}
const patchBlog = async (req:any,res:Response):Promise<any>=>{
    try {
        const blog = {
            title: req.body.title,
            content:req.body.content,
        }
        await Blog.findOneAndUpdate({$and: [{_id:req.params.id},{userId:req.user.id}]},blog)
        const updatedBlog = await Blog.findOne({$and: [{_id:req.params.id},{userId:req.user.id}]}).select('-userId');
        if (!updatedBlog){
            return res.status(404).send({
                message:"blog not found"
            })
        }
        res.status(200).json(updatedBlog)

    }
    catch(err:any){
        res.status(500).send({message:"Internal Server Error"})
    }

}
const deleteBlog = async (req:any,res:Response):Promise<any>=>{
    try {
        const blog = await Blog.findByIdAndDelete({$and: [{userId: req.user.id},{_id:req.params.id}]});
        if (!blog){
            return res.status(404).send({
                message:"blog not found"
            })
        }

        res.status(204).send()
    }
    catch(err:any){
        res.status(500).send({message:"Internal Server Error"})
    }
}
export default {createBlog,patchBlog,getAll,deleteBlog,getById}