import React, {useCallback, useContext, useState} from "react";
import {useDropzone} from "react-dropzone";
import axiosClient from "../config/axios";
import AppContext from "../context/app/appContext";
import {ClipLoader, MoonLoader} from "react-spinners";
import AuthContext from "../context/auth/authContext";
import Form from "./Form";

const Dropzone = () => {

    const {loading, uploadedFile, uploadFile, removeFile, createLink} = useContext(AppContext);

    const {authenticated, user} = useContext(AuthContext);

    const onDropRejected = () => {
        console.log("rejected")
    }

    const onDropAccepted = useCallback(async (acceptedFiles) => {
        uploadFile(acceptedFiles);
    }, []);

    // Get dropzone content
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDropAccepted, onDropRejected});

    return (
        <div
            className="flex-1 mb-3 mx-2 mt-16 lg:mt-0 items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4 h-full">
            {uploadedFile ?
                <div className="mt-5 w-full">
                    <h4 className="text-2xl font-bold text-center">File</h4>
                    <ul className=" w-full py-5">
                        <li className="bg-white p-3 shadow-lg rounded">
                            <div className="flex flex-row items-center justify-between">
                                <div className="w-5/6">
                                    <p className="font-bold text-xl truncate">{uploadedFile.file.path}</p>
                                    <p className="text-sm text-gray-500">{(uploadedFile.file.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
                                </div>
                                <div className="right-0">
                                    <div className="mx-4 text-2xl">
                                        {loading ?
                                            <ClipLoader
                                                size="1.5rem"
                                                color="#a0aec0"
                                            />
                                            :
                                            <button
                                                className="text-gray-500 cursor-pointer hover:text-gray-700"
                                                onClick={removeFile}
                                            >&#10005;</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                    {
                        authenticated ?
                            <Form/>
                            : null
                    }

                    {!loading &&
                    <button
                        type="button"
                        className="bg-blue-700 w-full py-3 rounded-lg text-white mb-5 hover:bg-blue-800"
                        onClick={() => createLink()}
                    >Create Link</button>
                    }
                </div>
                :
                <div {...getRootProps({className: "dropzone w-full py-32"})}>
                    <input className="h-100" {...getInputProps()}/>
                    <div className="text-center">
                        {isDragActive ?
                            <p className="text-2xl text-center text-gray-600">Drop the file</p>
                            :
                            <>
                                <p className="text-2xl text-center text-gray-600">Drag & Drop the file you want to
                                    share</p>
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default Dropzone;
