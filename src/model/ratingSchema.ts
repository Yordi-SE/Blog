import mongoose from 'mongoose';


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

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;