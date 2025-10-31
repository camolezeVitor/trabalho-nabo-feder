"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BotaoDeletarVenda } from "../deletar-venda/DeletarVenda";

interface Venda {
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleFetch() {
    fetchVendas();
  }

  useEffect(() => {

    fetchVendas();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32 text-muted-foreground">
        Carregando vendas...
      </div>
    );
  }

  if (vendas.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-4">
        Nenhuma venda registrada ainda.
      </div>
    );
  }

  return (
    <ScrollArea className="h-full w-full rounded-md p-4">
      <div className="grid gap-4">
        {vendas.map((venda, i) => (
          <Card key={i} className="border-none! shadow-xs!">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{venda.produto}</span>
                <Badge variant="secondary">{venda.pagamento}</Badge>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-row justify-between w-full items-end">
                <section className="flex flex-col gap-2">
                  <div>
                    <small>Comprador</small>
                    <p><strong>{venda.comprador}</strong></p>
                  </div>
                  <div>
                    <small>Preço</small>
                    <p><strong>R$ {Number(venda.preco).toFixed(2)}</strong></p>
                  </div>
                  <div>
                    <small>Data</small>
                    <p><strong>{new Date(venda.data).toLocaleString("pt-BR")}</strong></p>
                  </div>
                </section>
                <BotaoDeletarVenda venda={venda} onDelete={handleFetch} key={i} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
