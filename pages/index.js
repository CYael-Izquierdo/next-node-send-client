import React, {useContext, useEffect} from "react";
import Link from "next/link";

import AuthContext from "../context/auth/authContext";
import Dropzone from "../components/Dropzone";
import AppContext from "../context/app/appContext";
import Alert from "../components/Alert";

const Index = () => {

    const {getAuthenticatedUser, token} = useContext(AuthContext);
    const {uploadMessage, url} = useContext(AppContext);

    useEffect(() => {
        if (token) {
            getAuthenticatedUser();
        }
    }, []);

    return (
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
            {url ?
                <div className="text-center">
                    <p className="text-3xl font-bold mb-4 uppercase">Share with your friends</p>
                    <button
                        type="button"
                        className="text-4xl text-white bg-red-500 rounded p-2 inline"
                        onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/links/${url}`)}
                    >{`${process.env.frontendURL}/links/${url}`}</button>
                </div>
                :
                <>
                    {uploadMessage && <Alert message={uploadMessage}/>}

                    <div className="lg:flex lg:flex-no-wrap md:shadow-lg p-5 bg-white rounded-lg py-10">
                        <div className="lg:w-1/2">
                            <Dropzone/>
                        </div>
                        <div className="lg:w-1/2 flex-1 mb-3 mx-2 mt-4 lg:mt-0">
                            <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                                Share files easily and securely
                            </h2>
                            <p className="text-lg leading-loose">
                                <span className="text-red-500 font-bold">ReactNodeSend</span> lets you share files with
                                end-to-end encryption and a link that automatically expires. So you can keep what you
                                share private and make sure your stuff doesn't stay online forever.
                            </p>
                            <Link href="/signin">
                                <a className="text-red-500 font-bold text-lg hover:text-red-700">
                                    Sign in for more benefits
                                </a>
                            </Link>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default Index;

