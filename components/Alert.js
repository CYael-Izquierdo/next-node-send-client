import React, {useContext} from "react";

import AuthContext from "../context/auth/authContext";
import AppContext from "../context/app/appContext";

const Alert = ({message}) => {

    const {type, content} = message;

    return (
        <div className={`${type === "success" ? "bg-green-500" : "bg-red-500"}  py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto`}>
            {content}
        </div>
    );
}

export default Alert;
