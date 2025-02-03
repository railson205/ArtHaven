export interface PerfilInterface {
  id_perfil: string;
  foto: string;
  nome: string;
  nameTag: string;
  estrelas: number;
  tags: number[];
  descricao: string;
  redes_sociais: RedeSocialInterface[];
}

export interface RedeSocialInterface {
  imagem: string;
  nome_imagem: string;
  nametag: string;
}

export interface ItensMercadoInterface {
  id_item_mercado: string;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  tipos_de_cor: Record<string, number>;
  tipos_de_fundo: Record<string, number>;
  id_perfil: string;
}

export interface ProdutoCarrinhoInterface {
  id_item_carrinho: string;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  adicionalCor: string;
  adicionalPlanoDeFundo: string;
  tipos_de_cor: Record<string, number>;
  tipos_de_fundo: Record<string, number>;
}
