interface ResumoItemCarrinho {
  nome: string | undefined;
  valor: number;
  adicional: boolean;
}

export function ResumoItemCarrinho({
  nome,
  valor,
  adicional,
}: ResumoItemCarrinho) {
  return (
    <div className="flex justify-between items-center">
      <p
        style={{
          fontSize: adicional ? "1rem" : "1.125rem", // 1rem = 16px (base), 1.125rem = 18px
          color: adicional ? "#6B7280" : "inherit", // #6B7280 é a cor correspondente a text-gray-500
          fontWeight: "500", // font-medium equivale a font-weight: 500
        }}
      >
        {nome !== undefined ? nome : ""}
      </p>
      <p className="text-lg font-medium">
        R$ {valor.toFixed(2).replace(".", ",")}
      </p>
    </div>
  );
}
