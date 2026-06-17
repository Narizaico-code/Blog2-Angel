import { useState } from "react";
import toast from "react-hot-toast";
import { addComment, getCommentsByPost } from "../services/api";
import { useNavigate } from "react-router-dom";

export const useComments = () => {
    const [comments, setComments] = useState([]);
    const navigate = useNavigate()


    const findByIdProject = async (id) => {
        console.log(id, "HOLAS")
        const response = await getCommentsByPost(id);
        if (response.error) {

            return toast.error(
                response.e?.response?.data || 'Ocurrió un error al leer los comentarios'
            )
        }
        setComments(response.data);

    };

    const createComment = async (data) => {
        const response = await addComment(data)
        if (response.error) {
            console.log(response.e);
            console.log(response.e?.response);
            console.log(response.e?.response?.data);
            return toast.error(response.e?.response?.data || 'Ocurrio un error al iniciar sesion, intenta de nuevo')
        }
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return {
        isFetching: comments.length === 0,
        createComment,
        findByIdProject,
        comments,
    };
}