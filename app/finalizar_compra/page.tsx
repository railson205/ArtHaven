"use client";

import Divider from "@/public/components/divider";
import Header from "@/public/components/headerbar";
import {
  calcularTotal,
  cod_cupom as cod_cupom_valido,
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

  // Função para verificar o código do cupom e aplicar o desconto
  const handleChangeCupom = () => {
    if (codigoCupom === cod_cupom_valido) {
      setValorCupom(10);
      setValorDesconto(total * valorParticao + 10);
      setMensagem("Código do cupom válido!");
      setCodigoCupom("");
    } else setMensagem("Código do cupom inválido!");
  };

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("resumo do carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

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
                Pagar 50% -R$ {(0.5 * total).toFixed(2)}
              </label>
            </div>
            <Divider />
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
                  Alterar
                </button>
              </div>
            </div>
            <Divider />
            <div>
              <p>Cupom</p>
              <div className="flex justify-between">
                <input
                  type="text"
                  value={codigoCupom}
                  onChange={(e) => setCodigoCupom(e.target.value)} // Atualiza o estado com o texto digitado
                  placeholder="Digite o código do cupom"
                  className="border border-solid px-4 py-2 rounded-md"
                />
                <button
                  onClick={handleChangeCupom} // Aqui você pode passar o valor e o desconto
                  className="border border-solid px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-500 transition"
                >
                  Aplicar
                </button>
              </div>
              {mensagem && <p>{mensagem}</p>}{" "}
              {/* Exibe a mensagem com base na validação */}
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
              {/**Modificar para apertar em pagar apagar o carrinho */}
              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <p className="text-2xl font-semibold">
                  Total: R$ {(total - valorDesconto).toFixed(2)}
                </p>
                <Link href="/">
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
