import { CreditCard, ReceiptText } from "lucide-react";
import RedeSocial from "./components/redes_sociais";
import {
  ItensMercadoInterface,
  PerfilInterface,
  ProdutoCarrinhoInterface,
  ProdutoHistorico,
} from "./interfaces";
import { FaPix } from "react-icons/fa6";
import { FaCcPaypal } from "react-icons/fa";
import { ReactNode } from "react";

export const transformaValor = (valor: number) =>
  `R$ ${valor.toFixed(2).replace(".", ",")}`;

export const usuario_logado = "LouisLrnt";
export const url_api = "http://127.0.0.1:8000/";

export const precoBaseCor = 50;
export const precoBasePlanoDeFundo = 0;

export const tiposDeCor = {
  "Preto e Branco": precoBaseCor,
  "Cor Chapada": 65,
  Sombreado: 85,
};

export const tiposDePlanoDeFundo = {
  "Sem Fundo": precoBasePlanoDeFundo,
  "Com Fundo": 15,
};

export const perfilSalvo = {
  id_perfil: "1",
  nome: "Louis Laurent",
  nameTag: "LouisLrnt",
  estrelas: 5.0,
  tags: [1, 2],
  descricao: "descrição teste",
  foto: "/assets/foto_perfil.jpg",
  outrosSites: { x: "https://x.com/uryuuminene18" },
};

const redes_sociais = {
  x: {
    imagem: "/assets/x-logo.png",
    nome_imagem: "Logo x",
  },
  instagram: {
    imagem: "/assets/instagram-logo.webp",
    nome_imagem: "Logo instagram",
  },
};

export const itensSalvosMercado: ItensMercadoInterface[] = [
  {
    id_item_mercado: "1",
    nome: "HeadShot",
    descricao: "Desenho da cabeça.",
    preco: "R$ 99,90",
    imagem: "/assets/lista-mercado/produto1.jpeg",
    tipos_de_cor: tiposDeCor,
    tipos_de_fundo: tiposDePlanoDeFundo,
    perfilComprador: "1",
  },
  {
    id_item_mercado: "3",
    nome: "FullBody",
    descricao: "Desenho do corpo inteiro.",
    preco: "R$ 199,90",
    imagem: "/assets/lista-mercado/produto3.jpeg",
    tipos_de_cor: tiposDeCor,
    tipos_de_fundo: tiposDePlanoDeFundo,
    perfilComprador: "1",
  },
];

export const produtosSalvoMercado: ItensMercadoInterface[] = [
  {
    id_item_mercado: "1b25d534-e0ff-11ef-98ca-f72afb953f06",
    nome: "headshot",
    descricao: "descrição headshot",
    preco: transformaValor(40.8),
    imagem: "/assets/lista-mercado/produto1.jpeg",
    tipos_de_cor: {
      "1": 10.3,
      "2": 20.4,
      "3": 30.5,
    },
    tipos_de_fundo: {
      "1": 10.3,
      "2": 20.4,
    },
    perfilComprador: "01944fb7-9f98-4bb9-ba3e-d62c441e4615",
  },
];

export const produtos_historico: ProdutoHistorico[] = [
  {
    id: "1",
    imagem: itensSalvosMercado[0].imagem,
    data_pedido: "2024-02-01",
    data_entrega: "2024-02-05",
    nome_artista: "Ana Souza",
    status: "Entregue",
    alerta: "Nenhum",
    metodo_pagamento: { tipo: "Débito", final: "8432" },
    tipo_pedido: "HeadShot",
    preco_pedido: 50,
    adicionais: [
      { nome: "Preto e Branco", valor: 50 },
      { nome: "Sem Fundo", valor: 0 },
    ],
    detalhes_valor: { particao: 0, cupom: 0 },
  },
  {
    id: "2",
    imagem: itensSalvosMercado[1].imagem,
    data_pedido: "2024-01-20",
    data_entrega: "2024-01-25",
    nome_artista: "Carlos Lima",
    status: "Pago Parcialmente",
    alerta: "Restante pendente",
    metodo_pagamento: { tipo: "Crédito", final: "1527" },
    tipo_pedido: "FullBody",
    preco_pedido: 175,
    adicionais: [
      { nome: "Chapada", valor: 65 },
      { nome: "Com Fundo", valor: 50 },
    ],

    detalhes_valor: { particao: 0.5, cupom: 30 },
  },
  {
    id: "3",
    imagem: itensSalvosMercado[0].imagem,
    data_pedido: "2024-01-10",
    data_entrega: "2024-01-15",
    nome_artista: "Beatriz Mendes",
    status: "Entregue",
    alerta: "Nenhum",
    metodo_pagamento: { tipo: "Pix", final: "N/A" },
    tipo_pedido: "HeadShot",
    preco_pedido: 50,
    adicionais: [
      { nome: "Preto e Branco", valor: 50 },
      { nome: "Sem Fundo", valor: 0 },
    ],
    detalhes_valor: { particao: 0, cupom: 0 },
  },
];

export const tipos_denuncia = [
  "Artista pedindo pagamento externos",
  "Artista pedindo valores a mais",
  "Artista não entregou a arte combinada",
  "Artista não entregou a arte finalizada",
  "Artista não é o verdadeiro",
  "Artista se recusando a finalizar o pedido",
  "Outros",
];

export const cod_cupom = "DESCONTO10";
export const telas = {
  Perfil: "/",
  "Histórico de Compras": "/historico",
};

const tamanho_icons = 50;

export const icons_pagamento: Record<string, ReactNode> = {
  crédito: <CreditCard size={tamanho_icons} />,
  débito: <CreditCard size={tamanho_icons} />,
  boleto: <ReceiptText size={tamanho_icons} />,
  pix: <FaPix size={tamanho_icons} />,
  paypal: <FaCcPaypal size={tamanho_icons} />,
};

export const transformarTexto = (texto: string) => {
  const regex = /(https?:\/\/[^\s]+)|([\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,6})/g;

  return texto.split(regex).map((parte, index) => {
    if (!parte) return null;

    if (parte.startsWith("http")) {
      return (
        <a
          key={index}
          href={parte}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#3b82f6", textDecoration: "underline" }}
        >
          {parte}
        </a>
      );
    } else if (parte.includes("@")) {
      return (
        <a
          key={index}
          href={`mailto:${parte}`}
          style={{ color: "#3b82f6", textDecoration: "underline" }}
        >
          {parte}
        </a>
      );
    }
    return <span key={index}>{parte}</span>;
  });
};

export const coleta_rede_social = (site: string, link: string, key: number) => {
  const entry = Object.entries(redes_sociais).find(
    ([key]) => key.toLowerCase() === site.toLowerCase()
  );
  const { imagem = "", nome_imagem = "" } = entry ? entry[1] : {};
  console.log();
  const tag = link
    .split("/")
    .filter(
      (item) => item && !item.includes("http") && !item.includes(".com")
    )[0];
  const nametag = tag ? `@${tag}` : "";
  return (
    <RedeSocial key={key} src={imagem} alt={nome_imagem} nametag={nametag} />
  );
};

export const calcularTotal = (carrinho: ProdutoCarrinhoInterface[]): number => {
  return carrinho.reduce((total, item) => {
    // Converter preço de "R$ 40,80" para número (40.80)
    const precoBase = parseFloat(
      item.preco.replace("R$ ", "").replace(",", ".")
    );

    // Obter valores adicionais
    const adicionalCor = item.tipos_de_cor[item.adicionalCor] || 0;
    const adicionalFundo = item.tipos_de_fundo[item.adicionalPlanoDeFundo] || 0;

    // Somar tudo
    return total + precoBase + adicionalCor + adicionalFundo;
  }, 0);
};

const b = [
  {
    tipo: "FullBody",
    preco: 175,
    adicionais: [
      { nome: "Chapada", valor: 65 },
      { nome: "Com Fundo", valor: 50 },
    ],
  },
  {
    tipo: "HeadShot",
    preco: 50,
    adicionais: [
      { nome: "Preto e Branco", valor: 50 },
      { nome: "Sem Fundo", valor: 0 },
    ],
  },
];
