"use client"

import Image from "next/image";
import { Header } from "./components/header/Header";
import { ListaDeVendas } from "./components/lista-vendas/ListaDeVendast";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 w-full h-dvh p-4 bg-neutral-100">
      <Header />
      <ListaDeVendas />
    </main>
  );
}
