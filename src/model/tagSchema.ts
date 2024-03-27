import mongoose from "mongoose";


export interface ITag extends mongoose.Document{
    tagName: string;
}

const tagSchema = new mongoose.Schema({
    tagName:{
        type: String,
        required: true
    }
});

const Tag = mongoose.model<ITag>('Tag', tagSchema);
export default Tag;