import { NextFunction, Request, Response } from 'express';
import joi  from 'joi';
import mongoose from 'mongoose';
import BadRequestError from '../error/badRequest';
const objectId = joi.extend((joi)=>({
    type:'objectId',
    base:joi.string(),
    messages:{
        'objectId.invalid': '{{#label}} must be a valid ObjectId'
    },
    validate(value,helpers){
        if (!mongoose.Types.ObjectId.isValid(value)){
            return {value,error: helpers.error('objectId.invalid')}
        }
    }
}))
const Schema = joi.object({
    title: joi.string().required(),
    content:joi.string().required(),
    tagId: joi.array().items(objectId.objectId().required())
})
const updateSchema = joi.object({
    title: joi.string(),
    content:joi.string(),
    tagId: joi.array().items(objectId.objectId())
})
const idSchema = joi.object({
    id: objectId.objectId(),
    username: joi.string()
}).xor('username','id')
export const validateBlodId = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try {
        const result = idSchema.validate(req.params)
        if (result.error){
            throw new BadRequestError({code:422,message:result.error.message})
        }
        next()
    }
    catch(err){
        next(err)
    }
}

const validateBlogData = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const result = Schema.validate(req.body)
        if (result.error){
            throw new BadRequestError({code:422,message:result.error.message})
        }
        next()
    }
    catch(err){
        next(err)
    }
}
export const validateUpdateBlogData = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const result = updateSchema.validate(req.body)
        if (result.error){
            throw new BadRequestError({code:422,message:result.error.message})
        }
        next()
    }
    catch(err){
        next(err)
    }
}
export default validateBlogData
