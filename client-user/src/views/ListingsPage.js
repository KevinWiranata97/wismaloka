import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductCardMain from "../components/ProductCardMain";
import { GET_HOUSE } from "../queries/houseQuery";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { useLocation } from "react-router-dom";
export default function ListingsPage() {
  const [houses, setHouses] = useState([]);

  const [totalBedroom, setTotalBedroom] = useState("");
  const [totalBathroom, setTotalBathroom] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const locationPage = useLocation();
  const statePage = locationPage.state;

  useEffect(() => {
    if (statePage) {
      fetchAllHouse(statePage);
    } else {
      fetchAllHouse();
    }
  }, []);

  async function fetchAllHouse(parameter) {
    try {
      if (parameter) {
        setIsLoading(true);
        const { totalBathroom, totalBedroom, price, search, location } =
          parameter;
        var params = new URLSearchParams();
        if (totalBathroom) params.append("totalBathroom", totalBathroom);
        if (totalBedroom) params.append("totalBedroom", totalBedroom);
        if (price) params.append("price", price);
        if (search) params.append("search", search);
        if (location) params.append("location", location);

        var request = {
          params: params,
        };
        // console.log(params);
        const { data } = await axios.get(
          "http://localhost:3001/houses",
          request
        );

        setHouses(data);
        setIsLoading(false);
      } else {
        const { data } = await axios({
          method: "GET",
          url: `http://localhost:3001/houses`,
        });
        setHouses(data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function submitFilter(e) {
    e.preventDefault();
    fetchAllHouse({ totalBedroom, totalBathroom, price, search });
  }

  // const { loading, error, data } = useQuery(GET_HOUSE);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;
  // const houses = data.getHouse;
  // console.log(houses);
  return (
    <>
      <div className="mt-20 border-b-2">
        <Navbar></Navbar>
      </div>
      <div className="mb-3 pt-1 flex-row sticky top-0 bg-white">
        <div className="border-b-2">
          <form onSubmit={submitFilter}>
            <div className="flex flex-wrap mt-3 justify-center">
              <div className="w-1/12 px-3">
                <label
                  className="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="totalBedroom"
                >
                  Bedroom
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white"
                  name="totalBedroom"
                  onChange={(e) => {
                    const value = e.target.value;
                    setTotalBedroom(value);
                  }}
                  value={totalBedroom}
                >
                  <option value={""}>Select</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                </select>
              </div>

              <div className="w-1/12 px-3 mb-6">
                <label
                  className="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="totalBathroom"
                >
                  Bathroom
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white"
                  name="totalBathroom"
                  onChange={(e) => {
                    const value = e.target.value;
                    setTotalBathroom(value);
                  }}
                  value={totalBathroom}
                >
                  <option value={""}>Select</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                </select>
              </div>

              <div className="w-1/6 px-3 mb-6">
                <label
                  className="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="price"
                >
                  Price Range
                </label>
                <input
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white"
                  name="price"
                  placeholder="300.000.000"
                  onChange={(e) => {
                    const value = e.target.value;
                    setPrice(value);
                  }}
                ></input>
              </div>

              <div className="w-2/6 px-3">
                <label
                  className="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="search"
                >
                  Search
                </label>
                <input
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white"
                  name="search"
                  placeholder="e.g. Rumah 3 Lantai di Tangerang"
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);
                  }}
                ></input>
              </div>
              <div className="ml-2 py-5">
                <button
                  type="submit"
                  className="bg-emerald-800 text-white py-1 px-3 rounded-lg"
                >
                  Filter search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-row mx-48">
        <div className="flex-col h-64 py-2 w-1/4 bg-white shadow-lg rounded-lg sticky top-28 mt-5 border">
          <div className="font-bold uppercase">Find In Location</div>
          <div className="border-b mt-3 mb-2"></div>
          <div
            onClick={() => {
              fetchAllHouse({ location: "jakarta" });
            }}
            className="py-1 hover:bg-gray-200 hover:cursor-pointer tracking-wider"
          >
            Jakarta
          </div>
          <div
            onClick={() => {
              fetchAllHouse({ location: "bogor" });
            }}
            className="py-1 hover:bg-gray-200 hover:cursor-pointer tracking-wider"
          >
            Bogor
          </div>
          <div
            onClick={() => {
              fetchAllHouse({ location: "depok" });
            }}
            className="py-1 hover:bg-gray-200 hover:cursor-pointer tracking-wider"
          >
            Depok
          </div>
          <div
            onClick={() => {
              fetchAllHouse({ location: "tangerang" });
            }}
            className="py-1 hover:bg-gray-200 hover:cursor-pointer tracking-wider"
          >
            Tangerang
          </div>
          <div
            onClick={() => {
              fetchAllHouse({ location: "bekasi" });
            }}
            className="py-1 hover:bg-gray-200 hover:cursor-pointer tracking-wider"
          >
            Bekasi
          </div>
          <div
            onClick={() => {
              fetchAllHouse({ location: "bandung" });
            }}
            className="py-1 hover:bg-gray-200 hover:cursor-pointer tracking-wider"
          >
            Bandung
          </div>
        </div>
        <div className="flex-1 flex-col p-5">
          {!isLoading &&
            houses.map((house) => {
              return (
                <ProductCardMain
                  houses={house}
                  key={house.id}
                ></ProductCardMain>
              );
            })}
          {isLoading && (
            <img
              src={require("../assets/loading.gif")}
              alt=""
              className="mx-auto w-32"
            ></img>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
