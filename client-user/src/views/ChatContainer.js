import React from "react";
import UserProfile from "../components/UserProfile";
import { BsArrowLeft } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";


export default function ChatContainer() {

  return (
    <div className="bg-emerald-50 h-screen p-10">
      <div className="bg-white h-full rounded-lg flex flex-row shadow">
        <div className="flex flex-col w-1/3">
          <div className="bg-gray-100 border-r-2 h-14 flex flex-row p-3 justify-start items-center">
            <Link
              to={"/"}
              className="bg-gray-50 p-2 rounded-lg flex flex-row font-bold text-emerald-700 hover:bg-emerald-700 hover:text-white"
            >
              <BsArrowLeft className="mt-1 mr-2" />
              <div>Back To Home</div>
            </Link>
          </div>
          <div className="flex-1 flex flex-col border-r-2">
            <UserProfile></UserProfile>
          </div>
        </div>
      <Outlet></Outlet>
      </div>
    </div>
  );
}
