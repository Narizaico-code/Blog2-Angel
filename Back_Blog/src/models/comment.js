import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    authorName: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;