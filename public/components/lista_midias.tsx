import Image from "next/image";
import { imagens_salvas, url_api, usuario_logado } from "../constantes";
import { useEffect, useState } from "react";
import { ListaMidias } from "../interfaces";

export default function Midias() {
  const [lista_midias, setListaMidias] =
    useState<ListaMidias[]>(imagens_salvas);

  const fetchMidias = async () => {
    try {
      const response = await fetch(
        `${url_api}/perfilMidia?nameTag=${usuario_logado}`
      );
      const text = await response.text();
      const data = JSON.parse(text);

      if (data?.Midia?.length > 0) {
        const midiasPerfil = data.Midia.map((itemLista: any) => {
          return {
            id_midia: itemLista.id_Midia,
            imagem: `${url_api}${itemLista.foto}`,
            data_postagem: itemLista.dataPostagem || "",
            id_perfil: itemLista.id_Perfil,
          };
        });
        setListaMidias([...midiasPerfil]);
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  };

  useEffect(() => {
    fetchMidias();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", // Ajustado para 3 por linha
        gap: "16px",
        padding: "16px",
      }}
    >
      {lista_midias.map((midia, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            maxWidth: "400px", // Aumentado para manter proporção
            backgroundColor: "#f4f4f4",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "350px", // Aumentado para manter proporção
            }}
          >
            <Image
              src={midia.imagem}
              alt={`Imagem ${index + 1}`}
              width={400}
              height={350}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
              }}
              unoptimized
            />
          </div>
        </div>
      ))}
    </div>
  );
}
