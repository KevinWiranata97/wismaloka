import React from "react";
import Navbar from "../components/Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Footer from "../components/Footer";
import { FaCommentDots } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { GET_HOUSE_BY_ID } from "../queries/houseQuery";
import { useQuery } from "@apollo/client";
export default function DetailPage() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_HOUSE_BY_ID, {
    variables: { getOneHouseId: id },
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
  if (error) return <p>Error :(</p>;
  const house = data.getOneHouse;
  console.log(house);
  let number = +house.price;
  let instalment = +house.instalment;
  const price = number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  instalment = instalment.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  function chatting(id) {
    const userId = localStorage.getItem("id");
    if (!userId) {
      console.log("belum login");
    } else {
      var roomName;
      if (userId < id) {
        roomName = "chat_" + id + "_" + userId;
      } else {
        roomName = "chat_" + userId + "_" + id;
      }

      Navigate(`/chat/${roomName}`);
    }
  }
  return (
    <>
      <div className="mt-20 border-b-2">
        <Navbar></Navbar>
      </div>
      <div className="mt-10 mx-24">
        <div className="text-left mb-5">
          <p className="text-2xl font-bold tracking-wide mb-5">{house.title}</p>
          <p className="text-lg">{house.location}</p>
        </div>
        <div className="w-full">
          <Carousel showArrows={true} autoPlay={3000} infiniteLoop={true}>
            {house.Images.map((image) => (
              <div className="h-[650px]">
                <img
                  src={image.image}
                  alt="image"
                  className="h-full object-cover"
                ></img>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex flex-row mb-10">
          <div className="flex-1 text-left">
            <p className="text-2xl font-bold tracking-wide mb-5">
              Property Information
            </p>
            <div className="flex flex-row mb-8">
              <div className="flex flex-col mr-20">
                <p className="text-gray-500 mb-2">Price</p>
                <p className="text-gray-500 mb-2">Luas Tanah</p>
                <p className="text-gray-500 mb-2">Luas Bangunan</p>
                <p className="text-gray-500 mb-2">Bedroom</p>
                <p className="text-gray-500 mb-2">Bathroom</p>
              </div>
              <div className="flex flex-col w-48 px-2 bg-gray-100 mr-2">
                <p className="mb-2">{price}</p>
                <p className="mb-2">{house.Specification.luasTanah} m2</p>
                <p className="mb-2">{house.Specification.luasBangunan} m2</p>
                <p className="mb-2">{house.Specification.totalBedroom}</p>
                <p className="mb-2">{house.Specification.totalBathroom}</p>
              </div>
              <div className="flex flex-col mr-20">
                <p className="text-gray-500 mb-8">Sertifikat</p>
                <p className="text-gray-500 mb-2">Daya Listrik</p>
                <p className="text-gray-500 mb-2">Cicilan</p>
              </div>
              <div className="flex flex-col w-48 px-2 bg-gray-100">
                <p className="mb-2">{house.Specification.certificate}</p>
                <p className="mb-2">{house.Specification.dayaListrik} watt</p>
                <p className="mb-2">{instalment}</p>
              </div>
            </div>
            <div className="border-b-2"></div>
            <p className="text-2xl font-bold tracking-wide my-5">Description</p>
            <div className="bg-gray-100 w-5/6 p-2 mb-10">
              <p>{house.description}</p>
            </div>
            <div className="border-b-2"></div>
            <p className="text-2xl font-bold tracking-wide my-5">
              Location Map
            </p>
            <div className="bg-gray-100 w-5/6 h-96 p-2 mb-10">
              <img
                alt=""
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+502486(${house.longitude},${house.latitude})/${house.longitude},${house.latitude},13,0/400x300?access_token=pk.eyJ1IjoiYmF5cHVuayIsImEiOiJjbDNmbWkxdGwwazc4M2NvNHdleDZrZXI2In0.AripD-1j1dEgfKyBBT1eQg`}
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="w-1/3 flex">
            <div className="flex flex-col p-4 w-full">
              <div className="sticky top-12 border p-4">
                <div className="text-2xl font-bold text-emerald-700 mb-5">
                  {price}
                </div>
                <div className="border-b-2"></div>
                <div className="flex flex-row my-5">
                  <img
                    src={require("../assets/hero1.png")}
                    className="h-12 w-12 rounded-full p-1 bg-gray-100"
                    alt=""
                  ></img>
                  <div className="flex flex-col text-left ml-3 my-auto">
                    <p className="font-semibold">{house.User.username}</p>
                    <p className="text-sm">{house.User.role}</p>
                  </div>
                </div>
                <div className="text-left mb-12">
                  <p>Wants to know more about this property?</p>
                  <p>Or want to schedule a meeting?</p>
                  <p>Contacts agent below</p>
                </div>
                <div>
                  <button
                    onClick={() => chatting(house.userId)}
                    className="border border-emerald-800 py-3 w-full rounded-lg text-emerald-700 hover:bg-emerald-700 hover:text-white"
                  >
                    <div className="flex flex-row justify-center">
                      <FaCommentDots className="mt-1 mr-2" />
                      <p className="font-bold">Chat Now</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
