"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa";
import Header from "@/public/components/headerbar";
import ListaMercado from "@/public/components/lista_mercado";
import Midias from "@/public/components/lista_midias";
import RedeSocial from "@/public/components/redes_sociais";
import Avaliacao from "@/public/icons/avaliacao";
import Preco from "@/public/icons/preco";
import Rapido from "@/public/icons/rapido";
import {
  coleta_rede_social,
  perfilSalvo,
  transformarTexto,
  url_api,
  usuario_logado,
} from "@/public/constantes";
import { PerfilInterface } from "@/public/interfaces";

const Curtidas = () => <div>Conteúdo de Curtidas</div>;
const Comunidade = () => <div>Conteúdo de Comunidade</div>;

export default function Perfil() {
  const [perfilInfo, setPerfilInfo] = useState<PerfilInterface>(perfilSalvo);
  const [selected, setSelected] = useState<string>("Mídias");

  const fetchPerfil = async () => {
    try {
      const response = await fetch(
        `${url_api}/perfilMercado?nameTag=${usuario_logado}`
      );
      const text = await response.text();
      const data = JSON.parse(text);

      if (data?.perfil?.length) {
        setPerfilInfo({
          id_perfil: data.perfil[0].id_perfil,
          nome: data.perfil[0].nome,
          nameTag: data.perfil[0].nameTag,
          descricao: data.perfil[0].descricao,
          estrelas: data.perfil[0].estrelas,
          tags: data.perfil[0].tags,
          foto: `${url_api}/${data.perfil[0].foto}` || perfilSalvo.foto,
          outrosSites: data.perfil[0].outrosSites,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  };

  useEffect(() => {
    fetchPerfil();
  }, []);

  const renderComponent = () => {
    switch (selected) {
      case "Mídias":
        return <Midias />;
      case "Curtidas":
        return <Curtidas />;
      case "Comunidade":
        return <Comunidade />;
      case "Mercado":
        return <ListaMercado />;
      default:
        return <div>Selecione uma opção</div>;
    }
  };

  return (
    <div className="grid grid-rows-[1fr_4fr_2fr_8fr] w-full h-screen">
      <Header title="Perfil" />

      <div className="flex flex-row bg-white p-6 gap-8 items-start">
        {/* Imagem de Perfil */}
        <div className="relative w-64 h-64 flex-shrink-0">
          <Image
            src={perfilInfo.foto}
            alt="Foto de perfil"
            layout="fill"
            className="rounded-md object-cover"
            unoptimized
          />
        </div>

        {/* Informações do Perfil */}
        <div className="flex flex-col flex-1 px-6 sm:px-12">
          <p className="text-lg sm:text-xl text-black">{perfilInfo.nome}</p>
          <p className="text-sm sm:text-base pt-2 text-black">
            @{perfilInfo.nameTag}
          </p>

          {/* Avaliação e Tags */}
          <div className="flex flex-row pt-4 gap-4 items-center">
            <Avaliacao avaliacao={perfilInfo.estrelas} />
            {perfilInfo.tags.includes(1) && <Preco />}
            {perfilInfo.tags.includes(2) && <Rapido />}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-row pt-4 gap-2">
            <button className="bg-gray-300 hover:bg-gray-500 text-sm sm:text-base px-4 py-2 rounded-full flex items-center justify-center">
              <p className="text-black">Seguir</p>
            </button>
            <button className="p-2">
              <FaEllipsisV className="text-black" />
            </button>
          </div>
        </div>

        {/* Descrição */}
        <div className="flex-1 h-full p-4 overflow-auto">
          <p className="text-3xl text-black break-words whitespace-pre-line">
            {transformarTexto(perfilInfo.descricao)}
          </p>
        </div>
      </div>

      <div className="bg-white border border-black p-4 flex flex-row">
        {Object.entries(perfilInfo.outrosSites).map(
          ([site, link], index: number) => coleta_rede_social(site, link, index)
        )}
      </div>

      <div className="bg-white p-4">
        <div className="flex space-x-4">
          {["Mídias", "Curtidas", "Comunidade", "Mercado"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelected(tab)}
              className={`text-3xl text-black ${
                selected === tab ? "font-bold underline" : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {renderComponent()}
      </div>
    </div>
  );
}
