import mongoose, { Document, Schema } from 'mongoose';


interface IComment extends Document {
  commentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  blogId: mongoose.Types.ObjectId;
  content: string;
}

const commentSchema: Schema<IComment> = new Schema({
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
const Comment = mongoose.model<IComment>('Comment', commentSchema);

export { Comment, IComment };