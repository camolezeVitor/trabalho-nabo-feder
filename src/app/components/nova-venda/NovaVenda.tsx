"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus, Loader2 } from "lucide-react";
import { VendaForm } from "../venda-form/VendaForm";
import { Venda } from "../../models/venda";

export function NovaVenda() {
  const [formData, setFormData] = useState<Venda>({
    produto: "",
    preco: "" as any,
    comprador: "",
    pagamento: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await submitVenda();
    } finally {
      setIsLoading(false);
    }
  }

  async function submitVenda() {
    try {
      console.log("tamo aí??")
      const payload = {
        ...formData,
        preco: Number((formData as any).preco),
      };

      const response = await fetch("/api/vendas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao registrar venda.");
        return;
      }

      alert("Venda registrada com sucesso!");
      location.reload();
      console.log("Nova venda:", data.venda);

      setFormData({
        produto: "",
        preco: "" as any,
        comprador: "",
        pagamento: "",
      });
    } catch (err) {
      console.error(err);
      alert("Falha na comunicação com o servidor.");
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="xl" type="button">
          <Plus />
          Nova Venda
        </Button>
      </SheetTrigger>

      <SheetContent>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Realizar Nova Venda</SheetTitle>
            <SheetDescription>
              Preencha o formulário abaixo para registrar uma nova venda.
            </SheetDescription>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <VendaForm formData={formData} onChange={handleChange} />
          </div>

          <SheetFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>

            <SheetClose asChild>
              <Button variant="outline">Fechar</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}