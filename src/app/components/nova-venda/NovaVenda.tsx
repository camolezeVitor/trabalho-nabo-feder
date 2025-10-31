"use client";

import React, { useState } from "react";

export function NovaVenda() {
  const [formData, setFormData] = useState({
    produto: "",
    preco: "",
    comprador: "",
    pagamento: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        preco: Number(formData.preco),
      };

      const response = await fetch("/api/vendas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao registrar venda.");
        return;
      }

      alert("Venda registrada com sucesso!");
      location.reload();
    } catch (err) {
      alert("Falha na comunicação com o servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        type="button"  // Adicionado aqui para evitar comportamento de submit
        onClick={() => setIsOpen(true)}
        style={{
          backgroundColor: "#dcdcdc",
          border: "2px outset #fff",
          padding: "6px 14px",
          cursor: "pointer",
          fontFamily: "Tahoma, sans-serif",
        }}
      >
        + Nova Venda
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#ece9d8",
        border: "2px solid #808080",
        padding: "12px",
        width: "360px",
        fontFamily: "Tahoma, sans-serif",
        zIndex: 1000,
      }}
    >
      <h3 style={{ margin: "0 0 8px 0" }}>Nova Venda</h3>
      <p style={{ fontSize: "12px", margin: "0 0 10px 0" }}>
        Preencha os campos abaixo para registrar uma nova venda:
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "6px" }}>
          <label>Produto:</label>
          <br />
          <input
            type="text"
            name="produto"
            value={formData.produto}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              border: "1px solid #808080",
              padding: "4px",
              background: "#fff",
              fontFamily: "Tahoma, sans-serif",
            }}
          />
        </div>

        <div style={{ marginBottom: "6px" }}>
          <label>Preço:</label>
          <br />
          <input
            type="number"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              border: "1px solid #808080",
              padding: "4px",
              background: "#fff",
              fontFamily: "Tahoma, sans-serif",
            }}
          />
        </div>

        <div style={{ marginBottom: "6px" }}>
          <label>Comprador:</label>
          <br />
          <input
            type="text"
            name="comprador"
            value={formData.comprador}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              border: "1px solid #808080",
              padding: "4px",
              background: "#fff",
              fontFamily: "Tahoma, sans-serif",
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Forma de Pagamento:</label>
          <br />
          <input
            type="text"
            name="pagamento"
            value={formData.pagamento}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              border: "1px solid #808080",
              padding: "4px",
              background: "#fff",
              fontFamily: "Tahoma, sans-serif",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            style={{
              backgroundColor: "#dcdcdc",
              border: "2px outset #fff",
              padding: "4px 12px",
              cursor: "pointer",
              fontFamily: "Tahoma, sans-serif",
            }}
          >
            Fechar
          </button>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: "#dcdcdc",
              border: "2px outset #fff",
              padding: "4px 12px",
              cursor: "pointer",
              fontFamily: "Tahoma, sans-serif",
            }}
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}