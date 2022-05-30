import React, { useEffect, useState } from "react";
import ProductCard2 from "../components/ProductCard2";
import { FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USERS_BY_ID } from "../queries/houseQuery";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function AgentAssets() {
  const idUser = localStorage.id;
  const isPremium = localStorage.isPremium;

  // const { loading, error, data } = useQuery(GET_USERS_BY_ID, {
  //   variables: {
  //     getOneUserId: idUser,
  //   },
  // });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :( </p>;

  const [dataHouse, setIsDataHouse] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/houses?userId=${idUser}`)
      .then((response) => response.json())
      .then((data) => setIsDataHouse(data));
  }, [dataHouse]);

  const limit = dataHouse.slice(0, 3);
  function doDelete(id) {
    return fetch(`http://localhost:3001/houses/${id}`, {
      method: "DELETE",
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then((response) => response.json())
      .then(() =>
        fetch(`http://localhost:3001/houses?userId=${idUser}`)
          .then((response) => response.json())
          .then((data) => setIsDataHouse(data))
      )
      .then(() => toast.success("Successfully deleted"))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Toaster />
      <div className="flex-1">
        <div className="mx-5 mt-10 flex flex-row justify-start">
          <Link
            to={""}
            className="bg-gray-100 rounded-t-lg text-sm text-gray-700 py-1 px-3 mr-1"
          >
            My Assets
          </Link>
          {isPremium && dataHouse.length !== 3 && (
            <Link
              to={"add"}
              className="bg-gray-200 rounded-t-lg text-sm text-gray-700 py-1 px-3 mr-1"
            >
              Add New Assets
            </Link>
          )}
        </div>
        <div className="bg-gray-100 rounded py-5 px-14 mb-5 shadow">
          <p className="text-xl font-bold tracking-wide mb-4">List of Assets</p>
          {isPremium === "false" &&
            limit.map((el) => (
              <ProductCard2
                key={el.id}
                houses={el}
                functionDelete={doDelete}
              ></ProductCard2>
            ))}
          {isPremium === "true" &&
            dataHouse.map((el) => (
              <ProductCard2
                key={el.id}
                houses={el}
                functionDelete={doDelete}
              ></ProductCard2>
            ))}
          {/* <ProductCardMain></ProductCardMain> */}
          {isPremium === "false" && (
            <div>
              <p className="text-xl font-bold text-emerald-700 tracking-wide mt-14 mb-3">
                Regular user can only have 3 live assets.
              </p>
              <p className="mb-1">
                To be able to display more than 3 assets, and add more than 3
                assets,
              </p>
              <p className="mb-3">Try Premium</p>
              <button className="border shadow border-yellow-500 py-2 px-3 rounded-lg text-yellow-500 hover:bg-yellow-400 hover:text-white">
                <div className="flex flex-row justify-center">
                  <FaCrown className="mt-1 mr-2" />
                  <p className="font-bold">Go Premium</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
