import { NextFunction, Request, Response } from 'express';
import joi  from 'joi';
import mongoose from 'mongoose';
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
const validateBlogData = async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
    const result = Schema.validate(req.body)
    if (result.error){
        return res.status(422).json({
            status:'error',
            message: result.error.message
        })
    }
    next()
}
