import Comment from '../models/comment.js';


export const createComment = async (req, res) => {
    try {
        const { content, projectID, authorName } = req.body;
        const comment = await Comment.create({ content, projectID, authorName });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el comentario' });
    }
}

export const getCommentsByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const comments = await Comment.find({ projectID: projectId, state: true });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los comentarios' });
    }
}
