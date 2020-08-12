import React, {useState} from "react";
import axiosClient from "../../config/axios";
import Alert from "../../components/Alert";

export async function getServerSideProps({params}) {
    const response = await axiosClient.get(`api/links/${params.link}`);

    return {
        props: {
            link: response.data
        }
    };
}

export async function getServerSidePaths() {
    const response = await axiosClient.get("/api/links");
    console.log(response)
    return {
        paths: response.data.links.map(link => ({
            params: {link: link.url}
        })),
        fallback: false
    };
}

const Download = ({link}) => {
    const [hasPassword, setHasPassword] = useState(link.password);
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(link.file);
    const [alert, setAlert] = useState(null);

    const validatePassword = async e => {
        e.preventDefault();

        const data = {
            password
        }

        try {
            const response = await axiosClient.post(`/api/links/${link.url}`, data);
            setHasPassword(false);
            setFile(response.data.file);
        } catch (e) {
            console.log(e.response.data.msg);
            setAlert({
                type: "error",
                content: e.response.data.msg
            });
        }
    }

    return (
        <>
            {hasPassword ?
                <>
                    <div className="container mx-auto flex justify-center">
                        <div className="w-full max-w-lg">
                            <p className="mb-5">{link.originalName} is protected by a password</p>
                            <form
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={e => validatePassword(e)}
                            >
                                <div className="mb-4">
                                    <label
                                        className="block text-black text-sm font-bold mb-2"
                                        htmlFor="password"
                                    >Password</label>
                                    <input
                                        type="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none focus:shadow-outline"
                                        id="password"
                                        placeholder="Enter File Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                {alert && <Alert message={alert}/> }
                                <input
                                    type="submit"
                                    className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer rounded"
                                    value="Sign in"
                                />
                            </form>
                        </div>
                    </div>
                </>
                :
                <>
                    <h1 className="text-4xl text-center text-gray-700">Download your file</h1>
                    <div className="flex items-center justify-center mt-10">
                        <a
                            href={`${process.env.backendURL}/api/files/${file}`}
                            className="bg-red-500 text-center px-10 py-3 rounded text-white font-bold text-2xl"
                        >{link.originalName}</a>
                    </div>
                </>
            }
        </>
    );
}

export default Download;