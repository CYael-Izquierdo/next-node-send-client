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

const AppReducer = (state, action) => {
    switch (action.type) {
        case UPLOAD_FILE_ERROR:
        case CREATE_LINK_ERROR:
        case SHOW_ALERT:
            return {
                ...state,
                loading: false,
                uploadMessage: {
                    content: action.payload,
                    type: "error"
                }
            };
        case CLEAN_ALERT:
            return {
                ...state,
                uploadMessage: null
            };
        case UPLOAD_FILE:
            return {
                loading: true,
                uploadedFile: {
                    file: action.payload
                }
            };
        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                uploadMessage: null,
                loading: false,
                uploadedFile: {
                    ...state.uploadedFile,
                    name: action.payload
                }
            };
        case REMOVE_UPLOADED_FILE:
            return {
                ...state,
                uploadedFile: null
            };
        case CREATE_LINK:
            return {
                ...state,
                loading: true
            };
        case CREATE_LINK_SUCCESS:
            return {
                ...state,
                url: action.payload,
                loading: false
            };
        case CLEAN_STATE:
            return {
                ...action.payload
            };
        case ADD_PASSWORD:
            return {
                ...state,
                password: action.payload
            };
        case ADD_DOWNLOADS:
            return {
                ...state,
                downloads: action.payload
            };
        default:
            return state;
    }
};

export default AppReducer;
