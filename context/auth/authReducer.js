import {
    AUTHENTICATED_USER,
    CLEAN_ALERT,
    LOGIN_ERROR,
    LOGIN_SUCCESSFUL, LOGOUT_USER,
    SIGNIN_ERROR,
    SIGNIN_SUCCESSFUL
} from "../../types";

const authReducer = (state, action) => {
    switch (action.type) {
        case SIGNIN_SUCCESSFUL:
            return {
                ...state,
                message: {
                    content: action.payload,
                    type: "success"
                }
            };
        case LOGIN_SUCCESSFUL:
            localStorage.setItem("token", action.payload);
            return {
                ...state,
                token: action.payload,
                authenticated: true
            };
        case LOGIN_ERROR:
        case SIGNIN_ERROR:
            return {
                ...state,
                message: {
                    content: action.payload,
                    type: "error"
                }
            };
        case CLEAN_ALERT:
            return {
                ...state,
                message: null
            };
        case AUTHENTICATED_USER:
            return {
                ...state,
                user: action.payload
            };
        case LOGOUT_USER:
            localStorage.removeItem("token");
            return {
                ...state,
                user: null,
                token: null,
                authenticated: false,
            }
        default:
            return state;
    }
}

export default authReducer;
