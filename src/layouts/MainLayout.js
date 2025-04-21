// src/layouts/MainLayout.js
import React from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
