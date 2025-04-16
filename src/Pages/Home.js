// src/pages/Home.js
import React from "react";
import { Header } from "../Components/Header.js";


export default function Home() {
  return (
    <><Header></Header>
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to CareConnect</h1>
      <p className="text-lg mb-6">
        Your trusted healthcare appointment scheduling system.
      </p>
    </div></>
  );
}
