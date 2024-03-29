import mongoose, { Document, Schema } from 'mongoose';


export interface IComment extends Document {
  commentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  blogId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const commentSchema: Schema<IComment> = new Schema({
  commentId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref:"Blog",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Create a model based on the schema
export default  mongoose.model<IComment>('Comment', commentSchema);

