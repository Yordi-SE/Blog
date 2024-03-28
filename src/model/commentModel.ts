import mongoose, { Document, Schema } from 'mongoose';


interface IComment extends Document {
  commentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  blogId: mongoose.Types.ObjectId;
  content: string;
}

const commentSchema: Schema = new Schema({
  commentId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref:"User",
    required: true
  },
  blogId: {
    type: mongoose.Types.ObjectId,
    ref:"Blog",
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

// Create a model based on the schema
export default mongoose.model<IComment>('Comment', commentSchema);