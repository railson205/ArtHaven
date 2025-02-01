import Image from "next/image";
import { ShoppingCart, DollarSign } from "lucide-react";
import produtos from "../produtos";

export default function ListaProdutos() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <p style={{ color: "black", fontWeight: "bold" }}>
        Desenhos abaixo servem apenas de exemplos, ao solicitar vai ser
        referente a qualquer personagem.
      </p>
      {Object.values(produtos).map((produto) => (
        <div
          key={produto.id}
          className="flex items-center gap-6 p-4 border rounded-lg shadow-md bg-white"
        >
          {/* 1️⃣ Imagem do Produto */}
          <div className="w-64 h-64 relative">
            <Image
              src={produto.imagem}
              alt={produto.nome}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>

          {/* 2️⃣ Informações do Produto */}
          <div className="flex flex-col flex-1">
            <h2 className="text-lg font-semibold text-black">{produto.nome}</h2>
            <p className="text-sm text-black">{produto.descricao}</p>
            <p
              className="text-lg "
              style={{ color: "green", fontWeight: "bold" }}
            >
              {produto.preco}
            </p>
          </div>

          {/* 3️⃣ Botões */}
          <div className="flex gap-2 flex-col">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              <ShoppingCart size={18} />
              <span style={{ fontWeight: "bold" }}>Adicionar ao carrinho</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 text-white rounded-md hover:bg-green-600 transition"
              style={{ backgroundColor: "rgba(0,255,0,0.6)" }}
            >
              <DollarSign size={18} />
              <span style={{ fontWeight: "bold" }}>Comprar agora</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
