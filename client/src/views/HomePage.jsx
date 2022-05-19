import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

export default function HomePage() {
    return (
        <div className="bg-gray-200 h-screen flex justify-between">

            {/* SIDEBAR */}

            <Sidebar/>

            <div className=" h-full w-[85%]">

            {/* HEADER */}
                
                <Header/>

                {/* BODY */}
                <div className="h-[85%] px-6 pb-3">
                    <div className="bg-white h-full rounded-3xl p-2 shadow-xl">
                        <table className="text-center w-full">
                            <thead>
                                <tr>
                                    <th>TEST</th>
                                    <th>TEST</th>
                                    <th>TEST</th>
                                    <th>TEST</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="border">
                                <tr>
                                    <td>TEST</td>
                                    <td>TEST</td>
                                    <td>TEST</td>
                                    <td>TEST</td>
                                    <td className="border">
                                        <select
                                            name=""
                                            className="w-[50%] text-center rounded-md p-1"
                                        >
                                            <option value="">Active</option>
                                            <option value="">inctive</option>
                                            <option value="">Sold</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button className="bg-green-400 w-[50%] p-1 rounded-md hover:bg-green-500 duration-200">Update</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
