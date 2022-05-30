import React from "react";

export default function Footer() {
  return (
    <div className="w-full bg-slate-800 pb-4">
      <div className="flex flex-row">
        <div className="w-1/3">
          <img
            src={require("../assets/logotextw.png")}
            alt=""
            className="object-cover mx-auto"
            width={150}
          ></img>
          <p className="text-gray-400 -mt-12">
            Find a perfect home just for you.
          </p>
        </div>
        <div className="flex-1 flex flex-row w-full justify-around mt-12">
          <div className="flex flex-col">
            <p className="text-gray-300 font-bold tracking-wide">Services</p>
            <p className="text-left text-gray-500 tracking-wider mt-4">
              Listings
            </p>
            <p className="text-left text-gray-500 tracking-wider mt-1">
              For Agents
            </p>
            <p className="text-left text-gray-500 tracking-wider mt-1">
              Search By Budget
            </p>
            <p className="text-left text-gray-500 tracking-wider mt-1">
              Search By Location
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-300 font-bold tracking-wide">About</p>
            <p className="text-left text-gray-500 tracking-wider mt-4">
              Team Members
            </p>
            <p className="text-left text-gray-500 tracking-wider mt-1">FAQ</p>
            <p className="text-left text-gray-500 tracking-wider mt-1">
              How We Work
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-300 font-bold tracking-wide">
              Connect With Us
            </p>
            <p className="text-left text-gray-500 tracking-wider mt-4">Links</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <p className="text-gray-500 tracking-wider">2022 &copy; Wismaloka</p>
      </div>
    </div>
  );
}
