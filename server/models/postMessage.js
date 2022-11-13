import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    customer: String,
    location: String,
    description: String,
    user: String,
    projectNumber: Number,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage