import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="bg-white h-full w-[15%] shadow-xl">
            <div className=" h-[15%] border-b-2 border-black">
                <h1 className="p-10">WISMALOKA</h1>
            </div>
            <div className="h-[85%] space-y-3">
                <Link to={"/"}>
                    <button className="w-full h-[10%] text-left px-5 hover:bg-gray-200 duration-200">
                        ITEMS
                    </button>
                </Link>
                <br />
                <Link to={"/addNewPost"}>
                    <button className="w-full h-[10%] text-left px-5 hover:bg-gray-200 duration-200">
                        ADD NEW ITEMS
                    </button>
                </Link>
            </div>
        </div>
    );
}
