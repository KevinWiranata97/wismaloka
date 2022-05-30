import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard1 from "../components/ProductCard1";
import LandingFeatured from "../components/LandingFeatured";
import Footer from "../components/Footer";
import LandingHero2 from "../components/LandingHero2";
import LandingWhy from "../components/LandingWhy";
import { GET_HOUSE } from "../queries/houseQuery";
import { useQuery } from "@apollo/client";

export default function Homepage() {
  const { loading, error, data } = useQuery(GET_HOUSE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const limit = data.getHouse.slice(0, 3);

  return (
    <>
      <div className="">
        <div className="mt-8 relative mx-8">
          <img
            src={require(`../assets/hero1.png`)}
            className="object-cover shadow-lg rounded-xl"
            alt=""
          ></img>
          <Navbar></Navbar>
          <div className="absolute top-8 container mt-28">
            <div className="flex flex-row">
              <p className="text-5xl ml-auto font-bold tracking-wide mb-4">
                Find a perfect
              </p>
              <p className="text-emerald-400 mr-auto ml-4 text-5xl font-bold tracking-wide">
                home
              </p>
            </div>
            <p className="text-5xl font-bold tracking-wide">just for you.</p>
          </div>
        </div>
        <div className="absolute -mt-28 container mx-10">
          <div className="p-2 bg-white shadow-xl rounded-lg w-1/2 mx-auto">
            <Outlet />
          </div>
        </div>
        <div className="mt-44 border-b-2 pb-12 bg-gray-100 pt-6">
          <p className="text-3xl font-bold mb-7">Featured</p>
          <div className="flex flex-row mx-16">
            {limit.map((data) => (
              <ProductCard1 el={data} key={data.id} />
            ))}
            <LandingFeatured></LandingFeatured>
          </div>
        </div>
        <LandingWhy></LandingWhy>
        <LandingHero2></LandingHero2>
        <Footer></Footer>
      </div>
    </>
  );
}
