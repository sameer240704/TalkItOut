import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    avatarImage: {
        type: String,
        required: true
    },
    bioData: {
        type: String,
        required: false,
        default: "I am a TalkItOut User"
    },
    password: {
        type: String,
        required: true,
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    friends: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);
export default User;