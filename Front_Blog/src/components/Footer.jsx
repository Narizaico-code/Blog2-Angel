import React from 'react'
import { SiInstagram } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


export const Footer = () => {
    return (
        <footer
            className="flex flex-col items-center  text-center text-surface bg-gray-900">
            <div className="container pt-4">
                <div className="mb-6 flex justify-center space-x-2">
                    <a
                        href=""
                        type="button"
                        className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-200 ease-in-out hover:bg-[#0866FF] focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
                        data-twe-ripple-init>
                        <FaFacebookF size={24} />
                    </a>
                    <a
                        href=""
                        type="button"
                        className="rounded-full  bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-200 ease-in-out hover:bg-gradient-to-r from-fuchsia-700 to-yellow-500 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
                        data-twe-ripple-init>
                        <SiInstagram size={24} />

                    </a>
                    <a
                        href=""
                        type="button"
                        className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-200 ease-in-out hover:bg-[#010409] focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
                        data-twe-ripple-init>
                        <FaGithub size={24} />
                    </a>

                </div>
            </div>

            <div className="w-full text-white p-6 text-center">
                © 2026 Copyright:
                <a href="/"> Elmer Santos</a>
            </div>
        </footer>
    )
}
