import express from 'express';
import { check } from 'express-validator';
import { createComment,  getCommentsByProject } from '../controllers/comment.controller.js';
import { validateFields } from '../middlewares/validateField.js';
import { projectExistById } from '../helpers/validateProjects.js';
import { commentExistById } from '../helpers/validateComments.js';

const router = express.Router();

router.post('/',
    [
        check("content", "This field is required").notEmpty(),
        check("projectID", "The id is not a valid MongoDB format").isMongoId(),
        check("projectID").custom(projectExistById),
        check("authorName", "This field is required").notEmpty(),
        validateFields
    ], createComment);

router.get('/:projectId', getCommentsByProject);

export default router;