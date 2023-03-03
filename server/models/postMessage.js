import mongoose, { Schema } from "mongoose";

const postSchema = mongoose.Schema({
    customer: String,
    location: String,
    description: String,
    user: String,
    projectNumber: Number,
    status: Number,
    createdAt: {
        type: Date,
        default: new Date()
    },
    createdBy: {type: Schema.Types.ObjectId, ref: 'User' }
    
});

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage