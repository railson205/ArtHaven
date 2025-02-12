import Image from "next/image";
import { ShoppingCart, DollarSign } from "lucide-react";
import {
  itensSalvosMercado,
  transformaValor,
  url_api,
  usuario_logado,
} from "../constantes";
import { ItensMercadoInterface } from "../interfaces";
import { useEffect, useState } from "react";

export default function ListaItensMercado() {
  const [itensMercado, setItensMercado] =
    useState<ItensMercadoInterface[]>(itensSalvosMercado);

  useEffect(() => {
    const fetchMercado = async () => {
      try {
        const response = await fetch(
          `${url_api}perfilMercado?nameTag=${usuario_logado}`
        );

        const data = await response.json();

        const produtosMercado = data.ItensMercado.map(
          (itemLista: any, index: number) => ({
            id_item_mercado: itemLista.id_ItemMercado,
            nome: itemLista.nome,
            descricao: itemLista.descricao,
            preco: transformaValor(itemLista.preco),
            imagem: `${url_api}${itemLista.foto}`,
            tipos_de_cor: itemLista.tiposCor,
            tipos_de_fundo: itemLista.tiposFundo,
            id_perfil: itemLista.perfil,
          })
        );

        setItensMercado(produtosMercado);
      } catch (error) {
        console.error("Erro na busca", error);
      }
    };
    fetchMercado();
  }, []);

  async function handleClickAddCarrinho(index: number) {
    const item = itensMercado[index];
    const bodyPost = {
      detalhes: "",
      itensMercado: item.id_item_mercado,
      perfilComprador: item.perfilComprador,
      tipoCor: Object.keys(item.tipos_de_cor)[0],
      tipoFundo: Object.keys(item.tipos_de_fundo)[0],
    };
    try {
      const resp = await fetch(
        `${url_api}perfilCarrinho?nameTag=${usuario_logado}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyPost),
        }
      );

      if (!resp.ok) throw new Error("Erro ao criar o produto");

      const data = await resp.json();
      console.log("Produto criado:", data);
    } catch (error) {
      console.error("Erro na requisição POST:", error);
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <p className="text-black font-bold">
        Desenhos abaixo servem apenas de exemplos, ao solicitar vai ser
        referente a qualquer personagem.
      </p>
      {itensMercado.map((produto, index) => (
        <div
          key={produto.id_item_mercado}
          className="flex items-center gap-6 p-4 border rounded-lg shadow-md bg-white"
        >
          {/* Imagem do Produto */}
          <div className="w-64 h-64 relative">
            <Image
              src={produto.imagem}
              alt={produto.nome}
              layout="fill"
              className="rounded-md object-cover"
              unoptimized
            />
          </div>

          {/* Informações do Produto */}
          <div className="flex flex-col flex-1">
            <h2 className="text-lg font-semibold text-black">{produto.nome}</h2>
            <p className="text-sm text-black">{produto.descricao}</p>
            <p className="text-lg font-bold text-green-600">{produto.preco}</p>
          </div>

          {/* Botões */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              onClick={() => handleClickAddCarrinho(index)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#3b82f6",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563eb")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#3b82f6")
              }
            >
              <ShoppingCart size={18} />
              <span>Adicionar ao carrinho</span>
            </button>

            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#22c55e",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#16a34a")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#22c55e")
              }
            >
              <DollarSign size={18} />
              <span>Comprar agora</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
