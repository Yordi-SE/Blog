import { Schema, model ,Document} from "mongoose";

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
    tagId:
        [{ type: Schema.Types.ObjectId, ref: 'Tag',required: true }], // Reference to the User model
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    }


})

export default model<IBlog>('Blog', blogSchema)