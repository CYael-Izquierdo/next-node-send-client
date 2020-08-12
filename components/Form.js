import React, {useContext, useState} from "react";
import AppContext from "../context/app/appContext";

const Form = () => {

    const [isPasswordChecked, setIsPasswordChecked] = useState(false);
    const {setPassword, setDownloads} = useContext(AppContext);

    return (
        <div className="w-full">
            <div className="mb-5">
                <label className="text-lg text-gray-800">Delete after:</label>
                <select
                    className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                    onChange={e => setDownloads(parseInt(e.target.value))}
                    defaultValue=""
                >
                    <option value="" disabled>-- Select --</option>
                    <option value="1">1 Download</option>
                    <option value="5">5 Downloads</option>
                    <option value="10">10 Downloads</option>
                    <option value="20">20 Downloads</option>
                </select>
            </div>

            <div className="mb-5">
                <label className="text-lg text-gray-800 mr-5">Protect with Password</label>
                <input
                    type="checkbox"
                    onChange={e => {
                        setIsPasswordChecked(e.target.checked)
                        setPassword(null);
                    }}
                />
                {isPasswordChecked &&
                <input
                    className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />}
            </div>
        </div>
    );
}

export default Form;
