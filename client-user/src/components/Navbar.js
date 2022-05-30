import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { LOGIN } from "../queries/houseQuery";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Navbar() {
  const Navigate = useNavigate();
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePict, setProfilePict] = useState("");

  const [loginCustomer, { data, loading, error }] = useMutation(LOGIN);

  const isLogin = localStorage.getItem("access_token");
  const loginName = localStorage.getItem("name");

  // console.log(data, loading, error, "<-----");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( </p>;

  function submitLogin(e) {
    e.preventDefault();

    loginCustomer({
      variables: {
        loginUser: {
          email,
          password,
        },
      },
      onCompleted(data) {
        // localStorage.setItem("AUTH_TOKEN", data.login.token);
        localStorage.access_token = data.login.access_token;
        localStorage.id = data.login.id;
        localStorage.name = data.login.name;
        localStorage.role = data.login.role;
        localStorage.profilePict = data.login.profilePict;

        setIsOpenLogin(false);
      },
    });
  }

  function photoHandle(e) {
    const img = e.target.files[0];
    setProfilePict(img);
  }

  function submitRegister(e) {
    e.preventDefault();

    let dataBody = {
      username,
      email,
      password,
      phoneNumber,
      profilePict,
    };

    registerUser(dataBody);

    setIsOpenRegister(false);
  }

  function registerUser(dataBody) {
    try {
      const file = new FormData();
      file.append("username", dataBody.username);
      file.append("email", dataBody.email);
      file.append("password", dataBody.password);
      file.append("phoneNumber", dataBody.phoneNumber);
      file.append("profilePict", dataBody.profilePict);

      const respon = axios({
        method: "POST",
        url: "http://localhost:3000/users/registerUser",
        data: file,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function logOut() {
    localStorage.clear();
    Navigate("/");
  }

  return (
    <>
      {/* Pop up register */}
      <Dialog
        open={isOpenRegister}
        onClose={() => setIsOpenRegister(false)}
        className="relative z-50"
      >
        <div class="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white">
            <img
              src={require("../assets/logo1.png")}
              className="w-1/2 mx-auto my-6"
              alt=""
            ></img>
            <Dialog.Title className="text-xl text-center font-bold mt-3">
              Join Us Now
            </Dialog.Title>
            <Dialog.Description className="text-sm text-center mb-6">
              And start searching for your dream home
            </Dialog.Description>

            <form>
              <div className="w-full ">
                <div className="flex flex-col px-10 mb-3">
                  <label className="mb-2 font-bold">Username</label>
                  <input
                    type="text"
                    className="py-2 px-4 border-2 rounded-lg shadow"
                    placeholder="Insert Username"
                    value={username}
                    onChange={(e) => {
                      const value = e.target.value;
                      setUsername(value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col px-10 mb-3">
                  <label className="mb-2 font-bold">Email</label>
                  <input
                    type="email"
                    className="py-2 px-4 border-2 rounded-lg shadow"
                    placeholder="Insert Email"
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEmail(value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col px-10 mb-6">
                  <label className="mb-2 font-bold">Password</label>
                  <input
                    type="text"
                    className="py-2 px-4 border-2 rounded-lg shadow"
                    placeholder="Insert Password"
                    value={password}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPassword(value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col px-10 mb-6">
                  <label className="mb-2 font-bold">Phone Number</label>
                  <input
                    type="text"
                    className="py-2 px-4 border-2 rounded-lg shadow"
                    placeholder="Insert Password"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPhoneNumber(value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col px-10 mb-6">
                  <label className="mb-2 font-bold">Upload photo</label>
                  <input
                    type="file"
                    className="py-2 px-4 border-2 rounded-lg shadow"
                    placeholder="Insert Password"
                    onChange={photoHandle}
                  ></input>
                </div>
              </div>
            </form>
            <div className="text-center mx-10 mb-5">
              <button
                onClick={submitRegister}
                className="bg-emerald-700 w-full py-2 rounded-lg shadow font-bold text-white hover:bg-emerald-800"
              >
                Sign Up
              </button>
            </div>
            <div className="flex flex-row justify-between mx-10 mb-10">
              <p className="text-sm">Already Have An Account?</p>
              <p
                onClick={() => {
                  setIsOpenLogin(true);
                  setIsOpenRegister(false);
                }}
                className="text-sm text-emerald-700 font-bold hover:text-emerald-500 hover:cursor-pointer"
              >
                Sign In
              </p>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* pop up login */}
      <Dialog
        open={isOpenLogin}
        onClose={() => setIsOpenLogin(false)}
        className="relative z-50"
      >
        <div class="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white">
            <img
              src={require("../assets/logo1.png")}
              className="w-1/2 mx-auto my-6"
              alt=""
            ></img>
            <Dialog.Title className="text-xl text-center font-bold mt-3 mb-6">
              Login to Wismaloka
            </Dialog.Title>

            <form>
              <div className="w-full ">
                <div className="flex flex-col px-10 mb-3">
                  <label className="mb-2 font-bold">Email</label>
                  <input
                    type="email"
                    className="py-2 px-4 border-2 rounded-lg shadow"
                    placeholder="Insert Email"
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEmail(value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col px-10 mb-6">
                  <label className="mb-2 font-bold">Password</label>
                  <input
                    type="password"
                    className="py-2 px-4 border-2 rounded-lg shadow"
                    placeholder="Insert Password"
                    value={password}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPassword(value);
                    }}
                  ></input>
                </div>
              </div>
            </form>
            <div className="text-center mx-10 mb-5">
              <button
                onClick={submitLogin}
                className="bg-emerald-700 w-full py-2 rounded-lg shadow font-bold text-white hover:bg-emerald-800"
              >
                Sign In
              </button>
            </div>
            <div className="flex flex-row justify-between mx-10 mb-10">
              <p className="text-sm">Don't have account yet?</p>
              <p
                onClick={() => {
                  setIsOpenRegister(true);
                  setIsOpenLogin(false);
                }}
                className="text-sm text-emerald-700 font-bold hover:text-emerald-500 hover:cursor-pointer"
              >
                Sign Up
              </p>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* main navbar */}
      <div className="absolute top-0 flex w-full justify-between px-10 py-4">
        <div>
          <Link to={"/"}>
            <img
              src={require("../assets/logo1.png")}
              alt=""
              width={150}
              height={75}
              className=""
            ></img>
          </Link>
        </div>
        <div className="mt-3">
          <Link className="mr-10 font-bold text-emerald-700" to={"/"}>
            Home
          </Link>
          <Link className="mr-10 font-bold text-emerald-700" to={"/all"}>
            Listings
          </Link>
          <Link className="mr-10 font-bold text-emerald-700" to={"/agent"}>
            Agents
          </Link>
          <Link className="font-bold text-emerald-700" to={"/"}>
            About
          </Link>
        </div>
        <div className="mt-1">
          {!isLogin && (
            <>
              <button
                onClick={() => setIsOpenRegister(true)}
                className="mr-3 font-bold text-emerald-700"
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsOpenLogin(true)}
                className="bg-white py-2 px-4 rounded-lg shadow text-emerald-700 font-bold hover:bg-emerald-400 hover:text-white"
              >
                Sign In
              </button>
            </>
          )}
          {isLogin && (
            <div className="flex flex-row">
              <p className="mt-2 mr-4">Hello, {loginName}</p>
              <button
                onClick={logOut}
                className="bg-white py-2 px-4 rounded-lg shadow text-emerald-700 font-bold hover:bg-emerald-400 hover:text-white"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
