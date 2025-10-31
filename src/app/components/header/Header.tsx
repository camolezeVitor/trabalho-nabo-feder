"use client";

import { Store } from "lucide-react";
import { NovaVenda } from "../nova-venda/NovaVenda";

export function Header() {
  const headerStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 10px",
    backgroundColor: "#d4d0c8",
    borderBottom: "2px outset #fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Tahoma, sans-serif",
    boxSizing: "border-box",
  };

  const titleStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
  };

  const iconBoxStyle: React.CSSProperties = {
    width: "32px",
    height: "32px",
    border: "2px inset #fff",
    backgroundColor: "#ece9d8",
    color: "#000080",
    fontWeight: "bold",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "8px",
  };

  const titleTextStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#000",
  };

  return (
    <div style={headerStyle}>
      <div style={titleStyle}>
        <div style={iconBoxStyle}><Store /></div>
        <span style={titleTextStyle}>Registro de Vendas</span>
      </div>
      <NovaVenda />
    </div>
  );
}
