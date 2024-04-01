import { Schema, model ,Document} from "mongoose";

export interface IBlog extends Document {
    title: string,
    content: string,
    userId: Schema.Types.ObjectId
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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export default model<IBlog>('Blog', blogSchema)