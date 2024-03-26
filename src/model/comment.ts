<<<<<<< HEAD
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
=======
import { User } from './user';
import { Blog } from './blog';


interface User {
  userID: number;
}


interface Blog {
  blogID: number;
}


export interface Comment {
  commentID: number;    
  userID: number;       
  blogID: number;       
  content: string;
}


export interface CommentWithRefs extends Comment {
  user: User;
  blog: Blog;
}







>>>>>>> 0b280b07421925e61adae54abb871f6c5cfeb624
