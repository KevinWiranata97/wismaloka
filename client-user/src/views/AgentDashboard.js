import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaCrown } from "react-icons/fa";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_HOUSE_BY_ID, GET_USERS_BY_ID } from "../queries/houseQuery";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { Toaster } from "react-hot-toast";

export default function AgentDashboard() {
  const idUser = localStorage.id;
  const isPremium = localStorage.isPremium;
  const [isOpen, setIsOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_USERS_BY_ID, {
    variables: {
      getOneUserId: idUser,
    },
  });

  if (loading)
    return (
      <div className="w-48 p-5 mx-auto mt-20">
        <img
          src={require("../assets/loading.gif")}
          alt=""
          className="mx-auto w-24"
        ></img>
      </div>
    );
  if (error) return <p>Error :( </p>;
  // console.log(data);

  function premiumButton() {
    setIsOpen(true);
  }

  function submitPremium(e) {
    e.preventDefault();

    goPremium();
  }

  async function goPremium() {
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/payment",
        headers: {
          access_token: localStorage.access_token,
        },
      });
      // console.log(data);
      const paymentLink = data.redirect_url;
      // console.log(paymentLink);
      setTimeout(() => {
        window.location.href = paymentLink;
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Toaster />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto mx-w-sm rounded bg-white p-10">
            <Dialog.Title className="text-center text-2xl font-bold text-yellow-400">
              Go Premium
            </Dialog.Title>
            <div className="flex flex-row justify-between gap-8 mt-8">
              <div className="flex flex-col mx-1 text-center">
                <p className="text-lg font-bold text-gray-500 mb-3">
                  Regular User
                </p>
                <p className="mb-2">3 Live Listings</p>
                <p className="mb-2">Cannot add more than 3 listings</p>
                <p className="mb-2">No chance of featured listings</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="border border-gray-700 text-gray-700 rounded-lg shadow py-3 mt-8"
                >
                  Stays Regular
                </button>
              </div>
              <div className="border-r"></div>
              <div className="flex flex-col ml-8 mr-3 text-center">
                <p className="text-lg font-bold text-yellow-500 mb-3">
                  Premium User
                </p>
                <p className="mb-2">Unlimited Live Listings</p>
                <p className="mb-2">Add more than 3 listings</p>
                <p className="mb-2">Chance of featured listings</p>
                <button
                  className="bg-yellow-500 py-3 w-full rounded-lg text-white hover:bg-yellow-400 hover:text-white mt-8"
                  onClick={submitPremium}
                >
                  <div className="flex flex-row justify-center">
                    <FaCrown className="mt-1 mr-2" />
                    <p className="font-bold">Go Premium</p>
                  </div>
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <div className="mt-20 border-b-2">
        <Navbar></Navbar>
      </div>
      <div className="mx-20">
        <div className="flex flex-row">
          {/* Page Main */}
          <Outlet />
          {/* -- Agent Detail Card -- */}
          <div className="w-1/4 mt-10">
            <div className="bg-white border m-4 p-4 rounded-lg shadow flex flex-col sticky top-4">
              <p className="font-bold mb-2">Agent Detail</p>
              <div className="border-b-2"></div>
              <div className="flex flex-row my-5">
                <img
                  src={data.getOneUser.profilePict}
                  className="h-12 w-12 rounded-full p-1 bg-gray-100"
                  alt=""
                ></img>
                <div className="flex flex-col text-left ml-3 my-auto">
                  <p className="font-semibold">{data.getOneUser.username}</p>
                  <p className="text-sm">{data.getOneUser.role}</p>
                </div>
              </div>
              <div className="flex flex-row justify-between mb-3">
                <p className="text-sm">Email</p>
                <p className="text-sm">{data.getOneUser.email}</p>
              </div>
              <div className="flex flex-row justify-between mb-10">
                <p className="text-sm">Phone Number</p>
                <p className="text-sm">{data.getOneUser.phoneNumber}</p>
              </div>
              {isPremium === "false" && (
                <button
                  className="border border-yellow-500 py-2 w-full rounded-lg text-yellow-500 hover:bg-yellow-400 hover:text-white"
                  onClick={premiumButton}
                >
                  <div className="flex flex-row justify-center">
                    <FaCrown className="mt-1 mr-2" />
                    <p className="font-bold">Go Premium</p>
                  </div>
                </button>
              )}
              {isPremium === "true" && (
                <div className="text-lg text-gray-500 flex flex-row justify-center">
                  <FaCrown className="mr-2 mt-1" />
                  <p>Premium Member</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
