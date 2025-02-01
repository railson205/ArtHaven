import produtos from "./produtos";

export const precoBaseCor = 50;
export const precoBasePlanoDeFundo = 0;

export const tiposDeCor = {
  "Preto e Branco": precoBaseCor,
  "Cor Chapada": 65,
  Sombreado: 85,
};

export const tiposDePlanoDeFundo = {
  "Sem Fundo": precoBasePlanoDeFundo,
  "Com Fundo": 15,
};

interface ProdutoCarrinho {
  id: number;
  nome: string;
  quantidade: number;
  adicionalCor: number;
  adicionalPlanoDeFundo: number;
}

export const calcularTotal = (carrinho: ProdutoCarrinho[]) =>
  carrinho.reduce(
    (total, { id, quantidade, adicionalCor, adicionalPlanoDeFundo }) =>
      total +
      (parseFloat(produtos[id].preco.replace("R$", "").replace(",", ".")) +
        adicionalCor +
        adicionalPlanoDeFundo) *
        quantidade,
    0
  );
