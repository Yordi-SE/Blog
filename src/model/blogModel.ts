import { Schema, model ,Document} from "mongoose";
import { object } from "webidl-conversions";

export interface IBlog extends Document {
    title: string,
    content: string,
    tagId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    comments: number,
    likes: number,
    ratingValue: number,
    ratingNumber: number,
}
const ratingSchema = new Schema({
    ratingValue: {
        type: Number,
        default: 0
    },
    ratingNumber:{
        type: Number,
        default: 0
    }
})

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
    },
    comments: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    ratingNumber: {
        type: Number,
        default: 0
    },
    retingValue: {
        type: Number,
        default: 0
    }
})

export default model<IBlog>('Blog', blogSchema)