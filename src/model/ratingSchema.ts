import mongoose from 'mongoose';



interface IRating extends mongoose.Document{
    userId: mongoose.Types.ObjectId;
    blogId: mongoose.Types.ObjectId;
    ratingValue: number;
}

const ratingSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    ratingValue:{
        type: Number,
        required: true
    }
});

const Rating = mongoose.model<IRating>('Rating', ratingSchema);
export default Rating;