import React, {useReducer} from "react";
import {useRouter} from "next/router";

import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
    AUTHENTICATED_USER,
    CLEAN_ALERT,
    LOGIN_ERROR,
    LOGIN_SUCCESSFUL, LOGOUT_USER,
    SIGNIN_ERROR,
    SIGNIN_SUCCESSFUL
} from "../../types";
import axiosClient from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({children}) => {

    const router = new useRouter();

    // Initial state
    const initialState = {
        token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
        authenticated: typeof window !== "undefined" ? !!localStorage.getItem("token") : null,
        user: null,
        message: null
    }

    // Define reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Sign in new user
    const signInUser = async data => {
        try {
            const response = await axiosClient.post("/api/users", data);
            await router.push("/login");
            dispatch({
                type: SIGNIN_SUCCESSFUL,
                payload: response.data.msg
            });
        } catch (e) {
            dispatch({
                type: SIGNIN_ERROR,
                payload: e.response.data.msg
            });
        }

        // Clean alert after 3sec
        setTimeout(() => {
            dispatch({type: CLEAN_ALERT})
        }, 5000)
    }

    // Log in user
    const loginUser = async data => {
        try {
            const response = await axiosClient.post("/api/auth", data);
            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: response.data.token
            });
        } catch (e) {
            dispatch({
                type: LOGIN_ERROR,
                payload: e.response.data.msg
            });
        }

        // Clean alert after 3sec
        setTimeout(() => {
            dispatch({type: CLEAN_ALERT})
        }, 5000)
    }

    // Authenticated user
    const getAuthenticatedUser = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            tokenAuth(token);

            try {
                const response = await axiosClient.get("/api/auth");
                dispatch({
                    type: AUTHENTICATED_USER,
                    payload: response.data.user
                });
            } catch (e) {
                dispatch({
                    type: LOGOUT_USER,
                })
            }
        }
    };

    const logoutUser = () => {
        localStorage.removeItem("token");
        dispatch({
            type: LOGOUT_USER
        })
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                getAuthenticatedUser,
                signInUser,
                loginUser,
                logoutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthState;
