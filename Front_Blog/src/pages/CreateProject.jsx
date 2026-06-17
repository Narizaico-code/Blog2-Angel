import React from 'react';
import { useForm } from 'react-hook-form';
import { useProjects } from '../hooks/useProject';
import { Navbar } from '../components/Navbar';
import { useState } from 'react';
import { FiPaperclip } from "react-icons/fi";


export const CreateProject = () => {
    const { createProject } = useProjects();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedPhoto, setSelectedPhoto] = useState(null); // Estado para almacenar la foto seleccionada


    const onSubmit = (data) => {
        const { title, description, code, course } = data;
        const image = selectedPhoto;
        console.log(image)
        createProject({ title, image, description, code, course })
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = reader.result;
                setSelectedPhoto(imageData);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Navbar />
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mt-5 mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                    <div className='mb-2'>
                        <input
                            {...register("title", { required: true })}
                            className="title bg-gray-100 border border-gray-300 p-2 w-full outline-none"
                            spellCheck="false"
                            placeholder="Title"
                            type="text"
                        />
                        {errors.title && <p className="text-red-500">Este campo es requerido.</p>}
                    </div>

                    <div className='mb-2'>
                        <input
                            {...register("code", { required: true })}
                            className="bg-gray-100 border border-gray-300 p-2 w-full outline-none"
                            spellCheck="false"
                            placeholder="Page Link"
                            type="text"
                        />
                        {errors.code && <p className="text-red-500">Este campo es requerido.</p>}
                    </div>
                    <div>
                        <textarea
                            {...register("description", { required: true })}
                            className="description bg-gray-100 sec p-3 h-60 border w-full border-gray-300 outline-none"
                            spellCheck="false"
                            placeholder="Describe everything about this post here"
                        />
                        {errors.description && <p className="text-red-500">Este campo es requerido.</p>}
                    </div>
                    <div className='mb-2'>
                        <input
                            {...register("course", { required: true })}
                            className="bg-gray-100 border border-gray-300 p-2 w-full outline-none"
                            spellCheck="false"
                            placeholder="Course"
                            type="text"
                        />
                        {errors.course && <p className="text-red-500">Este campo es requerido.</p>}
                    </div>

                    <div className="icons flex text-gray-500 m-2">
                        <label htmlFor="file-upload" className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-6">
                            <FiPaperclip />
                        </label>
                        <input id="file-upload" type="file"    {...register("photo", {
                            required: "Photo is required",
                            onChange: handleFileChange
                        })} style={{ display: 'none' }} />
                        {errors.photo && <span className="text-red-500">{errors.photo.message}</span>}
                    </div>
                    <div className="buttons flex">
                        <button
                            type="button"
                            className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
