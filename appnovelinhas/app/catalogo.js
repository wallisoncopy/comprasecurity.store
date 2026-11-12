/* ============================================================
   CATÁLOGO DO APP DE NOVELINHAS
   Para adicionar uma novelinha nova: copie um bloco { ... } e
   preencha. A mais nova fica em PRIMEIRO na lista (vira destaque).
   - capa:   imagem vertical 9:16 em capas/
   - video:  link do mp4 (Cloudflare R2)
   - chave:  sha256 do código individual (link de quem comprou só ela)
   ============================================================ */
window.APP_CONFIG = {
  nome: "Novelinhas",
  // sha256 do código PREMIUM (libera todas as novelinhas)
  premium: "6f36180240f85572a5b0bff862c740dad1aaf3195667c56e2ea5eefa9f4bd19e",
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
    video: "VIDEO_URL_BABA",
    chave: "1421ed8507066361d6c27980e962242cee9ef66168786a8c2233f7595ea65709"
  }
];
