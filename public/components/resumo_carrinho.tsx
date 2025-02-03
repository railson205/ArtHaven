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
        className={`${
          adicional ? "text-base text-gray-500" : "text-lg"
        } font-medium`}
      >
        {nome !== undefined ? nome : ""}
      </p>
      <p className="text-lg font-medium">
        R$ {valor.toFixed(2).replace(".", ",")}
      </p>
    </div>
  );
}
