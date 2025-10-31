"use client";

import 'whatwg-fetch'; // Polyfill para fetch
import 'promise-polyfill/src/polyfill'; // Polyfill para Promise
import '@babel/polyfill'; // Para async/await e outros (instale via npm)

import React from "react";
import { Header } from "./components/header/Header";
import { ListaDeVendas } from "./components/lista-vendas/ListaDeVendast";

export default function Home() {
  const mainStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    backgroundColor: "#d4d0c8",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    padding: "8px",
    borderTop: "2px inset #fff",
    overflowY: "auto",
  };

  return (
    <div style={mainStyle}>
      <Header />
      <div style={contentStyle}>
        <ListaDeVendas />
      </div>
    </div>
  );
}
