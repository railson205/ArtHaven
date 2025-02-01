interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
}

const produtos: Record<number, Produto> = {
  1: {
    id: 1,
    nome: "HeadShot",
    descricao: "Desenho da cabeça.",
    preco: "R$ 99,90",
    imagem: "/assets/lista-mercado/produto1.jpeg",
  },
  2: {
    id: 2,
    nome: "Bust",
    descricao: "Desenho da cabeça, pescoço e tronco.",
    preco: "R$ 149,90",
    imagem: "/assets/lista-mercado/produto2.jpeg",
  },
  3: {
    id: 3,
    nome: "FullBody",
    descricao: "Desenho do corpo inteiro.",
    preco: "R$ 199,90",
    imagem: "/assets/lista-mercado/produto3.jpeg",
  },
};

export default produtos;
