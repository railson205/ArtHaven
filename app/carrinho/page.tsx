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
  const [texto, setTexto] = useState<string>("");
  const [erro, setErro] = useState<string>("");

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

  const removerProduto = (index: number) => {
    setProdutosCarrinho((prev) => prev.filter((_, i) => i !== index));
    setEditarOpen((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  useEffect(() => {
    //Atualizar
    async function fetchCarrinho() {
      try {
        const resp = await fetch(
          url_api + "perfilCarrinho/?nameTag=" + usuario_logado,
          {
            cache: "no-store",
          }
        );
        const data = await resp.json();
        const itens: ProdutoCarrinhoInterface[] = [];
        data.ItensCarrinhos.map((itemLista: any, index: number) => {
          const itemMercado = produtosSalvoMercado.find((item) => {
            console.log(item.id_item_mercado == itemLista.itensMercado);
            return item.id_item_mercado == itemLista.itensMercado;
          });

          if (itemMercado) {
            const itemCarrinho: ProdutoCarrinhoInterface = {
              id_item_carrinho: itemLista.id_ItemCarrinho,
              nome: itemMercado.nome,
              descricao: itemMercado.descricao,
              preco: itemMercado.preco,
              imagem: itemMercado.imagem,
              adicionalCor: itemLista.tipoCor.toString(),
              //Modificar
              adicionalPlanoDeFundo: "1",
              //adicionalPlanoDeFundo: itemLista.tipoFundo,
              tipos_de_cor: itemMercado.tipos_de_cor,
              tipos_de_fundo: itemMercado.tipos_de_fundo,
            };
            itens.push(itemCarrinho);
          }
        });
        setProdutosCarrinho([...itens]);
      } catch (error) {
        console.error("Erro na busca", error);
      }
    }

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
                    objectFit="cover"
                    className="rounded-md"
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
                              {cor} - R$ {valor.toFixed(2).replace(".", ",")}
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
                            {fundo} - R$ {valor.toFixed(2).replace(".", ",")}
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
                Total: R$
                {calcularTotal(produtosCarrinho).toFixed(2)}
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
