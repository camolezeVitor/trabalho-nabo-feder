"use client"

import { Store } from "lucide-react";
import { NovaVenda } from "../nova-venda/NovaVenda";

export function Header() {
    return (
        <header className="w-full p-4 flex flex-row justify-between bg-white border-neutral-300 shadow-xs rounded-lg">
            <div className="flex flex-row items-center gap-4">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-neutral-100">
                    <Store />
                </div>
                <h4 className="text-xl font-semibold m-0! p-0!"> Registro de Vendas </h4>
            </div>
            <NovaVenda />
        </header>
    )
}