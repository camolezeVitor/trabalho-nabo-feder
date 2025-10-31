"use client";

import React, { useEffect, useState } from "react";

interface Venda {
  id?: number;
  produto: string;
  preco: number;
  comprador: string;
  pagamento: string;
  data: string;
}

export function ListaDeVendas() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchVendas() {
    try {
      const res = await fetch("/api/vendas");
      if (!res.ok) throw new Error("Erro ao buscar vendas");
      const data = await res.json();
      setVendas(data);
    } catch (err) {
      alert("Erro ao carregar vendas.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id?: number) {
    if (!id) return;
    const confirmDelete = confirm("Tem certeza que deseja deletar esta venda?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/vendas?id=${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error || "Erro ao deletar venda.");
        return;
      }
      alert("Venda deletada com sucesso!");
      fetchVendas();
    } catch (err) {
      alert("Erro de conexão com o servidor.");
    }
  }

  useEffect(() => {
    fetchVendas();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: "12px",
          fontFamily: "Tahoma, sans-serif",
          color: "#000",
          backgroundColor: "#ece9d8",
          border: "1px solid #808080",
          marginTop: "12px",
        }}
      >
        Carregando vendas...
      </div>
    );
  }

  if (vendas.length === 0) {
    return (
      <div
        style={{
          padding: "12px",
          fontFamily: "Tahoma, sans-serif",
          color: "#000",
          backgroundColor: "#ece9d8",
          border: "1px solid #808080",
          marginTop: "12px",
          textAlign: "center",
        }}
      >
        Nenhuma venda registrada ainda.
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 120px)",
        overflowY: "auto",
        backgroundColor: "#d4d0c8",
        border: "2px inset #fff",
        padding: "10px",
        fontFamily: "Tahoma, sans-serif",
      }}
    >
      {vendas.map((venda, i) => (
        <div
          key={i}
          style={{
            border: "2px outset #fff",
            backgroundColor: "#ece9d8",
            padding: "10px",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <strong>{venda.produto}</strong>
            <span
              style={{
                backgroundColor: "#dcdcdc",
                border: "1px solid #808080",
                padding: "2px 6px",
                fontSize: "12px",
              }}
            >
              {venda.pagamento}
            </span>
          </div>

          <div style={{ fontSize: "12px", marginBottom: "4px" }}>
            <b>Comprador:</b> {venda.comprador}
          </div>
          <div style={{ fontSize: "12px", marginBottom: "4px" }}>
            <b>Preço:</b> R$ {Number(venda.preco).toFixed(2)}
          </div>
          <div style={{ fontSize: "12px", marginBottom: "8px" }}>
            <b>Data:</b>{" "}
            {new Date(venda.data).toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </div>

          <div style={{ textAlign: "right" }}>
            <button
              type="button"  // Adicionado aqui para evitar comportamento de submit
              onClick={() => handleDelete(venda.id)}
              style={{
                backgroundColor: "#dcdcdc",
                border: "2px outset #fff",
                padding: "4px 10px",
                cursor: "pointer",
                fontFamily: "Tahoma, sans-serif",
              }}
            >
              Deletar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}