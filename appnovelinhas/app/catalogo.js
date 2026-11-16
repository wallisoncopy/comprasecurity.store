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
    id: "o-bobinho-cativo-do-dragao",
    titulo: "O Bobinho Cativo do Dragão",
    subtitulo: "A Noiva do Rei das Feras",
    generos: ["Fantasia", "Romance"],
    duracao: "1h29",
    idioma: "Dublado",
    novo: true,
    sinopse: "Humilhada pela própria família por não ter magia, Sylph é obrigada a se casar no lugar da irmã com Astur, o temido Rei das Feras, envenenado e à beira da morte. Todos acham que ela vai virar viúva... mas a garota guarda um poder capaz de mudar o destino dos dois.",
    capa: "capas/o-bobinho-cativo-do-dragao.jpg",
    episodios: [
      { titulo: "Episódio 1", duracao: "45 min", video: "o-bobinho-cativo-do-dragao/ep1.mp4" },
      { titulo: "Episódio 2", duracao: "45 min", video: "o-bobinho-cativo-do-dragao/ep2.mp4" }
    ]
  },
  {
    id: "meu-marido-fez-o-ceu-se-render",
    titulo: "Meu Marido Fez o Céu se Render",
    subtitulo: "O Rei dos Demônios",
    generos: ["Fantasia", "Romance"],
    duracao: "1h19",
    idioma: "Dublado",
    novo: false,
    sinopse: "Ele vive escondido como um simples ferreiro, mas é Diablo, o Rei de Todos os Demônios. Seis anos depois de salvar uma anja de seis asas, ela volta com uma surpresa: os gêmeos dele. Agora ela precisa de um marido — e o céu inteiro vai descobrir quem ele realmente é...",
    capa: "capas/meu-marido-fez-o-ceu-se-render.jpg",
    episodios: [
      { titulo: "Episódio 1", duracao: "36 min", video: "meu-marido-fez-o-ceu-se-render/ep1.mp4" },
      { titulo: "Episódio 2", duracao: "43 min", video: "meu-marido-fez-o-ceu-se-render/ep2.mp4" }
    ]
  },
  {
    id: "baba-por-contrato",
    titulo: "Babá por Contrato",
    subtitulo: "Amor pelo Destino",
    generos: ["Fantasia", "Romance"],
    duracao: "1h18",
    idioma: "Dublado",
    novo: false,
    sinopse: "Humilhada e expulsa pelo próprio noivo, a herdeira da Casa Visser perde o título, o lar e tudo o que tinha numa única noite de chuva. Sem ter para onde ir, ela aceita o único trabalho que restou: ser babá do filho teimoso do temido Lorde Dragão — um homem frio que avisa logo no primeiro dia que não tem interesse em romance. Mas o destino tinha outros planos...",
    capa: "capas/baba-por-contrato.jpg",
    episodios: [
      { titulo: "Episódio 1", duracao: "42 min", video: "baba-por-contrato/ep1.mp4" },
      { titulo: "Episódio 2", duracao: "36 min", video: "baba-por-contrato/ep2.mp4" }
    ]
  }
];
