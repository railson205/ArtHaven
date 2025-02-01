"use client";

import Divider from "@/public/components/divider";
import Header from "@/public/components/headerbar";
import {
  calcularTotal,
  precoBaseCor,
  precoBasePlanoDeFundo,
  tiposDeCor,
  tiposDePlanoDeFundo,
} from "@/public/constantes";
import produtos from "@/public/produtos";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProdutoCarrinho {
  id: number;
  nome: string;
  quantidade: number;
  adicionalCor: number;
  adicionalPlanoDeFundo: number;
}

export default function FinalizarCompra() {
  const [valorParticao, setValorParticao] = useState<number>(0);
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);
  const total = calcularTotal(carrinho);
  const [valorCupom, setValorCupom] = useState(0);
  const [valorDesconto, setValorDesconto] = useState(0);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("resumo do carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  const handleChangeDesconto = (particao: number, cupom: number) => {
    setValorParticao(particao);
    setValorCupom(cupom);
    setValorDesconto(total * particao + cupom);
  };

  return (
    <div>
      <div className="flex-1">
        {" "}
        <Header title="Finalizar Compra" />
      </div>
      <div className="flex-1 flex p-4 flex-2">
        <div className="flex-2 ">
          {/*Partição dos pagamentos */}
          <div about="Partição">
            <h1 className="text-3xl">Partição dos pagamentos</h1>
            <h2 className="texl-3xl">50 - 50</h2>
            <p>
              O pagamento atual será de 50% do valor da compra e será necessário
              pagar os outros 50% para receber a arte final.
            </p>
            <p>
              Caso pague tudo, na hora da entrega da arte final ela ja será
              liberada.
            </p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Selecione a Partição</h3>
              <label className="block mb-2">
                <input
                  type="radio"
                  name="pagamento"
                  value={1}
                  checked={valorParticao === 0}
                  onChange={() => handleChangeDesconto(0, valorCupom)}
                  className="mr-2"
                />
                Pagar Tudo -R$ 0.00
              </label>
              <label className="block mb-2">
                <input
                  type="radio"
                  name="pagamento"
                  value={1}
                  checked={valorParticao === 0.5}
                  onChange={() => handleChangeDesconto(0.5, valorCupom)}
                  className="mr-2"
                />
                Pagar Tudo -R$ {(0.5 * total).toFixed(2)}
              </label>
            </div>
            <Divider />
            {/*Método de pagamento */}
            <div>
              <p className="text-3xl">Método de Pagamento</p>
              <div className="flex justify-between pt-4">
                <div className="flex">
                  <CreditCard size={30} />
                  <div className="pl-5">
                    <p>Débito</p>
                    <p>Final: 8432</p>
                  </div>
                </div>
                <button className="border border-solid px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-500 transition">
                  <p>Alterar</p>
                </button>
              </div>
            </div>
            <Divider />
            {/*Cupom */}
            <div>
              <p>Cupom</p>
              <div className="flex justify-between">
                <p>Código do cupom</p>
                <button
                  onClick={() => handleChangeDesconto(valorParticao, 10)}
                  className="border border-solid px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-500 transition"
                >
                  <p>Aplicar</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 ml-5 pl-4 justify-between w-full">
          <div className="h-full">
            <h1 className="text-3xl">Resumo do Carrinho</h1>
            <div className="flex-1 overflow-y-auto space-y-4">
              {carrinho.map((produtoCarrinho) => (
                <div key={produtoCarrinho.id}>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">
                      {produtos[produtoCarrinho.id].nome}
                    </p>
                    <p className="text-lg font-medium">
                      {produtos[produtoCarrinho.id].preco} x{" "}
                      {produtoCarrinho.quantidade}
                    </p>
                  </div>

                  {/* Adicionais de Cor e Fundo */}
                  {produtoCarrinho.adicionalCor !== precoBaseCor && (
                    <div className="flex justify-between items-center">
                      <p className="text-base font-medium text-gray-500">
                        {
                          Object.entries(tiposDeCor).find(
                            ([key, value]) =>
                              value === produtoCarrinho.adicionalCor
                          )?.[0]
                        }
                      </p>
                      <p className="text-lg font-medium">
                        R$ {produtoCarrinho.adicionalCor},00
                      </p>
                    </div>
                  )}
                  {produtoCarrinho.adicionalPlanoDeFundo !==
                    precoBasePlanoDeFundo && (
                    <div className="flex justify-between items-center">
                      <p className="text-base font-medium text-gray-500">
                        {
                          Object.entries(tiposDePlanoDeFundo).find(
                            ([key, value]) =>
                              value === produtoCarrinho.adicionalPlanoDeFundo
                          )?.[0]
                        }
                      </p>
                      <p className="text-lg font-medium">
                        R$ {produtoCarrinho.adicionalPlanoDeFundo},00
                      </p>
                    </div>
                  )}
                  <Divider />
                </div>
              ))}
              <div className="flex justify-between items-center">
                <p className="text-base font-medium text-gray-500">Partição</p>
                <p className="text-lg font-medium">
                  R$ {(total * valorParticao).toFixed(2).replace(".", ",")}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-base font-medium text-gray-500">Cupom</p>
                <p className="text-lg font-medium">
                  R$ {valorCupom.toFixed(2).replace(".", ",")}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-base font-medium text-gray-500">Desconto</p>
                <p className="text-lg font-medium">
                  R$ {valorDesconto.toFixed(2).replace(".", ",")}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <p className="text-2xl font-semibold">
                  Total: R$ {(total - valorDesconto).toFixed(2)}
                </p>
                <Link href="/perfil">
                  <button className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition">
                    Pagar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
