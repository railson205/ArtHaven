"use client";

import { Botao_historico } from "@/public/components/botoes_historico";
import Header from "@/public/components/headerbar";
import ModalDenuncia from "@/public/components/modal_denuncia";
import {
  formatarData,
  icons_pagamento,
  itensSalvosMercado,
  produtos_historico as produtos_historico_salvos,
  removerAcentosEConverterMinusculas,
  transformaValor,
  url_api,
  usuario_logado,
} from "@/public/constantes";
import { ProdutoHistorico } from "@/public/interfaces";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HistoricoCompras() {
  const [modalDenunciaOpen, setModalDenunciaOpen] = useState<boolean>(false);
  const [produtosHistorico, setProdutoHistorico] = useState<ProdutoHistorico[]>(
    []
  );
  const [detalhesOpen, setDetalhesOpen] = useState<boolean[]>(
    Array(produtos_historico_salvos.length).fill(false)
  );

  async function fetchHistorico() {
    try {
      const response = await fetch(
        `${url_api}/perfilCompras?nameTag=${usuario_logado}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      const itensHistorico: ProdutoHistorico[] = data.Compras.map(
        (itemLista: any) => {
          return {
            id: itemLista.id.toString(),
            imagem: `${url_api}${itemLista.imagem}`,
            data_pedido: itemLista.data_pedido,
            data_entrega: itemLista.data_entrega || "",
            nome_artista: itemLista.nome_artista,
            status: itemLista.status,
            alerta: itemLista.alerta,
            metodo_pagamento: itemLista.metodo_pagamento,
            tipo_pedido: itemLista.tipo_pedido,
            preco_pedido: itemLista.preco_pedido,
            adicionais: itemLista.adicionais,
            detalhes_valor: itemLista.detalhes_pedido,
          };
        }
      );
      setProdutoHistorico([...itensHistorico]);
    } catch (error) {
      console.error("Erro na requisição dos itens do historico", error);
    }
  }

  useEffect(() => {
    fetchHistorico();
    //setProdutoHistorico(produtos_historico_salvos);
  }, []);

  return (
    <div>
      <div className="flex-1">
        <Header title="Histórico de compras" />
      </div>
      {produtosHistorico.map((produto, index) => {
        //Calcular o subtotal do produto
        const subtotal =
          produto.preco_pedido +
          produto.adicionais.reduce(
            (sum, adicional) => sum + adicional.valor,
            0
          );

        // Calcular os descontos e o total final
        const valorParticao = subtotal * produto.detalhes_valor.particao;
        const valorDesconto = valorParticao + produto.detalhes_valor.cupom;
        const totalFinal = subtotal - valorDesconto;
        return (
          <div
            key={index}
            style={{ backgroundColor: "#D9D9D9", marginBottom: 5, padding: 10 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: 15,
              }}
            >
              <div>
                <button
                  onClick={() => {
                    const toUpdate = !detalhesOpen[index];
                    const update = Array(produtos_historico_salvos.length).fill(
                      false
                    );
                    update[index] = toUpdate;
                    setDetalhesOpen(update);
                  }}
                  className="flex items-center gap-2 px-5 py-5 text-black bg-white border border-blue-700 rounded-md hover:bg-blue-700 transition"
                >
                  {detalhesOpen[index] ? (
                    <ChevronRight size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </button>
              </div>
              {/*Imagem do produto */}
              <div className="mr-10 ml-10 w-64 h-64 relative">
                <Image
                  src={produto.imagem}
                  alt={produto.imagem}
                  layout="fill"
                  className="rounded-md object-cover"
                  unoptimized
                />
              </div>
              {/*Dados gerais */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  width: "15%",
                }}
              >
                <div>
                  <p>Data do pedido: {formatarData(produto.data_pedido)}</p>
                  <p>Data de entrega: {formatarData(produto.data_entrega)}</p>
                </div>
                <p style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                  Nome do artista: {produto.nome_artista}
                </p>
                <div>
                  <p>Valor total: {transformaValor(subtotal)}</p>
                  <p>Valor pago: {transformaValor(totalFinal)}</p>
                </div>
              </div>
              {/*Status e Alerta */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 20,
                  backgroundColor: "white",
                  borderRadius: 5,
                  flex: 1,
                  padding: 10,
                }}
              >
                <p className="mb-5">Status: {produto.status}</p>
                <p style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                  Alerta: {produto.alerta}
                </p>
              </div>
            </div>
            {detalhesOpen[index] && (
              <div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    width: "40%",
                    alignContent: "space-between",
                  }}
                >
                  {/*Método de pagamento */}
                  <div style={{ flex: 1, padding: 5 }}>
                    <h1
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        marginBottom: 5,
                      }}
                    >
                      Método de pagamento
                    </h1>
                    <div
                      style={{
                        backgroundColor: "white",
                        borderRadius: 5,
                        display: "flex",
                        flexDirection: "row",
                        padding: 10,
                        width: "50%",
                      }}
                    >
                      {icons_pagamento[
                        removerAcentosEConverterMinusculas(
                          produto.metodo_pagamento.tipo
                        ) as keyof typeof icons_pagamento
                      ] || <span>Ícone não disponível</span>}
                      <div>
                        <p style={{ marginLeft: 5 }}>
                          {produto.metodo_pagamento.tipo}
                        </p>
                        {["debito", "credito"].includes(
                          removerAcentosEConverterMinusculas(
                            produto.metodo_pagamento.tipo
                          )
                        ) && (
                          <p style={{ marginLeft: 5 }}>
                            Final: {produto.metodo_pagamento.final}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Detalhes do pedido */}
                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <h1
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        marginBottom: 5,
                      }}
                    >
                      Detalhes do pedido
                    </h1>
                    <div
                      style={{
                        flex: 1,
                        padding: 10,
                        backgroundColor: "white",
                        borderRadius: 5,
                      }}
                    >
                      <div key={index}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            fontWeight: "bold",
                          }}
                        >
                          <p>{produto.tipo_pedido}</p>
                          <p>{transformaValor(produto.preco_pedido)}</p>
                        </div>

                        {/* Lista de adicionais */}
                        {produto.adicionais.map((adicional, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              paddingLeft: "1rem",
                            }}
                          >
                            <p>{adicional.nome}</p>
                            <p>{transformaValor(adicional.valor)}</p>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop: "1rem" }}>
                        <hr />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>Subtotal:</p>
                          <p>{transformaValor(subtotal)}</p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>
                            Valor Partição (
                            {produto.detalhes_valor.particao * 100}%):
                          </p>
                          <p>- {transformaValor(valorParticao)}</p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>Cupom:</p>
                          <p>
                            - {transformaValor(produto.detalhes_valor.cupom)}
                          </p>
                        </div>
                        <hr />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "bold",
                          }}
                        >
                          <p>Total Final:</p>
                          <p>{transformaValor(totalFinal)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "40%",
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <Botao_historico nome="Pagar" clicar={() => {}} />
                  <Botao_historico nome="Cancelar pedido" clicar={() => {}} />
                  <Botao_historico
                    nome="Denunciar"
                    clicar={() => {
                      setModalDenunciaOpen(true);
                    }}
                  />
                  <Botao_historico nome="Baixar arquivos" clicar={() => {}} />
                </div>
              </div>
            )}
            {/*Pop Up Denúncia */}
            {modalDenunciaOpen && (
              <ModalDenuncia
                id={produto.id}
                fecharModal={() => setModalDenunciaOpen(false)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
