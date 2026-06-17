import Comment from "../models/comment.js"

export const commentExistById = async (id = '') => {
    const commentExistById = await Comment.findById(id);
    if (!commentExistById) {
        throw new Error(`Comment not found`);
    }
    if (!commentExistById.state) {
        throw new Error(`Comment not found`);
    }
}