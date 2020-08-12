import React, {useContext, useEffect} from "react";
import Link from "next/link";
import AuthContext from "../context/auth/authContext";
import AppContext from "../context/app/appContext";
import {useRouter} from "next/router";

const Header = () => {

    // Routing
    const router = useRouter();

    const {getAuthenticatedUser, logoutUser, user, token} = useContext(AuthContext);
    const {cleanState} = useContext(AppContext)

    useEffect(() => {
        if (token) {
            getAuthenticatedUser();
        }
    }, []);

    const redirect = () => {
        cleanState();
        router.push("/");
    }

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <img
                onClick={redirect}
                className="w-64 mb-8 md:mb-0 cursor-pointer"
                src="/logo.svg"
                alt="React Node Send"
            />

            <div>
                {user ?
                    <div className="flex items-center">
                        <p className="mr-2 bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2">Hi {user.name}</p>
                        <button
                            className="bg-black px-5 py-3 rounded text-white font-bold uppercase"
                            onClick={() => logoutUser()}
                        >Log Out
                        </button>
                    </div>
                    :
                    <>
                        <Link href="/login">
                            <a
                                className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2"
                            >Log In</a>
                        </Link>
                        <Link href="/signin">
                            <a
                                className="bg-black px-5 py-3 rounded text-white font-bold uppercase"
                            >Sign In</a>
                        </Link>
                    </>
                }
            </div>
        </header>
    );
}

export default Header;
