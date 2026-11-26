/* ============================================================
   CATÁLOGO DO APP DE NOVELINHAS
   Para adicionar uma novelinha nova: copie um bloco { ... } e
   preencha. A mais nova fica em PRIMEIRO na lista (vira destaque).
   - capa:   imagem vertical 9:16 em capas/
   - checkout: link Lowify da série avulsa (R$5) — usado nas ofertas dentro do app
   - episodios: lista de { titulo, duracao, video } — video = caminho no R2 "novelinhas" ({id}/epN.mp4).
     Os vídeos NÃO são públicos: o worker novelinhas.wallisoncopy.workers.dev entrega link assinado
     só para quem comprou (login pelo e-mail da compra). Série nova: incluir também em SERIES no worker.js.
   ============================================================ */
window.APP_CONFIG = {
  nome: "Novelinhas",
  // servidor de acesso (login por e-mail + vídeos assinados)
  api: "https://novelinhas.wallisoncopy.workers.dev",
  // checkout do Premium VITALÍCIO R$15,90 (pagamento único) — oferta do app desde 16/11
  // (o mensal R$10 xAWXvo segue valendo para quem já assinou)
  checkoutPremium: "https://pay.lowify.com.br/checkout?product_id=890QER",
  // UPGRADE R$10,90 (desde 17/11): Vitalício para quem JÁ comprou uma série — paga só a diferença.
  // O app só mostra esse preço para quem está logado com compra e ainda não é Premium.
  checkoutUpgrade: "https://pay.lowify.com.br/checkout.php?product_id=5J0Fbv"
};

window.CATALOGO = [
  {
    id: "minha-ex-esposa-e-uma-princesa-da-mafia",
    titulo: "Minha Ex-Esposa É uma Princesa da Máfia",
    subtitulo: "Sete Anos de Casamento",
    generos: ["Romance", "Máfia", "Vingança"],
    duracao: "1h46",
    idioma: "Dublado",
    novo: true,
    sinopse: "Depois de sete anos de casamento, Mindy finalmente engravida do marido mafioso, Dante Belandi. No mesmo dia descobre que Amanda, o amor de infância dele, também está grávida — e Dante decide assumir o filho dela, dando a ele o sobrenome, o lugar de herdeiro e a herança. A família chama o bebê de Mindy de bastardo e a obriga a assinar o divórcio. Eles só não fazem ideia de quem ela realmente é…",
    capa: "capas/minha-ex-esposa-e-uma-princesa-da-mafia.jpg",
    checkout: "https://pay.lowify.com.br/checkout?product_id=v1YNNA",
    episodios: [
      { titulo: "Parte 1", duracao: "35 min", video: "minha-ex-esposa-e-uma-princesa-da-mafia/ep1.mp4" },
      { titulo: "Parte 2", duracao: "35 min", video: "minha-ex-esposa-e-uma-princesa-da-mafia/ep2.mp4" },
      { titulo: "Parte 3", duracao: "36 min", video: "minha-ex-esposa-e-uma-princesa-da-mafia/ep3.mp4" }
    ]
  },
  {
    id: "mimada-pelos-meus-tres-irmaos-posticos-cowboys",
    titulo: "Mimada Pelos Meus Três Irmãos Postiços Cowboys",
    subtitulo: "Uma Segunda Chance no Rancho",
    generos: ["Romance", "Renascimento", "Faroeste"],
    duracao: "1h44",
    idioma: "Dublado",
    novo: true,
    sinopse: "Na primeira vida, River escolheu ficar com o pai — e ele a vendeu para um velho de 60 anos cujas esposas morreram todas. Ela morreu e acordou de novo aos 18, no dia do divórcio dos pais. Desta vez, escolhe a mãe e vai para o rancho dos Garrison, os três irmãos cowboys mais temidos da região… que agora são seus irmãos postiços.",
    capa: "capas/mimada-pelos-meus-tres-irmaos-posticos-cowboys.jpg",
    checkout: "https://pay.lowify.com.br/checkout?product_id=jrfELO",
    episodios: [
      { titulo: "Parte 1", duracao: "35 min", video: "mimada-pelos-meus-tres-irmaos-posticos-cowboys/ep1.mp4" },
      { titulo: "Parte 2", duracao: "34 min", video: "mimada-pelos-meus-tres-irmaos-posticos-cowboys/ep2.mp4" },
      { titulo: "Parte 3", duracao: "36 min", video: "mimada-pelos-meus-tres-irmaos-posticos-cowboys/ep3.mp4" }
    ]
  },
  {
    id: "a-boa-garota-da-rainha-da-mafia",
    titulo: "A Boa Garota da Rainha da Máfia",
    subtitulo: "O Jogo de Sete Dias",
    generos: ["Romance", "Máfia", "Drama"],
    duracao: "1h16",
    idioma: "Dublado",
    novo: true,
    sinopse: "Lívia tem três empregos, uma mãe internada e contas atrasadas. Numa noite no trem, uma mulher ferida a obriga a beijá-la para despistar os bandidos — e Lívia, enfermeira, a leva para casa para salvar sua vida. Só depois descobre quem ela é: Valentina Montenegro, a rainha da máfia que a cidade inteira teme. E Valentina não deixa escapar nada do que considera seu…",
    capa: "capas/a-boa-garota-da-rainha-da-mafia.jpg",
    checkout: "https://pay.lowify.com.br/checkout?product_id=vOTgIi",
    episodios: [
      { titulo: "Parte 1", duracao: "39 min", video: "a-boa-garota-da-rainha-da-mafia/ep1.mp4" },
      { titulo: "Parte 2", duracao: "38 min", video: "a-boa-garota-da-rainha-da-mafia/ep2.mp4" }
    ]
  },
  {
    id: "casada-com-o-rei-dragao",
    titulo: "Casada com o Rei Dragão",
    subtitulo: "A Escolha de Riley",
    generos: ["Romance", "Fantasia", "Vingança"],
    duracao: "1h31",
    idioma: "Dublado",
    novo: true,
    sinopse: "Assassinada pela própria irmã invejosa, Riley renasce no dia da cerimônia de cortejo. Desta vez, ela muda o destino: deixa o cobiçado chefe do Clã dos Leões para a irmã e escolhe um companheiro do clã mais fraco, que todos tratam como um inseto… sem saber que ele é, na verdade, o lendário Rei das Feras.",
    capa: "capas/casada-com-o-rei-dragao.jpg",
    checkout: "https://pay.lowify.com.br/checkout?product_id=rV9fiw",
    episodios: [
      { titulo: "Parte 1", duracao: "31 min", video: "casada-com-o-rei-dragao/ep1.mp4" },
      { titulo: "Parte 2", duracao: "31 min", video: "casada-com-o-rei-dragao/ep2.mp4" },
      { titulo: "Parte 3", duracao: "31 min", video: "casada-com-o-rei-dragao/ep3.mp4" }
    ]
  },
  {
    id: "a-noiva-secreta-do-rei-leao",
    titulo: "A Noiva Secreta do Rei Leão",
    subtitulo: "A Coelhinha Predestinada",
    generos: ["Romance", "Fantasia", "Realeza"],
    duracao: "1h37",
    idioma: "Dublado",
    novo: true,
    sinopse: "Aeve é uma coelha curandeira, plebeia e sem família. Na floresta, ela salva um guerreiro ferido que diz não ter tribo, sem saber que ele é o temido Rei Leão, o deus da guerra invicto do Império. No mesmo dia, o noivo com quem cresceu a troca pela filha de um conde e a humilha diante de toda a tribo. Ela rompe o vínculo para sempre… mas o Rei Leão já decidiu: aquela coelhinha é a companheira predestinada dele.",
    capa: "capas/a-noiva-secreta-do-rei-leao.jpg",
    checkout: "https://pay.lowify.com.br/checkout?product_id=l3tIQz",
    episodios: [
      { titulo: "Parte 1", duracao: "32 min", video: "a-noiva-secreta-do-rei-leao/ep1.mp4" },
      { titulo: "Parte 2", duracao: "32 min", video: "a-noiva-secreta-do-rei-leao/ep2.mp4" },
      { titulo: "Parte 3", duracao: "32 min", video: "a-noiva-secreta-do-rei-leao/ep3.mp4" }
    ]
  },
  {
    id: "renascida-fiz-do-renegado-meu-alfa",
    titulo: "Renascida, Fiz do Renegado Meu Alfa",
    subtitulo: "A Segunda Chance da Luna",
    generos: ["Romance", "Fantasia", "Vingança"],
    duracao: "1h26",
    idioma: "Dublado",
    novo: true,
    sinopse: "Na vida passada, Sorlene escolheu o Alfa Breckon — e ele a traiu, a prendeu, a torturou por anos e matou o filhote dos dois. Mas a Deusa da Lua lhe deu uma segunda chance: ela acorda dez dias antes da cerimônia em que deve escolher seu companheiro. Desta vez, diante de toda a alcateia, ela escolhe Lóric — o irmão renegado que todos chamam de monstro — e faz dele o novo Alfa. Enquanto o ex implora por perdão, traições mortais se aproximam.",
    capa: "capas/renascida-fiz-do-renegado-meu-alfa.jpg",
    checkout: "https://pay.lowify.com.br/checkout?product_id=k7iOm8",
    episodios: [
      { titulo: "Parte 1", duracao: "44 min", video: "renascida-fiz-do-renegado-meu-alfa/ep1.mp4" },
      { titulo: "Parte 2", duracao: "42 min", video: "renascida-fiz-do-renegado-meu-alfa/ep2.mp4" }
    ]
  },
  {
    id: "uma-coelhinha-domou-o-rei-dragao",
    titulo: "Uma Coelhinha Domou o Rei Dragão",
    subtitulo: "A Noiva do Sacrifício",
    generos: ["Romance", "Fantasia", "Realeza"],
    duracao: "1h25",
    idioma: "Dublado",
    novo: true,
    sinopse: "Princesa só no nome, ela é tratada como escrava pela própria família por causa da gagueira. Quando o temido Rei Dragão exige uma noiva virgem como tributo de paz, ela é oferecida em sacrifício para salvar o seu povo — e não pode deixar que ele ouça sua gagueira, ou o reino inteiro morre. Mas o rei cruel que todos temem carrega uma maldição... e só ela consegue acalmá-la.",
    capa: "capas/uma-coelhinha-domou-o-rei-dragao.jpg",
    checkout: "https://pay.lowify.com.br/checkout?product_id=q2hHQA",
    episodios: [
      { titulo: "Parte 1", duracao: "43 min", video: "uma-coelhinha-domou-o-rei-dragao/ep1.mp4" },
      { titulo: "Parte 2", duracao: "42 min", video: "uma-coelhinha-domou-o-rei-dragao/ep2.mp4" }
    ]
  },
  {
    id: "a-vinganca-do-deus-do-surf",
    titulo: "A Vingança do Deus do Surf",
    subtitulo: "O Marido Imortal",
    generos: ["Romance", "Fantasia", "Vingança"],
    duracao: "1h14",
    idioma: "Dublado",
    novo: true,
    sinopse: "Duke Koa é o Deus da Ilha: imortal e o maior surfista que o mar já viu. Para quebrar o feitiço da Bruxa do Mar, ele aceita um pacto — casar com a filha dela, Kai, e cuidar dela por cinco anos sem revelar quem é. Mas Kai tem vergonha do marido que todos chamam de \"encostado\"... e quando o quinto aniversário de casamento chegar, ela vai descobrir quem perdeu.",
    capa: "capas/a-vinganca-do-deus-do-surf.jpg",
    checkout: "https://pay.lowify.com.br/checkout?product_id=BpvM7U",
    episodios: [
      { titulo: "Parte 1", duracao: "37 min", video: "a-vinganca-do-deus-do-surf/ep1.mp4" },
      { titulo: "Parte 2", duracao: "37 min", video: "a-vinganca-do-deus-do-surf/ep2.mp4" }
    ]
  },
  {
    id: "mae-solo-em-fuga-e-seu-marido-bilionario",
    titulo: "Mãe Solo em Fuga e Seu Marido Bilionário",
    subtitulo: "O Casamento por Contrato",
    generos: ["Romance", "Drama", "Bilionário"],
    duracao: "1h28",
    idioma: "Dublado",
    novo: true,
    sinopse: "Grace foi humilhada pelo ex durante anos, até ser expulsa de casa só com a filha nos braços. Sem dinheiro e sem ter pra onde ir, ela recebe uma proposta inesperada: casar por contrato com Ethan, um bilionário numa cadeira de rodas que precisa de uma esposa. O que começa como um acordo vai virar a vida dos dois de cabeça pra baixo... e o ex vai se arrepender de cada humilhação.",
    capa: "capas/mae-solo-em-fuga-e-seu-marido-bilionario.jpg",
    checkout: "https://pay.lowify.com.br/checkout?product_id=3zEypu",
    episodios: [
      { titulo: "Parte 1", duracao: "44 min", video: "mae-solo-em-fuga-e-seu-marido-bilionario/ep1.mp4" },
      { titulo: "Parte 2", duracao: "44 min", video: "mae-solo-em-fuga-e-seu-marido-bilionario/ep2.mp4" }
    ]
  },
  {
    id: "a-lagrima-da-sereia",
    titulo: "A Lágrima da Sereia",
    subtitulo: "O Casamento por Contrato",
    generos: ["Romance", "Fantasia", "Bilionário"],
    duracao: "1h43",
    idioma: "Dublado",
    novo: true,
    sinopse: "Freya é uma sereia que abriu mão do oceano para viver entre os humanos e cuidar do homem que salvou sua vida. Casada por contrato com o frio bilionário Anderson Lockwood, ela passa três anos sendo humilhada e trocada pela ambiciosa Chloe... até o dia em que decide ir embora para sempre.",
    capa: "capas/a-lagrima-da-sereia.jpg",
    checkout: "https://pay.lowify.com.br/checkout?product_id=CBhWRv",
    episodios: [
      { titulo: "Parte 1", duracao: "52 min", video: "a-lagrima-da-sereia/ep1.mp4" },
      { titulo: "Parte 2", duracao: "52 min", video: "a-lagrima-da-sereia/ep2.mp4" }
    ]
  },
  {
    id: "a-mendiga-e-o-bilionario",
    titulo: "A Mendiga e o Bilionário",
    subtitulo: "A Médica Genial Disfarçada",
    generos: ["Romance", "Bilionário", "Vingança"],
    duracao: "1h15",
    idioma: "Dublado",
    novo: true,
    sinopse: "Todos acham que Mia é só uma mendiga de rua. Ninguém imagina que ela é uma médica genial. Quando o bilionário Edward Black cai em coma com uma doença que nenhum médico do mundo consegue explicar, só ela pode salvá-lo... mas antes vai ter que enfrentar a humilhação do ex-noivo e da ex-melhor amiga.",
    capa: "capas/a-mendiga-e-o-bilionario.jpg",
    checkout: "https://pay.lowify.com.br/checkout?product_id=GvbiI8",
    episodios: [
      { titulo: "Parte 1", duracao: "37 min", video: "a-mendiga-e-o-bilionario/ep1.mp4" },
      { titulo: "Parte 2", duracao: "38 min", video: "a-mendiga-e-o-bilionario/ep2.mp4" }
    ]
  },
  {
    id: "a-herdeira-magica-retorna",
    titulo: "A Herdeira Mágica Retorna",
    subtitulo: "A Filha Trocada ao Nascer",
    generos: ["Fantasia", "Família", "Magia"],
    duracao: "24 min",
    idioma: "Dublado",
    novo: true,
    sinopse: "Trocada ao nascer, Selena cresceu pobre cuidando da mãe doente — uma magia que não tem cura. Até que descobre ser a filha perdida da Casa Aurel, a família nobre de magos mais poderosa da capital. Mas lá todos preferem a filha adotiva mimada... e ninguém imagina o poder que ela esconde.",
    capa: "capas/a-herdeira-magica-retorna.jpg",
    checkout: "https://pay.lowify.com.br/checkout?product_id=wbi83X",
    episodios: [
      { titulo: "Episódio 1", duracao: "24 min", video: "a-herdeira-magica-retorna/ep1.mp4" }
    ]
  },
  {
    id: "troquei-de-noivo-e-virei-a-rainha-da-mafia",
    titulo: "Troquei de Noivo e Virei a Rainha da Máfia",
    subtitulo: "Renascida no Casamento",
    generos: ["Romance", "Máfia", "Vingança"],
    duracao: "1h",
    idioma: "Dublado",
    novo: true,
    sinopse: "Na vida passada, ela se casou com o homem que todos amavam, enquanto a irmã ficou com o Don mais temido da cidade — e as duas tiveram finais trágicos. Agora ela acordou um dia antes do casamento... e decidiu trocar de noivo. Determinada a se vingar, ela entra no submundo da máfia para construir seu império e conquistar o homem que todos temem.",
    capa: "capas/troquei-de-noivo-e-virei-a-rainha-da-mafia.jpg",
    checkout: "https://pay.lowify.com.br/checkout?product_id=19cGpi",
    episodios: [
      { titulo: "Episódio 1", duracao: "30 min", video: "troquei-de-noivo-e-virei-a-rainha-da-mafia/ep1.mp4" },
      { titulo: "Episódio 2", duracao: "30 min", video: "troquei-de-noivo-e-virei-a-rainha-da-mafia/ep2.mp4" }
    ]
  },
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
    checkout: "https://pay.lowify.com.br/checkout?product_id=q8oUOw",
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
    checkout: "https://pay.lowify.com.br/checkout.php?product_id=dcH4rW",
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
    checkout: "https://pay.lowify.com.br/checkout?product_id=EcYWWA",
    episodios: [
      { titulo: "Episódio 1", duracao: "42 min", video: "baba-por-contrato/ep1.mp4" },
      { titulo: "Episódio 2", duracao: "36 min", video: "baba-por-contrato/ep2.mp4" }
    ]
  }
];
