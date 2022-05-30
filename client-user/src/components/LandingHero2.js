import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingHero2() {
  const navigate = useNavigate();
  const toAgentLogin = () => {
    navigate("/agent/login");
  };
  return (
    <div className="mt-8 relative">
      <img
        src={require("../assets/hero2.png")}
        alt=""
        className="object-cover shadow"
      ></img>
      <div className="absolute top-0 mt-20 w-full">
        <p className="text-4xl text-white font-semibold tracking-widest">
          Have a Property to Sell?
        </p>
        <p className="text-xl text-white tracking-wide mt-8">
          Join us to start listing your property with us
        </p>
        <p className="text-xl text-white tracking-wide">
          and reach your audience
        </p>
        <button
          onClick={toAgentLogin}
          className="px-14 py-2 bg-white rounded-lg mt-10 font-bold uppercase tracking-wide text-emerald-700"
        >
          Join Us
        </button>
      </div>
    </div>
  );
}
