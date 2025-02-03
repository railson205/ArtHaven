"use client";

import Header from "@/public/components/headerbar";
import ListaMercado from "@/public/components/lista_mercado";
import Midias from "@/public/components/lista_midias";
import RedeSocial from "@/public/components/redes_sociais";
import { perfilSalvo, url_api, usuario_logado } from "@/public/constantes";
import Avaliacao from "@/public/icons/avaliacao";
import Preco from "@/public/icons/preco";
import Rapido from "@/public/icons/rapido";
import { PerfilInterface, RedeSocialInterface } from "@/public/interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

// Componentes que você deseja exibir para cada botão
const Curtidas = () => <div>Conteúdo de Curtidas</div>;
const Comunidade = () => <div>Conteúdo de Comunidade</div>;

export default function Perfil() {
  const [perfilInfo, setPerfilInfo] = useState<PerfilInterface>(perfilSalvo);
  const [selected, setSelected] = useState<string>("Mídias");
  const handleClick = (buttonName: string) => {
    setSelected(buttonName); // Atualiza o estado para o botão selecionado
  };
  const [data_resp, setData] = useState();

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const resp = await fetch(
          url_api + "perfilMercado/?nameTag=" + usuario_logado
        );
        const data = await resp.json();
        const perfil: PerfilInterface = {
          id_perfil: data.perfil[0].id_perfil,
          nome: data.perfil[0].nome,
          nameTag: data.perfil[0].nameTag,
          estrelas: data.perfil[0].estrelas,
          tags: [1, 2],
          descricao: data.perfil[0].descricao,
          //Modificar
          foto: perfilSalvo.foto,
          //foto:data.perfil[0].foto,
          redes_sociais: perfilSalvo.redes_sociais,
        };
        setPerfilInfo(perfil);
      } catch (error) {
        console.error("Erro na busca", error);
      }
    }
    fetchPerfil();
  }, []);

  // Função para renderizar o componente correspondente
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
      {/* Primeira div */}
      <div className="flex-1">
        <Header title="Perfil" />
      </div>

      {/* Segunda div */}
      <div className="flex-1 flex flex-row bg-white p-4">
        <div className="relative w-64 h-64">
          {/* w-64 e h-64 criam um quadrado */}
          <Image
            src={perfilInfo.foto}
            alt="Foto de perfil"
            layout="fill" // A imagem vai ocupar 100% da área da div
            objectFit="cover" // A imagem vai cobrir toda a área da div, cortando o excesso para manter a proporção
            className="rounded-lg" // Opcional: para arredondar as bordas do quadrado
          />
        </div>
        <div className="flex justify-start w-full md:w-[60%] lg:w-[50%] px-6 sm:px-12">
          <div className="flex flex-col w-full">
            <p className="text-black text-lg sm:text-xl">{perfilInfo.nome}</p>
            <p className="text-black text-sm sm:text-base pt-2">
              {perfilInfo.nameTag}
            </p>

            <div className="flex flex-row pt-4 gap-4">
              <Avaliacao avaliacao={perfilInfo.estrelas} />
              {perfilInfo.tags[0] == 1 && <Preco />}
              {perfilInfo.tags[1] == 2 && <Rapido />}
            </div>

            <div className="flex flex-row pt-4 gap-2">
              <button className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 bg-gray-300 rounded-full hover:bg-gray-500 text-sm sm:text-base p-2">
                <p className="text-black">Seguir</p>
              </button>
              <button className="p-2">
                <FaEllipsisV style={{ color: "black" }} />
              </button>
            </div>
          </div>
        </div>

        <div className="h-full w-full p-4 overflow-auto">
          <p className="text-3xl text-black break-words">
            {perfilInfo.descricao}
          </p>
        </div>
      </div>

      {/* Terceira div */}
      <div className="flex-1 bg-white border border-solid border-black p-4 flex flex-row">
        {/*Modificar */}
        {Object(perfilInfo.redes_sociais).map(
          (rede_social: RedeSocialInterface, index: number) => (
            <RedeSocial
              key={index}
              src={rede_social.imagem}
              alt={rede_social.nome_imagem}
              nametag={rede_social.nametag}
            />
          )
        )}
      </div>

      {/* Quarta div */}
      <div className="flex-1 bg-white p-4">
        <div className="flex space-x-4">
          <button
            onClick={() => handleClick("Mídias")}
            className={`text-3xl text-black ${
              selected === "Mídias" ? "font-bold underline" : ""
            }`}
          >
            Mídias
          </button>
          <button
            onClick={() => handleClick("Curtidas")}
            className={`text-3xl text-black ${
              selected === "Curtidas" ? "font-bold underline" : ""
            }`}
          >
            Curtidas
          </button>
          <button
            onClick={() => handleClick("Comunidade")}
            className={`text-3xl text-black ${
              selected === "Comunidade" ? "font-bold underline" : ""
            }`}
          >
            Comunidade
          </button>
          <button
            onClick={() => handleClick("Mercado")}
            className={`text-3xl text-black ${
              selected === "Mercado" ? "font-bold underline" : ""
            }`}
          >
            Mercado
          </button>
        </div>
        {renderComponent()}
      </div>
    </div>
  );
}
