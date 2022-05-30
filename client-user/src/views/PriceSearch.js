import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PriceSearch() {
  const [totalBedroom, setTotalBedroom] = useState("");
  const [totalBathroom, setTotalBathroom] = useState("");
  const [price, setPrice] = useState("");
  const Navigate = useNavigate();

  function searchListing(e) {
    e.preventDefault();
    const options = {
      state: {},
    };
    if (totalBathroom) {
      options.state = {
        ...options.state,
        totalBathroom,
      };
    }
    if (totalBedroom) {
      options.state = {
        ...options.state,
        totalBedroom,
      };
    }
    if (price) {
      options.state = {
        ...options.state,
        price,
      };
    }
    Navigate("/all", options);
  }
  return (
    <>
      <div className="flex flex-row justify-around">
        <Link
          to={""}
          className="w-full py-3 border-b-4 border-r-2 border-b-emerald-700 hover:bg-emerald-50 hover:cursor-pointer"
        >
          <div>
            <p className="text-emerald-700 text-lg font-bold">
              Based on budget
            </p>
          </div>
        </Link>
        <Link
          to={"maps"}
          className="w-full py-3 border-b-2 hover:bg-emerald-50 hover:cursor-pointer"
        >
          <div>
            <p className="text-emerald-700 text-lg font-bold">
              Based on location
            </p>
          </div>
        </Link>
      </div>
      <div>
        <form onSubmit={searchListing}>
          <div className="flex flex-wrap my-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="totalBedroom"
              >
                Numbers Bedroom
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="totalBedroom"
                type="number"
                placeholder="e.g. 4"
                onChange={(e) => {
                  const value = e.target.value;
                  setTotalBedroom(value);
                }}
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="totalBathroom"
              >
                Numbers Bathroom
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="totalBathroom"
                type="number"
                placeholder="e.g. 2"
                onChange={(e) => {
                  const value = e.target.value;
                  setTotalBathroom(value);
                }}
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="price"
                type="number"
                placeholder="e.g. 200.000.000"
                onChange={(e) => {
                  const value = e.target.value;
                  setPrice(value);
                }}
              />
            </div>
          </div>
          <div className="mx-4 mb-6">
            <button className="w-full bg-emerald-800 text-white p-3 rounded-lg">
              Find your ideal home
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
