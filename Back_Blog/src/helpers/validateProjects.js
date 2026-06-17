import Project from "../models/project.js"

export const projectExistById = async (id = '') => {
    const projectExistById = await Project.findById(id);
    if (!projectExistById) {
        throw new Error(`Project not found`);
    }
    if (!projectExistById.state) {
        throw new Error(`Project not found`);
    }
}