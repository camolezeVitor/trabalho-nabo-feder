import { Venda } from "@/app/models/venda";
import { NextRequest, NextResponse } from "next/server";

const vendas: Venda[] = [];
let nextId = 1;

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID obrigatório." }, { status: 400 });
    }

    const parsedId = parseInt(id, 10);
    const index = vendas.findIndex((v) => v.id === parsedId);
    if (index === -1) {
      return NextResponse.json({ error: "Venda não encontrada." }, { status: 404 });
    }

    const body = await req.json();
    const { produto, preco, comprador, pagamento } = body as Venda;

    if (!produto || !preco || !comprador || !pagamento) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    vendas[index] = {
      ...vendas[index],
      produto,
      preco: Number(preco),
      comprador,
      pagamento,
    };

    return NextResponse.json({ message: "Venda atualizada com sucesso!", venda: vendas[index] });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao atualizar venda." }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { produto, preco, comprador, pagamento } = body as Venda;

    if (!produto || !preco || !comprador || !pagamento) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const novaVenda: Venda = {
      id: nextId++,
      produto,
      preco: Number(preco),
      comprador,
      pagamento,
      data: new Date().toISOString(),
    };

    vendas.push(novaVenda);

    return NextResponse.json(
      { message: "Venda registrada com sucesso!", venda: novaVenda },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao registrar venda." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(vendas);
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID obrigatório." }, { status: 400 });
    }

    const parsedId = parseInt(id, 10);
    const index = vendas.findIndex((v) => v.id === parsedId);

    if (index === -1) {
      return NextResponse.json({ error: "Venda não encontrada." }, { status: 404 });
    }

    vendas.splice(index, 1);

    return NextResponse.json({ message: "Venda deletada com sucesso!" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao deletar venda." }, { status: 500 });
  }
}