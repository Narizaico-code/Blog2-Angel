import express from 'express';
import { check } from 'express-validator';
import { createProject, deleteProject, editProject, getProjects, searchProject } from '../controllers/project.controller.js';
import uploadImage from '../middlewares/uploadImage .js';
import { validateFields } from '../middlewares/validateField.js';
import { projectExistById } from '../helpers/validateProjects.js';


const router = express.Router();


router.post('/',
    [
        check("title", "This field is required").notEmpty(),
        check("description", "This field is required").notEmpty(),
        check("code", "This field is required").notEmpty(),
        check("course", "This field is required").notEmpty(),
        validateFields,
    ], createProject);


router.get('/', getProjects);

router.get('/:projectId',
    [
        check("projectId", "The id is not a valid MongoDB format").isMongoId(),
        check("projectId").custom(projectExistById),
        validateFields
    ], searchProject);

router.put('/:projectId',
    [
        check("projectId", "The id is not a valid MongoDB format").isMongoId(),
        check("projectId").custom(projectExistById),
        validateFields
    ], editProject);
router.delete('/:projectId',
    [
        check("projectId", "The id is not a valid MongoDB format").isMongoId(),
        check("projectId").custom(projectExistById),
        validateFields
    ], deleteProject);

export default router;