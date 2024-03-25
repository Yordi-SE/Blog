import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
    },
    bio: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 5
    },
    profilePicture: {
        type: String,
    },
    role: {
        type: String,
        required: true
    }
})
const User = mongoose.model("User",UserSchema)
export default User