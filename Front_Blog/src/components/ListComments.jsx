import React, { useEffect } from 'react'
import { Comments } from './Comments'
import { useComments } from '../hooks/useComments';


export const ListComments = ({ projectId }) => {

    const { findByIdProject, comments, isFetching } = useComments();

    useEffect(() => {
        findByIdProject(projectId);
    }, [projectId]);

    return (
        <>
            <div className="flex flex-col space-y-4 mt-3">
                {comments.map(comment => (
                    <Comments key={comment._id} data={comment} />
                ))}
            </div>

        </>
    )
}
