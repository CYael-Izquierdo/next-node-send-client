import React, {useReducer} from "react"
import AppContext from "./appContext";
import {
    ADD_DOWNLOADS,
    ADD_PASSWORD,
    CLEAN_ALERT, CLEAN_STATE, CREATE_LINK, CREATE_LINK_ERROR, CREATE_LINK_SUCCESS,
    REMOVE_UPLOADED_FILE,
    SHOW_ALERT,
    UPLOAD_FILE,
    UPLOAD_FILE_ERROR,
    UPLOAD_FILE_SUCCESS
} from "../../types";
import AppReducer from "./appReducer";
import axiosClient from "../../config/axios";

const AppState = ({children}) => {

    const initialState = {
        uploadMessage: null,
        uploadedFile: null,
        loading: false,
        downloads: 1,
        password: null,
        url: null
    };

    // create dispatch and state
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Show alert
    const showAlert = msg => {
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 6000);
    };

    // Upload files to server
    const uploadFile = async acceptedFiles => {

        dispatch({
            type: UPLOAD_FILE,
            payload: acceptedFiles[0]
        });

        // Create form data
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);

        try {
            const response = await axiosClient.post("/api/files", formData);

            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: response.data.file
            })
        } catch (e) {
            dispatch({
                type: UPLOAD_FILE_ERROR,
                payload: e.response.data.msg
            });
        }
    };

    const removeFile = () => {
        dispatch({
            type: REMOVE_UPLOADED_FILE
        });
    };

    const createLink = async () => {
        const data = {
            name: state.uploadedFile.name,
            originalName: state.uploadedFile.file.path,
            downloads: state.downloads,
            password: state.password,
        };

        dispatch({
            type: CREATE_LINK
        });

        try {
            const response = await axiosClient.post("/api/links", data);
            dispatch({
                type: CREATE_LINK_SUCCESS,
                payload: response.data.msg
            });
        } catch (e) {
            dispatch({
                type: CREATE_LINK_ERROR,
                payload: e.response.data.msg
            });
        }
    }

    const cleanState = () => {
        dispatch({
            type: CLEAN_STATE,
            payload: initialState
        });
    }

    const setPassword = password => {
        dispatch({
            type: ADD_PASSWORD,
            payload: password
        });
    };

    const setDownloads = quantity => {
        dispatch({
            type: ADD_DOWNLOADS,
            payload: quantity
        });
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                showAlert,
                uploadFile,
                removeFile,
                createLink,
                cleanState,
                setPassword,
                setDownloads
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppState;
