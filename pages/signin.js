import React, {useContext} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import AuthContext from "../context/auth/authContext";
import Alert from "../components/Alert";

const Signin = () => {

    // access to authState
    const {signInUser, message} = useContext(AuthContext);

    // Form and validation with formik/yup
    const formik = useFormik({
       initialValues: {
           name: "",
           email: "",
           password: ""
       },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("User name is required"),
            email: Yup.string()
                .email("Invalid email")
                .required("User email address is required"),
            password: Yup.string()
                .min(6, "The password must have at least 6 characters")
                .required("Password is required")
        }),
        onSubmit: values => {
            signInUser(values)
        }
    });
    const {name, email, password} = formik.values;

    return (
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
            <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
                Sign In
            </h2>

            {message && <Alert message={message}/>}

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                        noValidate
                    >
                        {/* NAME FIELD */}
                        <div className="mb-4">
                            <label
                                className="block text-black text-sm font-bold mb-2"
                                htmlFor="name"
                            >Name</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none focus:shadow-outline"
                                id="name"
                                placeholder="Your name"
                                value={name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name ?
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.name}</p>
                                </div> : null
                            }
                        </div>
                        {/* EMAIL FIELD */}
                        <div className="mb-4">
                            <label
                                className="block text-black text-sm font-bold mb-2"
                                htmlFor="email"
                            >Email Address</label>
                            <input
                                type="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none focus:shadow-outline"
                                id="email"
                                placeholder="Your email address"
                                autoComplete="email"
                                value={email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ?
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div> : null
                            }
                        </div>
                        {/* PASSWORD FIELD */}
                        <div className="mb-4">
                            <label
                                className="block text-black text-sm font-bold mb-2"
                                htmlFor="password"
                            >Password</label>
                            <input
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none focus:shadow-outline"
                                id="password"
                                placeholder="Your password"
                                autoComplete="new-password"
                                value={password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div> : null
                            }
                        </div>

                        <input
                            type="submit"
                            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer rounded"
                            value="Sign in"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signin;
