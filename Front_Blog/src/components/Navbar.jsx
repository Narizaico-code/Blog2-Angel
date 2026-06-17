import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { CgMenuRight } from "react-icons/cg";
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsOpen(false);
            document.body.style.overflow = 'auto';
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleSidebar}></div>}

            <nav className="bg-gray-900 shadow-lg ">
                <div className="max-w-7xl mx-auto h-24 px-4 sm:px-6 lg:px-8 flex justify-between items-center"> {/* Modificado */}
                    <div className="flex-shrink-0">
                        <a href="#" className="text-2xl font-bold text-white">Mi blog</a>
                    </div>
                    <div className="hidden md:block">
                        <ul className="ml-4 flex items-center space-x-9">
                            <li><Link to="/" className="text-white hover:text-teal-500 font-bold text-lg">Inicio</Link></li>
                            <li><Link to="/add" className="text-white hover:text-teal-500 font-bold text-lg">Agregar articulo</Link></li>
                            <li><a href="#" className="text-white hover:text-teal-500 font-bold text-lg">Acerca de</a></li>
                            <li><Link to="" target='_blank' className="text-white hover:text-teal-500 font-bold text-lg">Contacto</Link></li>
                        </ul>
                    </div>
                    <div className="md:hidden">
                        <button type="button" className="text-gray-900 hover:text-blue-500 focus:outline-none focus:text-blue-500" onClick={toggleSidebar}>
                            <CgMenuRight size={24} color='#fff' />
                        </button>
                    </div>
                </div>
                <div ref={sidebarRef} className={`md:hidden fixed inset-y-0 left-0 z-50 transition-transform ease-in-out duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="bg-gray-800 h-full w-64 flex flex-col justify-between">
                        <div className="pt-4 px-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <a href="#" className="text-2xl font-bold text-white ml-4">Mi blog</a>
                                </div>
                                <div>
                                    <button type="button" className="text-white focus:outline-none" onClick={toggleSidebar}>
                                        <IoMdClose size={24} />
                                    </button>
                                </div>
                            </div>
                            <div className="px-2 pt-2 pb-3 mt-8 space-y-1">
                                <Link to="/" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md">Inicio</Link>
                                <Link to="/add" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md">Blog</Link>
                                <a href="#" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md">Acerca de</a>
                                <Link to="" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md">Contacto</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};
