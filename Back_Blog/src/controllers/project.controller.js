import Project from '../models/project.js';

export const createProject = async (req, res) => {
    try {
        const { title, image, description, code, course } = req.body;
        const project = new Project({
            title,
            image,
            description,
            code,
            course

        });
        await project.save();

        res.status(201).json(project);
    } catch (e) {
        res.status(500).send('Error al crear el proyecto');
    }
}

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ state: true });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).send('Error al obtener los proyectos');
    }
}

export const searchProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const projects = await Project.find({ _id: projectId, state: true });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).send('Error al obtener los proyectos');
    }
}

export const editProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const { title, description, code } = req.body;

        const updateFields = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (code) updateFields.code = code;

        const project = await Project.findByIdAndUpdate(projectId, updateFields, { new: true });

        res.status(200).json(project);
    } catch (e) {
        res.status(500).send('Error al editar el proyecto');
    }
}


export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findByIdAndUpdate(projectId, { state: false }, { new: true });
        res.status(200).json(project);
    } catch (e) {
        res.status(500).send('Error al eliminar el proyecto');
    }
}