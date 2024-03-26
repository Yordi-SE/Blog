
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







