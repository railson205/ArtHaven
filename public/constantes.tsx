import RedeSocial from "./components/redes_sociais";
import {
  ItensMercadoInterface,
  PerfilInterface,
  ProdutoCarrinhoInterface,
} from "./interfaces";

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

export const perfilSalvo = {
  id_perfil: "1",
  nome: "Louis Laurent",
  nameTag: "@LouisLrnt",
  estrelas: 5.0,
  tags: [1, 2],
  descricao: "descrição teste",
  foto: "/assets/foto_perfil.jpg",
  outrosSites: {},
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

export const coleta_rede_social = (site: string, link: string, key: number) => {
  const entry = Object.entries(redes_sociais).find(([key]) => key === site);
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

export const itensSalvosMercado: ItensMercadoInterface[] = [
  {
    id_item_mercado: "1",
    nome: "HeadShot",
    descricao: "Desenho da cabeça.",
    preco: "R$ 99,90",
    imagem: "/assets/lista-mercado/produto1.jpeg",
    tipos_de_cor: tiposDeCor,
    tipos_de_fundo: tiposDePlanoDeFundo,
    id_perfil: "1",
  },
  {
    id_item_mercado: "3",
    nome: "FullBody",
    descricao: "Desenho do corpo inteiro.",
    preco: "R$ 199,90",
    imagem: "/assets/lista-mercado/produto3.jpeg",
    tipos_de_cor: tiposDeCor,
    tipos_de_fundo: tiposDePlanoDeFundo,
    id_perfil: "1",
  },
];

export const produtosSalvoMercado: ItensMercadoInterface[] = [
  {
    id_item_mercado: "1b25d534-e0ff-11ef-98ca-f72afb953f06",
    nome: "headshot",
    descricao: "descrição headshot",
    preco: `R$ ${(40.8).toFixed(2).replace(".", ",")}`,
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
    id_perfil: "01944fb7-9f98-4bb9-ba3e-d62c441e4615",
  },
];

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

export const cod_cupom = "DESCONTO10";
