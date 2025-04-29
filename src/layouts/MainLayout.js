// src/layouts/MainLayout.js
import React from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
