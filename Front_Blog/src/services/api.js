import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/blog/v1',
    timeout: 5000
})

export const getProjects = async () => {
    try {
        return await apiClient.get('/projects/')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}


export const deleteProjects = async (id) => {
    try {
        return await apiClient.delete(`/projects/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const searchProject = async (id) => {
    try {
        return await apiClient.get(`/projects/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const postProject = async (data) => {
    try {
        return await apiClient.post('/projects/', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const addComment = async (data) => {
    try {
        return await apiClient.post(`/comments/`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getCommentsByPost = async (id) => {
    try {
        return await apiClient.get(`/comments/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}