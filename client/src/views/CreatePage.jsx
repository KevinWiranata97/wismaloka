import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

export default function CreatePage() {
    return (
        <div className="bg-gray-200 h-screen flex justify-between">
            {/* SIDEBAR */}

            <Sidebar />

            <div className=" h-full w-[85%]">
                {/* HEADER */}

                <Header />

                {/* BODY */}
                <div className="h-[85%] px-6 pb-3">
                    <div className="bg-white h-full rounded-3xl p-2 shadow-xl">
                        {/* FIRST FIELD */}
                        <div className="h-[20%] flex justify-between items-center px-5">
                            <div className="text-left w-[50%] space-y-1">
                                <label>Name</label>
                                <br />
                                <input
                                    type="text"
                                    className="w-[90%] rounded-lg bg-gray-100 p-1"
                                />
                            </div>
                            <div className="text-left w-[50%] space-y-1">
                                <label>Price</label>
                                <br />
                                <input
                                    type="text"
                                    className="w-[90%] rounded-lg bg-gray-100 p-1"
                                />
                            </div>
                            <div className="text-left w-[50%] space-y-1">
                                <label>Alamat</label>
                                <br />
                                <input
                                    type="text"
                                    className="w-full rounded-lg bg-gray-100 p-1"
                                />
                            </div>
                        </div>

                        {/* SECOND FIELD */}
                        <div className="h-[20%] flex justify-between items-center px-5">
                            <div className="text-left w-full space-y-1 h-full ">
                                <label>Description</label>
                                <br />
                                <textarea
                                    name=""
                                    className="w-full bg-gray-100"
                                ></textarea>
                            </div>
                        </div>

                        {/* THIRD FIELD */}
                        <div className="h-[53%] flex px-5">
                            {/* GOOGLE MAPS */}
                            <div className="bg-lime-200 h-full w-[50%] flex justify-center items-center">
                                <h1>GOOGLE MAPS</h1>
                            </div>

                            <div className="h-full w-[50%] flex ">
                                {/* FOURTH FIELD */}
                                <div className="h-full w-[50%] text-left px-1">
                                    <div className="h-[33%]">
                                        <label>Luas Tanah</label>
                                        <br />
                                        <input
                                            type="text"
                                            className="w-full rounded-lg bg-gray-100 p-1"
                                        />
                                    </div>
                                    <div className="h-[33%]">
                                        <label>Luas Bangunan</label>
                                        <br />
                                        <input
                                            type="text"
                                            className="w-full rounded-lg bg-gray-100 p-1"
                                        />
                                    </div>
                                    <div className="h-[33%]">
                                        <label>Sertifikat</label>
                                        <br />
                                        <input
                                            type="text"
                                            className="w-full rounded-lg bg-gray-100 p-1"
                                        />
                                    </div>
                                </div>

                                {/* FIFTH FIELD */}
                                <div className="h-full w-[50%] text-left pl-1">
                                    <div className="h-[33%]">
                                        <label>Total Kamar</label>
                                        <br />
                                        <input
                                            type="text"
                                            className="w-full rounded-lg bg-gray-100 p-1"
                                        />
                                    </div>
                                    <div className="h-[33%]">
                                        <label>Total Kamar Mandi</label>
                                        <br />
                                        <input
                                            type="text"
                                            className="w-full rounded-lg bg-gray-100 p-1"
                                        />
                                    </div>
                                    <div className="h-[33%]">
                                        <label>Daya Listrik</label>
                                        <br />
                                        <input
                                            type="text"
                                            className="w-full rounded-lg bg-gray-100 p-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <div className="h-[7%] px-96 pt-1">
                            <button className="w-full h-full bg-green-500 rounded-lg hover:bg-green-600 duration-150">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
