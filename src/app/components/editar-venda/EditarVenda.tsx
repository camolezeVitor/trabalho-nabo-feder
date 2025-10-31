"use client";

import React, { useState } from "react";

interface Venda {
  id: number;
  produto: string;
  preco: number;
  comprador: string;
  pagamento: string;
}

interface EditarVendaProps {
  venda: Venda;
  // A prop onClose agora fechará o diálogo interno
  onClose: () => void; 
  onUpdated: (venda: Venda) => void;
}

export function EditarVenda({ venda, onUpdated }: EditarVendaProps) {
  // 1. Novo estado para controlar a abertura/fechamento do diálogo
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    produto: venda.produto,
    // Converte para string para uso no input type="number"
    preco: venda.preco.toString(), 
    comprador: venda.comprador,
    pagamento: venda.pagamento,
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // 2. Função auxiliar para fechar o diálogo e limpar o formulário (opcional)
  const handleClose = () => {
    setIsDialogOpen(false);
    // Opcional: redefinir o formulário para o estado inicial se necessário.
    // setFormData({
    //   produto: venda.produto,
    //   preco: venda.preco.toString(),
    //   comprador: venda.comprador,
    //   pagamento: venda.pagamento,
    // });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        preco: Number(formData.preco),
      };

      const response = await fetch(`/api/vendas?id=${venda.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao atualizar venda.");
        return;
      }

      alert("Venda atualizada com sucesso!");
      onUpdated(data.venda);
      // 3. Usa a função interna para fechar o diálogo após a atualização
      handleClose(); 
    } catch (err) {
      alert("Falha na comunicação com o servidor.");
    } finally {
      setIsLoading(false);
    }
  }
  
  // O componente agora renderiza o botão "Editar" e, condicionalmente, o formulário.
  return (
    <>
      {/* Botão para abrir o diálogo (sem estilos) */}
      <button
        type="button"
        onClick={() => setIsDialogOpen(true)} // Abre o diálogo
        style={{
            backgroundColor: "#dcdcdc",
            border: "2px outset #fff",
            padding: "4px 12px",
            cursor: "pointer",
            fontFamily: "Tahoma, sans-serif",
            // Adicionado margin-right para separação, se estiver junto com outro botão.
            marginRight: '8px' 
        }}
      >
        Editar
      </button>

      {/* Renderiza o diálogo/formulário SE isDialogOpen for TRUE */}
      {isDialogOpen && (
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
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Sombra para parecer um diálogo
          }}
        >
          {/* O resto do formulário permanece igual */}
          <h3 style={{ margin: "0 0 8px 0" }}>Editar Venda {venda.id}</h3>
          <p style={{ fontSize: "12px", margin: "0 0 10px 0" }}>
            Altere os campos abaixo para atualizar a venda:
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
                onClick={handleClose} // Usa a função interna para fechar o diálogo
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
      )}
    </>
  );
}