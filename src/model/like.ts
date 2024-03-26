<<<<<<< HEAD

import mongoose, { Document, Schema } from 'mongoose';
interface ILike extends Document{
  likeId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  blogId:mongoose.Types.ObjectId
}
const likeSchema: Schema<ILike> = new Schema({
  likeId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  userId: {
    type:mongoose.Types.ObjectId,
    required: true
  },
  blogId: {
    type: mongoose.Types.ObjectId,
    requird:true
  }
})
const Like = mongoose.model<ILike>('Like', likeSchema);
export {Like ,ILike}

=======
import { User } from './user';
import { Blog } from './blog';

interface User {
  userID: number;
}

interface Blog {
  blogID: number;
}

export interface Like {
  likeID: number;    
  userID: number;    
  blogID: number;    
}



export interface LikeWithRefs extends Like {
  user: User;
  blog: Blog;
}
>>>>>>> 0b280b07421925e61adae54abb871f6c5cfeb624






