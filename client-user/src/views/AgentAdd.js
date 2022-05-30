import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { FaCrown } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { GET_USERS_BY_ID } from "../queries/houseQuery";
import toast, { Toaster } from "react-hot-toast";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

export default function AgentAdd() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [instalment, setInstalment] = useState(0);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [luasTanah, setLuasTanah] = useState(0);
  const [luasBangunan, setLuasBangunan] = useState(0);
  const [certificate, setCertificate] = useState("");
  const [dayaListrik, setDayaListrik] = useState(0);
  const [totalBedroom, setTotalBedroom] = useState(0);
  const [totalBathroom, setTotalBathroom] = useState(0);
  const [pict, setPict] = useState("");

  const [dataHouse, setIsDataHouse] = useState([]);

  // const idUser = localStorage.id;
  // const { loading, error, data } = useQuery(GET_USERS_BY_ID, {
  //   variables: {
  //     getOneUserId: idUser,
  //   },
  // });
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :( </p>;

  function imgHandle(e) {
    const gambar = e.target.files;
    setPict(gambar);
  }

  function submitHandle(e) {
    e.preventDefault();

    let dataBody = {
      title,
      price,
      description,
      location,
      instalment,
      latitude,
      longitude,
      Images: pict,
      luasTanah,
      luasBangunan,
      certificate,
      dayaListrik,
      totalBedroom,
      totalBathroom,
    };

    // console.log(dataBody.Specifications, "<<<<<");
    const myPromise = addHouse(dataBody);

    toast.promise(myPromise, {
      loading: "Uploading...",
      success: "Listing has been uploaded",
      error: "Error when uploading",
    });

    setTimeout(() => {
      navigate("/agent");
    }, 5000);
  }

  async function addHouse(dataBody) {
    try {
      let file = new FormData();
      file.append("title", dataBody.title);
      file.append("price", dataBody.price);
      file.append("description", dataBody.description);
      file.append("location", dataBody.location);
      file.append("instalment", dataBody.instalment);
      file.append("latitude", dataBody.latitude);
      file.append("longitude", dataBody.longitude);
      file.append("luasTanah", dataBody.luasTanah);
      file.append("luasBangunan", dataBody.luasBangunan);
      file.append("certificate", dataBody.certificate);
      file.append("dayaListrik", dataBody.dayaListrik);
      file.append("totalBedroom", dataBody.totalBedroom);
      file.append("totalBathroom", dataBody.totalBathroom);
      // file.append("Specifications", dataBody.Specifications);

      for (let i = 0; i < dataBody.Images.length; i++) {
        file.append("Images", dataBody.Images[i]);
        // console.log(file);
      }
      await axios({
        method: "post",
        url: "http://localhost:3001/houses",
        data: file,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(106.82713133932072);
  const [lat, setLat] = useState(-6.1752110636303605);
  const [zoom, setZoom] = useState(9.5);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    let geocoder;
    map.addControl(
      (geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      }))
    );
    geocoder.on("result", function (e) {
      setLongitude(e.result.center[0]);
      setLatitude(e.result.center[1]);
      // console.log(longitude, latitude);
    });
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    let locateUser;
    map.addControl(
      (locateUser = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
        showUserLocation: true,
      }))
    );
    locateUser.on("geolocate", function (e) {
      setLongitude(e.coords.longitude);
      setLatitude(e.coords.latitude);
      // console.log(longitude, latitude, "ini locate user");
    });
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    return () => map.remove();
  }, []);
  return (
    <>
      <Toaster />
      <div className="flex-1">
        <div className="mx-5 mt-10 flex flex-row justify-start">
          <Link
            to={"/agent"}
            className="bg-gray-200 rounded-t-lg text-sm text-gray-700 py-1 px-3 mr-1"
          >
            My Assets
          </Link>
          <Link
            to={"/agent/add"}
            className="bg-gray-100 rounded-t-lg text-sm text-gray-700 py-1 px-3 mr-1"
          >
            Add New Assets
          </Link>
        </div>
        <div className="bg-gray-100 rounded py-5 px-14 mb-5 shadow">
          <p className="text-xl font-bold tracking-wide mb-4">Add New Asset</p>
          <div className="mx-10">
            <form>
              {/* first field */}
              <div className="flex flex-row mb-5">
                <div className="flex flex-col text-left w-full">
                  <label className="mb-2 font-bold">Title</label>
                  <input
                    type="text"
                    className="py-2 px-4 rounded-lg shadow"
                    placeholder="e.g. Dijual rumah mewah dekat jalan M. H. Thamrin"
                    value={title}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTitle(value);
                    }}
                  ></input>
                </div>
              </div>
              {/* second field */}
              <div className="flex flex-row mb-5">
                <div className="flex flex-col text-left w-1/3 mr-3">
                  <label className="mb-2 font-bold">Price</label>
                  <input
                    type="number"
                    className="py-2 px-4 rounded-lg shadow"
                    placeholder="e.g. 200000000"
                    value={price}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPrice(value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col text-left w-1/3 mr-3">
                  <label className="mb-2 font-bold">Location</label>
                  <input
                    type="text"
                    className="py-2 px-4 rounded-lg shadow"
                    placeholder="e.g. Jalan Thamrin, Jakarta"
                    value={location}
                    onChange={(e) => {
                      const value = e.target.value;
                      setLocation(value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col text-left w-1/3 mr-3">
                  <label className="mb-2 font-bold">Certificate</label>
                  <input
                    type="text"
                    className="py-2 px-4 rounded-lg shadow"
                    placeholder="e.g. SHM"
                    value={certificate}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCertificate(value);
                    }}
                  ></input>
                </div>
              </div>
              {/* third field */}
              <div className="flex flex-row mb-5">
                <div className="flex flex-col text-left w-full">
                  <label className="mb-2 font-bold">Description</label>
                  <textarea
                    className="py-2 px-4 h-32 rounded-lg shadow"
                    placeholder="e.g. Dekat dengan Mall AEON"
                    value={description}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDescription(value);
                    }}
                  ></textarea>
                </div>
              </div>
              {/* fourth field */}
              <div className="flex flex-row mb-5">
                <div className="flex flex-col text-left w-1/3 mr-3">
                  <label className="mb-2 font-bold">Luas Tanah</label>
                  <div className="flex flex-row">
                    <input
                      type="number"
                      className="py-2 px-4 w-4/5 rounded-lg shadow"
                      placeholder="e.g. 100"
                      value={luasTanah}
                      onChange={(e) => {
                        const value = e.target.value;
                        setLuasTanah(value);
                      }}
                    ></input>
                    <p className="ml-3 mt-2">M2</p>
                  </div>
                </div>
                <div className="flex flex-col text-left w-1/3 mr-3">
                  <label className="mb-2 font-bold">Luas Bangunan</label>
                  <div className="flex flex-row">
                    <input
                      type="number"
                      className="py-2 px-4 w-4/5 rounded-lg shadow"
                      placeholder="e.g. 100"
                      value={luasBangunan}
                      onChange={(e) => {
                        const value = e.target.value;
                        setLuasBangunan(value);
                      }}
                    ></input>
                    <p className="ml-3 mt-2">M2</p>
                  </div>
                </div>
                <div className="flex flex-col text-left w-1/3 mr-3">
                  <label className="mb-2 font-bold">Daya Listrik</label>
                  <div className="flex flex-row">
                    <input
                      type="number"
                      className="py-2 px-4 w-3/4 rounded-lg shadow"
                      placeholder="e.g. 100"
                      value={dayaListrik}
                      onChange={(e) => {
                        const value = e.target.value;
                        setDayaListrik(value);
                      }}
                    ></input>
                    <p className="ml-3 mt-2">Watt</p>
                  </div>
                </div>
              </div>
              {/* fifth field */}
              <div className="flex flex-row mb-5">
                <div className="flex flex-row w-full">
                  <div className="flex flex-col text-left w-1/3 mr-3">
                    <label className="mb-2 font-bold">Bedroom</label>
                    <input
                      type="number"
                      className="py-2 px-4 rounded-lg shadow"
                      placeholder="e.g. 3"
                      value={totalBedroom}
                      onChange={(e) => {
                        const value = e.target.value;
                        setTotalBedroom(value);
                      }}
                    ></input>
                  </div>
                  <div className="flex flex-col text-left w-1/3 mr-3">
                    <label className="mb-2 font-bold">Bathroom</label>
                    <input
                      type="number"
                      className="py-2 px-4 rounded-lg shadow"
                      placeholder="e.g. 2"
                      value={totalBathroom}
                      onChange={(e) => {
                        const value = e.target.value;
                        setTotalBathroom(value);
                      }}
                    ></input>
                  </div>
                  <div className="flex flex-col text-left w-1/3 mr-3">
                    <label className="mb-2 font-bold">Installment</label>
                    <select
                      type="text"
                      className="py-2 px-4 rounded-lg shadow"
                      placeholder="e.g. Jalan Thamrin, Jakarta"
                      onChange={(e) => {
                        const value = e.target.value;
                        setInstalment(value);
                      }}
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* sixth field */}
              <div className="flex flex-row mb-5">
                <div className="flex flex-col text-left w-1/3 mx-auto">
                  <label className="mb-2 font-bold mx-auto">Photos</label>
                  <input
                    type="file"
                    className="py-2 px-4 rounded-lg shadow bg-white"
                    onChange={imgHandle}
                    multiple
                  ></input>
                </div>
              </div>
              {/* seventh field */}
              <div className="flex flex-row mb-5">
                <div className="flex flex-col text-left w-full mx-auto">
                  <label className="mb-2 font-bold mx-auto">Pin Location</label>
                  <div className="bg-white h-48 mx-10 rounded-lg shadow">
                    <div
                      className="map-container"
                      ref={mapContainerRef}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
              <button
                className="mt-5 py-2 px-10 bg-emerald-700 text-white rounded-lg shadow font-bold hover:bg-emerald-800"
                onClick={submitHandle}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
