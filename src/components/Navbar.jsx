import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from "../constants";

function Navbar() {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const auth = async () => {
            try {
                const token = localStorage.getItem(ACCESS_TOKEN);
                if (token) {
                    setIsAuthorized(true);
                }
            } catch (error) {
                setIsAuthorized(false);
                console.error("Authorization check failed:", error);
            }
        };

        auth();
    }, []); // Empty dependency array to run once on mount

    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-300 p-3">
            {/* <div className="flex items-center flex-shrink-0 text-white mr-6"> */}
                {/* <span className="font-semibold text-xl tracking-tight">Notes App</span> */}
            {/* </div> */}
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-xs lg:flex-grow">
                    {isAuthorized ? (
                        <>
                            <Link to="/my-notes" className="block mt-2 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mx-3">
                                Contemplative
                            </Link>
                            <Link to="/home" className="block mt-2 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mx-3">
                                Practice
                            </Link>
                            <Link to="/logout" className="block mt-2 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mx-3">
                                Logout
                            </Link>
                            <Link to="/" className="block mt-2 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white ml-3">
                                Sanctuary
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="block mt-2 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mx-4">
                                Register
                            </Link>
                            <Link to="/login" className="block mt-2 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mx-4">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
