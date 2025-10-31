"use client";

import React, { useState } from "react";

interface Venda {
  id?: number;
  produto: string;
  preco: number;
  comprador: string;
  pagamento: string;
  data: string;
}

export function BotaoDeletarVenda({
  venda,
  onDelete,
}: {
  venda: Venda;
  onDelete?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    const confirmDelete = confirm(
      `Tem certeza que deseja deletar a venda do produto "${venda.produto}"?`
    );
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/vendas?id=${venda.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao deletar venda.");
        return;
      }

      alert("Venda deletada com sucesso!");
      if (onDelete) onDelete();
    } catch (err) {
      alert("Falha na comunicação com o servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      style={{
        backgroundColor: "#dcdcdc",
        border: "2px outset #fff",
        padding: "4px 10px",
        cursor: "pointer",
        fontFamily: "Tahoma, sans-serif",
        fontSize: "12px",
        color: "#000",
      }}
    >
      {isLoading ? "Deletando..." : "Deletar"}
    </button>
  );
}
