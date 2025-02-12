"use client";

import Divider from "@/public/components/divider";
import Header from "@/public/components/headerbar";
import { ResumoItemCarrinho } from "@/public/components/resumo_carrinho";
import {
  calcularTotal,
  itensSalvosMercado,
  precoBasePlanoDeFundo,
  produtosSalvoMercado,
  tiposDeCor,
  tiposDePlanoDeFundo,
  transformaValor,
  url_api,
  usuario_logado,
} from "@/public/constantes";
import {
  ItensMercadoInterface,
  ProdutoCarrinhoInterface,
} from "@/public/interfaces";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Carrinho() {
  const router = useRouter();

  const [produtosCarrinho, setProdutosCarrinho] = useState<
    ProdutoCarrinhoInterface[]
  >([]);

  const [editarOpen, setEditarOpen] = useState<boolean[]>(
    Array(produtosCarrinho.length).fill(false)
  );
  const [textos, setTextos] = useState<{ [key: number]: string }>({});
  const [erros, setErros] = useState<{ [key: number]: string }>({});

  const atualizarAdicional = (index: number, tipo: string, valor: string) => {
    setProdutosCarrinho((prev) => {
      const novoCarrinho = [...prev]; // Criar um novo array (nova referência)
      novoCarrinho[index] = {
        ...novoCarrinho[index],
        [tipo === "cor" ? "adicionalCor" : "adicionalPlanoDeFundo"]: valor,
      };
      return novoCarrinho;
    });
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextos((prev) => ({
      ...prev,
      [index]: e.target.value,
    }));
  };

  const handleSubmit = (index: number, e: React.FormEvent) => {
    e.preventDefault();
    if (!textos[index] || textos[index].trim().length === 0) {
      setErros((prev) => ({
        ...prev,
        [index]: "O campo não pode estar vazio.",
      }));
    } else {
      setErros((prev) => ({ ...prev, [index]: "" }));
      //console.log(`Texto enviado para o produto ${index}:`, textos[index]);
      handleSalvarDetalhes(index);
    }
  };

  const handleFinalizarCompra = () => {
    localStorage.setItem(
      "resumo do carrinho",
      JSON.stringify(produtosCarrinho)
    );
    router.push("/finalizar_compra");
  };

  const removerProduto = (index: number) => {
    setProdutosCarrinho((prev) => prev.filter((_, i) => i !== index));
    setEditarOpen((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  async function fetchMercado(): Promise<ItensMercadoInterface[]> {
    try {
      const response = await fetch(
        `${url_api}/perfilMercado?nameTag=${usuario_logado}`
      );
      const data = await response.json();

      return data.ItensMercado.map((itemLista: any, index: number) => ({
        id_item_mercado: itemLista.id_ItemMercado,
        nome: itemLista.nome,
        descricao: itemLista.descricao,
        preco: transformaValor(itemLista.preco),
        imagem:
          `${url_api}/${itemLista.foto}` || itensSalvosMercado[index]?.imagem,
        tipos_de_cor: itemLista.tiposCor,
        tipos_de_fundo: itemLista.tiposFundo,
        perfilComprador: itemLista.perfil,
      }));
    } catch (error) {
      console.error("Erro ao buscar mercado:", error);
      return [];
    }
  }

  async function fetchCarrinho() {
    try {
      // Busca mercado e carrinho simultaneamente
      const [produtosMercado, response] = await Promise.all([
        fetchMercado(),
        fetch(`${url_api}/perfilCarrinho?nameTag=${usuario_logado}`, {
          cache: "no-store",
        }),
      ]);
      console.log(produtosMercado);
      const data = await response.json();
      const itensCarrinho: ProdutoCarrinhoInterface[] = data.ItensCarrinhos.map(
        (itemLista: any) => {
          const itemMercado = produtosMercado.find(
            (item) => item.id_item_mercado === itemLista.itensMercado
          );

          if (!itemMercado) return null;

          return {
            id_item_carrinho: itemLista.id_ItemCarrinho,
            nome: itemMercado.nome,
            descricao: itemMercado.descricao,
            preco: itemMercado.preco,
            imagem: itemMercado.imagem,
            detalhes: itemLista.detalhes,
            adicionalCor: itemLista.tipoCor.toString(),
            adicionalPlanoDeFundo: itemLista.tipoFundo,
            tipos_de_cor: itemMercado.tipos_de_cor,
            tipos_de_fundo: itemMercado.tipos_de_fundo,
            id_perfil_comprador: itemMercado.perfilComprador,
            id_item_mercado: itemMercado.id_item_mercado,
          };
        }
      ).filter(Boolean); // Remove valores `null`

      setProdutosCarrinho(itensCarrinho);
      // Inicializando o estado de textos com as descrições do carrinho
      const textosIniciais = itensCarrinho.reduce((acc, item, index) => {
        if (item) {
          acc[index] = item.detalhes || "";
        }
        return acc;
      }, {} as { [key: number]: string });

      setTextos(textosIniciais);
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
    }
  }

  async function handleSalvarDetalhes(index: number) {
    try {
      const novo_detalhe = { detalhes: textos[index] };
      console.log(novo_detalhe);
      const response = await fetch(
        `${url_api}/perfilCarrinho?nameTag=${usuario_logado}&id=${index + 1}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novo_detalhe),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar produto");
      }

      const data = await response.json();
      console.log("Produto atualizado:", data);
    } catch (error) {
      console.log("Erro ao atualizar detalhes", error);
    }
  }

  useEffect(() => {
    fetchCarrinho();
  }, []);

  return (
    <div className="w-full h-screen">
      <Header title="Carrinho" />

      <div className="flex w-full h-full">
        <div className="flex-2 p-5 space-y-5">
          {produtosCarrinho.map((produto, index) => (
            <div key={index} className="border rounded-lg shadow-md bg-white">
              <div className="flex items-center gap-6 p-4">
                <div className="w-64 h-64 relative">
                  <Image
                    src={produto.imagem}
                    alt={produto.nome}
                    layout="fill"
                    className="rounded-md object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <h2 className="text-3xl font-semibold">{produto.nome}</h2>
                  <p className="text-lg">{produto.descricao}</p>
                  <p className="text-xl text-green-600 font-bold">
                    {produto.preco}
                  </p>
                </div>
                {/*Div dos botões de editar e excluir */}
                <div className="flex gap-2 flex-col items-center">
                  <button
                    onClick={() => {
                      const toUpdate = !editarOpen[index];
                      const update = Array(produtosCarrinho.length).fill(false);
                      update[index] = toUpdate;
                      setEditarOpen(update);
                    }}
                    className="flex items-center gap-2 px-12 py-2 text-black bg-white border border-blue-700 rounded-md hover:bg-blue-700 transition"
                  >
                    <span className="font-bold">Editar</span>
                  </button>
                  <button
                    onClick={() => removerProduto(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash size={24} />
                  </button>
                </div>
              </div>
              {/* Formulário de Edição */}
              {editarOpen[index] && (
                <div className="flex bg-gray-100">
                  <form
                    onSubmit={(e) => handleSubmit(index, e)}
                    className="p-6 max-w-lg"
                  >
                    <textarea
                      className="w-96 h-64 p-4 border rounded-md shadow-md resize-none"
                      rows={5}
                      value={textos[index] || ""}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Digite os detalhes da arte aqui..."
                    />
                    {erros[index] && (
                      <p className="text-red-500 mt-2">{erros[index]}</p>
                    )}
                    <button
                      type="submit"
                      className="mt-2 px-4 py-2 bg-blue-700 text-white rounded-md"
                    >
                      Salvar Detalhes
                    </button>
                  </form>

                  {/* Seção de Seleção de Cores e Fundos */}
                  <div>
                    <div className="mb-4 pr-5 pt-5">
                      <h3 className="text-lg font-semibold">Selecione a Cor</h3>
                      {Object.entries(produto.tipos_de_cor).map(
                        ([cor, valor]) => {
                          return (
                            <label key={cor} className="block mb-2">
                              <input
                                type="radio"
                                name="cor"
                                value={valor}
                                checked={produto.adicionalCor === cor}
                                onChange={() =>
                                  atualizarAdicional(index, "cor", cor)
                                }
                                className="mr-2"
                              />
                              {cor} - {transformaValor(valor)}
                            </label>
                          );
                        }
                      )}
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">
                        Selecione o Fundo
                      </h3>
                      {Object.entries(produto.tipos_de_fundo).map(
                        ([fundo, valor]) => (
                          <label key={fundo} className="block mb-2">
                            <input
                              type="radio"
                              name="fundo"
                              value={valor}
                              checked={produto.adicionalPlanoDeFundo === fundo}
                              onChange={() =>
                                atualizarAdicional(index, "fundo", fundo)
                              }
                              className="mr-2"
                            />
                            {fundo} - {transformaValor(valor)}
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

        <div className="flex-1 p-5">
          <div className="bg-white shadow-md p-4 rounded-lg h-full flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Resumo do Carrinho</h2>
            <div className="flex-1 overflow-y-auto space-y-4">
              {produtosCarrinho.map((produto, index) => (
                <div key={index}>
                  <ResumoItemCarrinho
                    nome={produto.nome}
                    valor={parseFloat(
                      produto.preco.replace("R$ ", "").replace(",", ".")
                    )}
                    adicional={false}
                  />

                  <ResumoItemCarrinho
                    nome={
                      Object.entries(produto.tipos_de_cor).find(
                        ([cor, _]) => cor === produto.adicionalCor
                      )?.[0]
                    }
                    valor={produto.tipos_de_cor[produto.adicionalCor]}
                    adicional={true}
                  />
                  <ResumoItemCarrinho
                    nome={
                      Object.entries(produto.tipos_de_fundo).find(
                        ([fundo, _]) => fundo == produto.adicionalPlanoDeFundo
                      )?.[0]
                    }
                    valor={
                      produto.tipos_de_fundo[produto.adicionalPlanoDeFundo]
                    }
                    adicional={true}
                  />
                  <Divider />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <p className="text-2xl font-semibold">
                Total: {transformaValor(calcularTotal(produtosCarrinho))}
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
