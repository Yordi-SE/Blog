import mongoose from 'mongoose';
interface IUser extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    name: string;
    bio: string;
    profilePicture?: string;
    role: string;
    active: boolean;
}
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
    profileImage: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    active: {
        type: Boolean,
        default: true
    }
})
export default mongoose.model<IUser>("User",UserSchema)