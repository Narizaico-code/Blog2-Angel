import React from 'react';
import herobg from '../assets/img/hero.jpg';
import { ModelAdd } from './ModelAdd';

export const Herosection = () => {
    return (
        <>
            <div className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-5xl font-bold bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text h-14">Hola, Soy Elmer Santos</h1>

                    <p className="mt-4 text-xl text-gray-400">Bienvenido a mi blog aqui pudes hacer tus publicaciones de todo tipo, y contar tus anecdotas como programador.</p>
                    <div className="mt-8">
                        <ModelAdd />
                    </div>
                </div>
            </div>
        </>



    );
};
