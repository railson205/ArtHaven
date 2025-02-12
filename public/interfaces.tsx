export interface PerfilInterface {
  id_perfil: string;
  nome: string;
  nameTag: string;
  descricao: string;
  estrelas: number;
  foto: string;
  tags: number[];
  outrosSites: Record<string, string>;
}

export interface ItensMercadoInterface {
  id_item_mercado: string;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  tipos_de_cor: Record<string, number>;
  tipos_de_fundo: Record<string, number>;
  perfilComprador: string;
}

export interface ProdutoCarrinhoInterface {
  id_item_carrinho: string;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  detalhes: string;
  adicionalCor: string;
  adicionalPlanoDeFundo: string;
  tipos_de_cor: Record<string, number>;
  tipos_de_fundo: Record<string, number>;
  id_perfil_comprador: string;
  id_item_mercado: string;
}

interface OpcaoPedido {
  nome: string;
  valor: number;
}

export interface ProdutoHistorico {
  id: string;
  imagem: string;
  data_pedido: string;
  data_entrega: string;
  nome_artista: string;
  status: string;
  alerta: string;
  metodo_pagamento: {
    tipo: string;
    final: string;
  };
  tipo_pedido: string;
  preco_pedido: number;
  adicionais: OpcaoPedido[];
  detalhes_valor: {
    particao: number;
    cupom: number;
  };
}
