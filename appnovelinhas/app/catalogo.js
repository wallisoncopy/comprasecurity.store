/* ============================================================
   CATÁLOGO DO APP DE NOVELINHAS
   Para adicionar uma novelinha nova: copie um bloco { ... } e
   preencha. A mais nova fica em PRIMEIRO na lista (vira destaque).
   - capa:   imagem vertical 9:16 em capas/
   - episodios: lista de { titulo, duracao, video } — video = caminho no R2 "novelinhas" ({id}/epN.mp4).
     Os vídeos NÃO são públicos: o worker novelinhas.wallisoncopy.workers.dev entrega link assinado
     só para quem comprou (login pelo e-mail da compra). Série nova: incluir também em SERIES no worker.js.
   ============================================================ */
window.APP_CONFIG = {
  nome: "Novelinhas",
  // servidor de acesso (login por e-mail + vídeos assinados)
  api: "https://novelinhas.wallisoncopy.workers.dev",
  // checkout do Premium R$10 (upsell para quem comprou só uma)
  checkoutPremium: "https://pay.lowify.com.br/checkout.php?product_id=xAWXvo"
};

window.CATALOGO = [
  {
    id: "baba-por-contrato",
    titulo: "Babá por Contrato",
    subtitulo: "Amor pelo Destino",
    generos: ["Fantasia", "Romance"],
    duracao: "1h18",
    idioma: "Dublado",
    novo: true,
    sinopse: "Humilhada e expulsa pelo próprio noivo, a herdeira da Casa Visser perde o título, o lar e tudo o que tinha numa única noite de chuva. Sem ter para onde ir, ela aceita o único trabalho que restou: ser babá do filho teimoso do temido Lorde Dragão — um homem frio que avisa logo no primeiro dia que não tem interesse em romance. Mas o destino tinha outros planos...",
    capa: "capas/baba-por-contrato.jpg",
    episodios: [
      { titulo: "Episódio 1", duracao: "42 min", video: "baba-por-contrato/ep1.mp4" },
      { titulo: "Episódio 2", duracao: "36 min", video: "baba-por-contrato/ep2.mp4" }
    ]
  }
];
