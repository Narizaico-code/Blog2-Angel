import React from 'react';
import { useForm } from 'react-hook-form';
import { useComments } from '../hooks/useComments';

export const CommentForm = ({ projectID }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createComment } = useComments();

    const onSubmit = (data) => {
        console.log(data)
        const { content, authorName } = data;

        createComment({ content, projectID, authorName })
        reset()
    };

    return (
        <>
            <h2 className="text-lg font-bold mb-4">Comments</h2>
            <div className="flex flex-col space-y-4">
                <form className="bg-white p-4 rounded-xl shadow-lg" onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                    <h3 className="text-lg font-bold mb-2">Add a comment</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="authorName"
                            type="text"
                            placeholder="Enter your name"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.authorName ? 'border-red-500' : ''}`}
                            {...register("authorName", { required: true })}
                        />
                        {errors.authorName && <p className="text-red-500 text-xs font-semibold mt-1">Name is required</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="comment">
                            Comment
                        </label>
                        <textarea
                            id="content" rows="3"
                            placeholder="Enter your comment"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.content ? 'border-red-500' : ''}`}
                            {...register("content", { required: true })}
                        ></textarea>
                        {errors.content && <p className="text-red-500 text-xs font-semibold mt-1">Comment is required</p>}
                    </div>
                    <button
                        className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};
