import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_HOUSE } from "../queries/houseQuery";
import MapSearch from "../components/MapSearch";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";

export default function LocationSearch() {
  const [isLoadingPred, setIsLoadingPred] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [totalBedroom, setTotalBedroom] = useState();
  const [totalBathroom, setTotalBathroom] = useState();

  const price = +prediction;
  const priceFormat = price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const doPopulate = (coordinates) => {
    console.log("Lng:", coordinates.lng, "Lat:", coordinates.lat);
    setLongitude(coordinates.lng);
    setLatitude(coordinates.lat);
  };

  function changeInputHandler(e) {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case "longitude":
        setLongitude(value);
        break;
      case "latitude":
        setLatitude(value);
        break;
      case "totalBedroom":
        setTotalBedroom(value);
        break;
      case "totalBathroom":
        setTotalBathroom(value);
        break;
      default:
        break;
    }
  }

  function submitPredict(e) {
    e.preventDefault();
    let dataBody = {
      longitude: longitude.toString(),
      latitude: latitude.toString(),
      totalBedroom,
      totalBathroom,
    };

    predict(dataBody);
  }

  async function predict(dataBody) {
    try {
      setIsLoadingPred(true);
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3040/predict",
        data: dataBody,
      });
      setIsLoadingPred(false);
      setPrediction(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const { loading, error, data } = useQuery(GET_HOUSE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <MapSearch data={data} populateFunction={doPopulate}></MapSearch>
      <Link
        to={"/"}
        className="w-16 absolute top-5 left-5 bg-white text-emerald-700 shadow-lg p-3 rounded-lg hover:bg-emerald-800 hover:text-white"
      >
        <BiArrowBack className="text-2xl mx-auto" />
      </Link>
      <div className="p-4 absolute bottom-1 w-full">
        <div className="bg-white shadow-lg w-1/2 mx-auto p-2 flex flex-col rounded-lg">
          {(prediction || isLoadingPred) && (
            <div className="mb-3 text-lg font-bold flex flex-row justify-center">
              <p>Market Price Estimation:</p>
              {isLoadingPred && (
                <img
                  src={require("../assets/loading.gif")}
                  className="w-8 ml-3"
                ></img>
              )}
              {!isLoadingPred && <p className="ml-3">{priceFormat}</p>}
            </div>
          )}
          <form onSubmit={submitPredict}>
            <div className="flex flex-row">
              <input
                type="text"
                onChange={changeInputHandler}
                value={longitude}
                name="longitude"
                placeholder="Longitude"
                className="block border rounded-lg p-1 w-1/6 mr-3"
              ></input>
              <input
                type="text"
                onChange={changeInputHandler}
                value={latitude}
                name="latitude"
                placeholder="Latitude"
                className="block border rounded-lg p-1 w-1/6 mr-3"
              ></input>
              <input
                type="number"
                onChange={changeInputHandler}
                placeholder="Bedrooms"
                value={totalBedroom}
                name="totalBedroom"
                className="block border rounded-lg p-1 w-1/6 mr-3"
              ></input>
              <input
                type="number"
                onChange={changeInputHandler}
                placeholder="Bathrooms"
                value={totalBathroom}
                name="totalBathroom"
                className="block border rounded-lg p-1 w-1/6 mr-3"
              ></input>
              <button
                type="submit"
                className="border rounded-lg p-1 w-1/3 bg-emerald-700 text-white"
              >
                See market price
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="absolute">
        <div className="flex flex-wrap my-6 mx-4 rounded-lg shadow"></div>
        <form>
          <div className="mx-4 mb-6">
            <button className="w-full bg-emerald-800 text-white p-3 rounded-lg">
              Find homes near you
            </button>
          </div>
        </form>
      </div> */}
    </>
  );
}
