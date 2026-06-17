import React from 'react'
import { Card } from '../components/Card'
import { Navbar } from '../components/Navbar'
import { Herosection } from '../components/Herosection'
import { useProjects } from '../hooks/useProject'
import { useEffect } from 'react';
import { Footer } from '../components/Footer'

export const Home = () => {

    const { getProjects, isFetching, projects } = useProjects();
    useEffect(() => {
        getProjects();
    }, []);

    console.log(projects);

    const updateProjects = () => {
        getProjects();
    };


    return (
        <>
            <Navbar />
            <Herosection />
            <div className='bg-neutral-100'>

                <div className="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16">
                    <h1 className='font-bold text-3xl mb-5 text-center'> Articulos </h1>

                    {isFetching ? (
                        <div className="flex items-center h-48 justify-center">
                            <p className="text-gray-500 text-lg ">
                                ¡Oops! Parece que aún no hay artículos. ¡Mantén un ojo aquí para futuras actualizaciones!
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
                                {projects.map(project => (
                                    <Card key={project._id} data={project} updateProjects={updateProjects} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}
