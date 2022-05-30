import React from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LandingFeatured() {
  return (
    <div className="w-2/5 my-auto text-left">
      <p className="text-3xl font-bold tracking-wide mb-3">Finding home</p>
      <div className="flex flex-row mb-5">
        <p className="text-3xl font-bold tracking-wide">as</p>
        <p className="text-emerald-700 mx-2 text-3xl font-bold tracking-wide">
          easy
        </p>
        <p className="text-3xl font-bold tracking-wide">as 1, 2, 3..</p>
      </div>
      <p className="mb-6">
        With the best listings available, and the best agents within our app,
        Your dream home, isn't a dream now. Start exploring your perfect home
        now.
      </p>
      <button className="text-emerald-700 text-xl font-bold p-3 rounded-lg hover:underline">
        <div className="flex flex-row">
          <Link to={"/all"}>
          <p className="mr-3">Find now</p>
          </Link>
          <FaChevronCircleRight className="mt-1" />
        </div>
      </button>
    </div>
  );
}
