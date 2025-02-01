"use client";

import Header from "@/public/components/headerbar";
import ListaMercado from "@/public/components/lista_mercado";
import Midias from "@/public/components/lista_midias";
import RedeSocial from "@/public/components/redes_sociais";
import Avaliacao from "@/public/icons/avaliacao";
import Preco from "@/public/icons/preco";
import Rapido from "@/public/icons/rapido";
import Image from "next/image";
import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

// Componentes que você deseja exibir para cada botão
const Curtidas = () => <div>Conteúdo de Curtidas</div>;
const Comunidade = () => <div>Conteúdo de Comunidade</div>;

export default function Perfil() {
  const [selected, setSelected] = useState<string>("Mídias");
  const handleClick = (buttonName: string) => {
    setSelected(buttonName); // Atualiza o estado para o botão selecionado
  };

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
            src="/assets/foto_perfil.jpg"
            alt="Foto de perfil"
            layout="fill" // A imagem vai ocupar 100% da área da div
            objectFit="cover" // A imagem vai cobrir toda a área da div, cortando o excesso para manter a proporção
            className="rounded-lg" // Opcional: para arredondar as bordas do quadrado
          />
        </div>
        <div className="flex justify-start w-full md:w-[60%] lg:w-[50%] px-6 sm:px-12">
          <div className="flex flex-col w-full">
            <p className="text-black text-lg sm:text-xl">Louis Laurent</p>
            <p className="text-black text-sm sm:text-base pt-2">@LouisLrnt</p>

            <div className="flex flex-row pt-4 gap-4">
              <Avaliacao />
              <Preco />
              <Rapido />
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
            Hello! I'm a Concept Artist and Art Director open for new
            opportunities! Instructor at Learnsquared, you can get my first
            course, Dynamic Concept Art I. Here:{" "}
            <a
              href="https://www.learnsquared.com/courses/dynamic-concept-art-i"
              className="text-blue-700 underline"
            >
              https://www.learnsquared.com/courses/dynamic-concept-art-i
            </a>
            Contact:{" "}
            <span className="text-blue-700">laurent.louis16@icloud.com</span>
          </p>
        </div>
      </div>

      {/* Terceira div */}
      <div className="flex-1 bg-white border border-solid border-black p-4 flex flex-row">
        <RedeSocial src="/assets/x-logo.png" alt="Logo x" nome="@LouisLrnt" />
        <RedeSocial
          src="/assets/instagram-logo.webp"
          alt="Logo instagram"
          nome="louislrnt_"
        />
        <RedeSocial
          src="/assets/artstation-logo.webp"
          alt="Logo artstation"
          nome="Louis Laurent"
        />
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
