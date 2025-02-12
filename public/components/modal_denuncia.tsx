"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { tipos_denuncia } from "../constantes";

interface ModalDenunciaProps {
  id: string;
  fecharModal: () => void;
}

export default function ModalDenuncia({ id, fecharModal }: ModalDenunciaProps) {
  const [denunciaSelecionada, setDenunciaSelecionada] = useState<string>(
    tipos_denuncia[0]
  );
  const [motivoOutro, setMotivoOutro] = useState("");
  const [detalhesDenuncia, setDetalhesDenuncia] = useState("");

  const enviarDenuncia = () => {
    console.log("Denúncia enviada:", {
      id,
      denunciaSelecionada,
      motivoOutro: denunciaSelecionada === "Outros" ? motivoOutro : "",
      detalhesDenuncia,
    });

    // Aqui você pode adicionar a lógica para enviar a denúncia para um backend

    fecharModal(); // Fecha o modal após enviar
  };

  // Desabilitar o scroll quando o modal abrir
  useEffect(() => {
    if (denunciaSelecionada) {
      document.body.style.overflow = "hidden"; // Desabilita o scroll
    } else {
      document.body.style.overflow = "auto"; // Habilita o scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Restaura o scroll ao desmontar
    };
  }, [denunciaSelecionada]);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "rgba(0,0,0,0.3)",
        position: "fixed", // Mudar para fixed para garantir que fica fixo na tela
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000, // Garantir que está sobre outros elementos
        justifyContent: "center",
        alignItems: "center", // Centraliza o modal na tela
        padding: "5%",
      }}
    >
      <div
        style={{
          backgroundColor: "#D9D9D9",
          borderRadius: 5,
          width: "100%",
          maxWidth: "600px", // Máximo de largura para o modal
          height: "100%",
          overflowY: "auto", // Permite rolagem dentro do modal, se necessário
        }}
      >
        {/* Título e Botão de fechar */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            paddingLeft: 5,
            paddingRight: 10,
            paddingTop: 5,
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: 32 }}>Denúncia</p>
          <button
            onClick={fecharModal}
            style={{ backgroundColor: "white", borderRadius: 5, padding: 5 }}
          >
            <X size={32} />
          </button>
        </div>

        {/* Dropbox */}
        <div style={{ padding: 10 }}>
          <p style={{ fontSize: 24 }}>Selecione o motivo da denúncia</p>
          <select
            value={denunciaSelecionada}
            onChange={(e) => setDenunciaSelecionada(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tipos_denuncia.map((tipo, index) => (
              <option key={index} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>

          {/* Motivo personalizado caso escolha "Outros" */}
          {denunciaSelecionada === "Outros" && (
            <textarea
              value={motivoOutro}
              onChange={(e) => setMotivoOutro(e.target.value)}
              placeholder="Qual foi o motivo?"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                resize: "none",
                overflowY: "auto",
                height: "100px",
                marginTop: "10px",
              }}
            />
          )}
        </div>

        {/* Detalhes */}
        <div style={{ padding: 10, width: "100%" }}>
          <p style={{ fontSize: 24 }}>Explique-nos o que aconteceu</p>
          <textarea
            value={detalhesDenuncia}
            onChange={(e) => setDetalhesDenuncia(e.target.value)}
            placeholder="Explique-nos o que aconteceu..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              resize: "none",
              overflowY: "auto",
              height: "150px",
              marginTop: "10px",
            }}
          />
        </div>

        {/* Botão de Enviar */}
        <div style={{ padding: 10, display: "flex", justifyContent: "center" }}>
          <button
            onClick={enviarDenuncia}
            style={{
              backgroundColor: "#3B82F6",
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563EB")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#3B82F6")
            }
          >
            Enviar denúncia
          </button>
        </div>
      </div>
    </div>
  );
}
