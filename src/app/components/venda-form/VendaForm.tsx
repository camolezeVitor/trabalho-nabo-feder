import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Venda } from "../../models/venda";
import { useState } from "react";

interface VendaFormProps {
  formData: Venda;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VendaForm({ formData, onChange }: VendaFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "produto":
        if (!value.trim()) error = "O nome do produto é obrigatório.";
        else if (value.length < 2)
          error = "O nome do produto deve ter pelo menos 2 caracteres.";
        break;

      case "preco":
        if (!value) error = "O preço é obrigatório.";
        else if (Number(value) <= 0)
          error = "O preço deve ser maior que zero.";
        break;

      case "comprador":
        if (!value.trim()) error = "O nome do comprador é obrigatório.";
        else if (value.length < 3)
          error = "O nome do comprador deve ter pelo menos 3 caracteres.";
        break;

      case "pagamento":
        if (!value.trim()) error = "A forma de pagamento é obrigatória.";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <Label htmlFor="produto">Produto</Label>
        <Input
          id="produto"
          name="produto"
          value={formData.produto}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder="Nome do produto"
          required
          minLength={2}
        />
        {errors.produto && (
          <span className="text-red-500 text-sm">{errors.produto}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="preco">Preço</Label>
        <Input
          id="preco"
          name="preco"
          type="number"
          value={formData.preco}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder="0.00"
          required
          min={0.01}
          step="0.01"
        />
        {errors.preco && (
          <span className="text-red-500 text-sm">{errors.preco}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="comprador">Nome do Comprador</Label>
        <Input
          id="comprador"
          name="comprador"
          type="text"
          value={formData.comprador}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder="Ex: João Silva"
          required
          minLength={3}
        />
        {errors.comprador && (
          <span className="text-red-500 text-sm">{errors.comprador}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="pagamento">Forma de Pagamento</Label>
        <Input
          id="pagamento"
          name="pagamento"
          value={formData.pagamento}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder="Ex: Cartão, PIX, Dinheiro"
          required
        />
        {errors.pagamento && (
          <span className="text-red-500 text-sm">{errors.pagamento}</span>
        )}
      </div>
    </>
  );
}
