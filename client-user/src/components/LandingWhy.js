import React from "react";
import { FaSearchLocation, FaDollarSign, FaBolt } from "react-icons/fa";

export default function LandingWhy() {
  return (
    <div className="mb-24 mt-16">
      <p className="text-2xl font-bold tracking-wide">Why choose Wismaloka ?</p>
      <div className="flex flex-row justify-around mt-16 mx-10">
        <div className="w-1/6 container mx-10">
          <FaSearchLocation className="mx-auto text-5xl text-emerald-700" />
          <p className="text-xl font-bold tracking-wide text-emerald-700 mt-6">
            Eazy to find
          </p>
          <p className="mt-8">It is eazy to search for your next dream house</p>
        </div>

        <div className="h-52 border-l-2 p-2"></div>

        <div className="w-1/6 container mx-10">
          <FaDollarSign className="mx-auto text-5xl text-emerald-700" />
          <p className="text-xl font-bold tracking-wide text-emerald-700 mt-6">
            Affordable Price
          </p>
          <p className="mt-8">
            No need to worry! Here in wismaloka, you can find your dream home
            with affordable price
          </p>
        </div>

        <div className="h-52 border-l-2 p-2"></div>

        <div className="w-1/6 container mx-10">
          <FaBolt className="mx-auto text-5xl text-emerald-700" />
          <p className="text-xl font-bold tracking-wide text-emerald-700 mt-6">
            Fast
          </p>
          <p className="mt-8">
            Like a home? Just click it and message the property owner. We
            guarantee you to have a reply immediately
          </p>
        </div>
      </div>
    </div>
  );
}
