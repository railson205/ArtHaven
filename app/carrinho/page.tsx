"use client";

import Divider from "@/public/components/divider";
import Header from "@/public/components/headerbar";
import {
  precoBaseCor,
  precoBasePlanoDeFundo,
  tiposDeCor,
  tiposDePlanoDeFundo,
} from "@/public/constantes";
import produtos from "@/public/produtos";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProdutoCarrinho {
  id: number;
  quantidade: number;
  adicionalCor: number;
  adicionalPlanoDeFundo: number;
}

interface Carrinho {
  [key: number]: ProdutoCarrinho;
}

export default function Carrinho() {
  const router = useRouter();

  const [produtosCarrinho, setProdutosCarrinho] = useState<ProdutoCarrinho[]>([
    {
      id: 1,
      quantidade: 2,
      adicionalCor: precoBaseCor,
      adicionalPlanoDeFundo: 15,
    },
    {
      id: 3,
      quantidade: 1,
      adicionalCor: 65,
      adicionalPlanoDeFundo: precoBasePlanoDeFundo,
    },
  ]);

  const [editarOpen, setEditarOpen] = useState<Boolean[]>(
    Array(produtosCarrinho.length).fill(false)
  );
  const [texto, setTexto] = useState<string>("");
  const [erro, setErro] = useState<string>("");

  // Função para atualizar a quantidade de um produto
  const atualizarQuantidade = (id: number, quantidade: number) => {
    setProdutosCarrinho((prev) => {
      const updatedCarrinho = [...prev];
      const produtoIndex = updatedCarrinho.findIndex(
        (produto) => produto.id === id
      );
      if (produtoIndex !== -1) {
        updatedCarrinho[produtoIndex].quantidade = Math.max(1, quantidade);
      }
      return updatedCarrinho;
    });
  };

  // Função para atualizar o adicional do produto (cor ou fundo)
  const atualizarAdicional = (id: number, tipo: string, valor: number) => {
    setProdutosCarrinho((prev) => {
      const updatedCarrinho = [...prev];
      const produtoIndex = updatedCarrinho.findIndex(
        (produto) => produto.id === id
      );
      if (produtoIndex >= 0) {
        if (tipo === "cor") updatedCarrinho[produtoIndex].adicionalCor = valor;
        else if (tipo === "fundo")
          updatedCarrinho[produtoIndex].adicionalPlanoDeFundo = valor;
      }
      return updatedCarrinho;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setTexto(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (texto.trim().length === 0) {
      setErro("O campo não pode estar vazio.");
    } else {
      setErro("");
      console.log("Texto enviado:", texto);
    }
  };

  const handleFinalizarCompra = () => {
    localStorage.setItem(
      "resumo do carrinho",
      JSON.stringify(produtosCarrinho)
    );
    router.push("/finalizar_compra");
  };

  // Função para remover um produto do carrinho
  const removerProduto = (id: number) => {
    setProdutosCarrinho((prev) => prev.filter((produto) => produto.id !== id));
    setEditarOpen(Array(produtosCarrinho.length).fill(false));
  };

  return (
    <div className="w-full h-screen">
      <Header title="Carrinho" />

      <div className="flex w-full h-full">
        {/* Detalhes do Carrinho */}
        <div className="flex-2 p-5 space-y-5">
          {produtosCarrinho.map((produtoCarrinho, index) => (
            <div
              key={produtoCarrinho.id}
              className="border rounded-lg shadow-md bg-white"
            >
              <div className="flex items-center gap-6 p-4">
                <div className="w-64 h-64 relative">
                  <Image
                    src={produtos[produtoCarrinho.id].imagem}
                    alt={produtos[produtoCarrinho.id].nome}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <h2 className="text-3xl font-semibold">
                    {produtos[produtoCarrinho.id].nome}
                  </h2>
                  <p className="text-lg">
                    {produtos[produtoCarrinho.id].descricao}
                  </p>
                  <p className="text-xl text-green-600 font-bold">
                    {produtos[produtoCarrinho.id].preco}
                  </p>
                </div>

                {/* Controles de Quantidade */}
                <div className="flex gap-2 flex-col items-center">
                  <div className="flex items-center justify-between w-full h-full border rounded-md bg-blue-700 px-3 py-2">
                    {produtoCarrinho.quantidade > 1 ? (
                      <button
                        className="p-2"
                        onClick={() =>
                          atualizarQuantidade(
                            produtoCarrinho.id,
                            produtoCarrinho.quantidade - 1
                          )
                        }
                      >
                        <ChevronLeft size={18} />
                      </button>
                    ) : (
                      <button className="p-2">
                        <Trash size={18} />
                      </button>
                    )}
                    <span className="px-5 font-bold">
                      {produtoCarrinho.quantidade}
                    </span>
                    <button
                      className="p-2"
                      onClick={() =>
                        atualizarQuantidade(
                          produtoCarrinho.id,
                          produtoCarrinho.quantidade + 1
                        )
                      }
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      const toUpdate = !editarOpen[index];
                      const update = Array(produtosCarrinho.length).fill(false);
                      update[index] = toUpdate;
                      setEditarOpen(update);
                    }}
                    className="flex items-center gap-2 px-12 py-2 text-black bg-white border border-blue-700 rounded-md hover:bg-green-600 transition"
                  >
                    <span className="font-bold">Editar</span>
                  </button>
                </div>
              </div>

              {/* Formulário de Edição */}
              {editarOpen[index] && (
                <div className="flex bg-gray-100">
                  <form onSubmit={handleSubmit} className="p-6 max-w-lg">
                    <textarea
                      className="w-96 h-64 p-4 border rounded-md shadow-md resize-none"
                      rows={5}
                      value={texto}
                      onChange={handleChange}
                      placeholder="Digite os detalhes da arte aqui..."
                    />
                    {erro && <p className="text-red-500 mt-2">{erro}</p>}
                  </form>

                  {/* Seção de Seleção de Cores e Fundos */}
                  <div>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">Selecione a Cor</h3>
                      {Object.entries(tiposDeCor).map(([cor, valor]) => (
                        <label key={cor} className="block mb-2">
                          <input
                            type="radio"
                            name="cor"
                            value={valor}
                            checked={produtoCarrinho.adicionalCor === valor}
                            onChange={() =>
                              atualizarAdicional(
                                produtoCarrinho.id,
                                "cor",
                                valor
                              )
                            }
                            className="mr-2"
                          />
                          {cor} - R$ {valor}
                        </label>
                      ))}
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">
                        Selecione o Fundo
                      </h3>
                      {Object.entries(tiposDePlanoDeFundo).map(
                        ([fundo, valor]) => (
                          <label key={fundo} className="block mb-2">
                            <input
                              type="radio"
                              name="fundo"
                              value={valor}
                              checked={
                                produtoCarrinho.adicionalPlanoDeFundo === valor
                              }
                              onChange={() =>
                                atualizarAdicional(
                                  produtoCarrinho.id,
                                  "fundo",
                                  valor
                                )
                              }
                              className="mr-2"
                            />
                            {fundo} - R$ {valor}
                          </label>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Resumo e Total */}
        <div className="flex-1 p-5">
          <div className="bg-white shadow-md p-4 rounded-lg h-full flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Resumo do Carrinho</h2>
            <div className="flex-1 overflow-y-auto space-y-4">
              {produtosCarrinho.map((produtoCarrinho) => (
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
            </div>

            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <p className="text-2xl font-semibold">
                Total: R$
                {produtosCarrinho
                  .reduce((total, produtoCarrinho) => {
                    const produto = produtos[produtoCarrinho.id];
                    const preco = parseFloat(
                      produto.preco.replace("R$", "").replace(",", ".")
                    );
                    return (
                      total +
                      (preco +
                        produtoCarrinho.adicionalCor +
                        produtoCarrinho.adicionalPlanoDeFundo) *
                        produtoCarrinho.quantidade
                    );
                  }, 0)
                  .toFixed(2)}
              </p>
              <button
                onClick={handleFinalizarCompra}
                className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
