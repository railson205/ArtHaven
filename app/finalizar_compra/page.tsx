"use client";

import Divider from "@/public/components/divider";
import Header from "@/public/components/headerbar";
import {
  calcularTotal,
  cod_cupom as cod_cupom_valido,
  transformaValor,
  url_api,
  usuario_logado,
} from "@/public/constantes";
import { ProdutoCarrinhoInterface } from "@/public/interfaces";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ResumoItemCarrinho } from "@/public/components/resumo_carrinho";

export default function FinalizarCompra() {
  const [valorParticao, setValorParticao] = useState<number>(0);
  const [carrinho, setCarrinho] = useState<ProdutoCarrinhoInterface[]>([]);
  const total = calcularTotal(carrinho);
  const [valorCupom, setValorCupom] = useState(0);
  const [valorDesconto, setValorDesconto] = useState(0);
  const [codigoCupom, setCodigoCupom] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [metodoPagamento, setMetodoPagamento] = useState("Débito"); // Padrão inicial
  const [numerosFinais, setNumerosFinais] = useState("8432"); // Número final do cartão

  // Verifica o código do cupom e aplica o desconto
  const handleChangeCupom = () => {
    if (codigoCupom === cod_cupom_valido) {
      setValorCupom(10);
      setValorDesconto(total * valorParticao + 10);
      setMensagem("Código do cupom válido!");
      setCodigoCupom("");
    } else setMensagem("Código do cupom inválido!");
  };

  const handleFinalizarCompra = async () => {
    try {
      const bodyPost: any[] = [];
      carrinho.map((item) => {
        const post = {
          id_perfil_comprador: item.id_perfil_comprador,
          metodo_pagamento: { tipo: metodoPagamento, final: numerosFinais },
          id_item_mercado: item.id_item_mercado,
          detalhes: item.detalhes,
          tipo_cor: item.adicionalCor,
          tipo_fundo: item.adicionalPlanoDeFundo,
          particao: valorParticao,
          cupom: valorCupom,
        };
        bodyPost.push(post);
      });
      const resp = await fetch(
        `${url_api}/perfilCompras?nameTag=${usuario_logado}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyPost),
        }
      );

      if (!resp.ok) throw new Error("Erro ao finalizar compra");

      const data = await resp.json();
      console.log("Produto criado:", data);
    } catch (error) {
      console.error("Erro na requisição POST:", error);
    }
  };

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("resumo do carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  // Atualiza o método de pagamento
  const handleMetodoPagamentoChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const novoMetodo = e.target.value;
    setMetodoPagamento(novoMetodo);

    if (novoMetodo === "Débito" || novoMetodo === "Crédito") {
      setNumerosFinais(""); // Limpa o campo para forçar o usuário a digitar novamente
    } else {
      setNumerosFinais(""); // Remove os números finais se não for cartão
    }
  };

  return (
    <div>
      <div className="flex-1">
        <Header title="Finalizar Compra" />
      </div>
      <div className="flex-1 flex p-4 flex-2">
        <div className="flex-2">
          {/* Partição dos pagamentos */}
          <div about="Partição">
            <h1 className="text-3xl">Partição dos pagamentos</h1>
            <p>
              O pagamento atual será de 50% do valor da compra e será necessário
              pagar os outros 50% para receber a arte final.
            </p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Selecione a Partição</h3>
              <label className="block mb-2">
                <input
                  type="radio"
                  name="pagamento"
                  checked={valorParticao === 0}
                  onChange={() => {
                    setValorParticao(0);
                    setValorDesconto(total * 0 + valorCupom);
                  }}
                  className="mr-2"
                />
                Pagar Tudo -R$ 0.00
              </label>
              <label className="block mb-2">
                <input
                  type="radio"
                  name="pagamento"
                  checked={valorParticao === 0.5}
                  onChange={() => {
                    setValorParticao(0.5);
                    setValorDesconto(total * 0.5 + valorCupom);
                  }}
                  className="mr-2"
                />
                Pagar 50% - {transformaValor(0.5 * total)}
              </label>
            </div>
            <Divider />
            <div>
              <p className="text-3xl">Método de Pagamento</p>
              <div className="pt-4">
                <div className="flex items-center">
                  <CreditCard size={30} />
                  <div className="pl-5">
                    <select
                      value={metodoPagamento}
                      onChange={handleMetodoPagamentoChange}
                      className="border border-gray-400 rounded-md px-2 py-1"
                    >
                      <option value="Pix">Pix</option>
                      <option value="Dinheiro">Dinheiro</option>
                      <option value="Débito">Débito</option>
                      <option value="Crédito">Crédito</option>
                    </select>
                    {["Débito", "Crédito"].includes(metodoPagamento) && (
                      <input
                        type="text"
                        value={numerosFinais}
                        onChange={(e) => setNumerosFinais(e.target.value)}
                        placeholder="Últimos 4 dígitos"
                        maxLength={4}
                        className="ml-3 border border-gray-400 rounded-md px-2 py-1 w-20"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div>
              <p>Cupom</p>
              <div className="flex justify-between">
                <input
                  type="text"
                  value={codigoCupom}
                  onChange={(e) => setCodigoCupom(e.target.value)}
                  placeholder="Digite o código do cupom"
                  className="border border-solid px-4 py-2 rounded-md"
                />
                <button
                  onClick={handleChangeCupom}
                  className="border border-solid px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-500 transition"
                >
                  Aplicar
                </button>
              </div>
              {mensagem && <p>{mensagem}</p>}
            </div>
          </div>
        </div>
        <div className="flex-1 ml-5 pl-4 justify-between w-full">
          <div className="h-full">
            <h1 className="text-3xl">Resumo do Carrinho</h1>
            <div className="flex-1 overflow-y-auto space-y-4">
              {carrinho.map((produto, index) => (
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
              <ResumoItemCarrinho
                nome={"Partição"}
                valor={valorParticao * total}
                adicional={false}
              />
              <ResumoItemCarrinho
                nome={"Cupom"}
                valor={valorCupom}
                adicional={false}
              />
              <ResumoItemCarrinho
                nome={"Desconto"}
                valor={valorDesconto}
                adicional={false}
              />

              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <p className="text-2xl font-semibold">
                  Total: {transformaValor(total - valorDesconto)}
                </p>
                <Link href={"/"}>
                  <button
                    onClick={handleFinalizarCompra}
                    className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
                  >
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
