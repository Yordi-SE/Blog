import { Schema, model } from "mongoose";

export interface IBlog extends Document {
    title: string,
    content: string,
    tagId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,

}

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tagId: {
        type: Schema.Types.ObjectId,
        ref: 'Tag', // Reference to the User model
        required: true


    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    }


})

export default model<IBlog>('Blog', blogSchema)