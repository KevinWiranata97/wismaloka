import React from "react";
import { FaBed, FaShower, FaCommentDots } from "react-icons/fa";

export default function ProductCard1({ el }) {
  return (
    <div className="w-1/5 bg-white rounded-lg shadow-lg mr-10 hover:border-2 hover:border-emerald-800">
      <img src={el.Images[0].image} className="rounded-t-lg" alt=""></img>
      <div className="py-5 px-3 flex flex-col">
        <p className="text-left text-lg font-bold tracking-tight text-emerald-700 mb-3">
          {el.title}
        </p>
        <div className="flex flex-row text-emerald-700">
          <FaBed className="mt-1 mr-2" />
          <p className="mr-3">{el.Specification.totalBedroom}</p>
          <FaShower className="mt-1 mr-2" />
          <p className="mr-3">{el.Specification.totalBedroom}</p>
          <div>{el.price}</div>
        </div>
      </div>
    </div>
  );
}
