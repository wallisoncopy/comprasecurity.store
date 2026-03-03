// ─── Estado global ─────────────────────────────
const state = {
  step: 1,
  dados: {},
  secoes: [],
  tema: 'azul'
};

const TEMAS = {
  azul:   { primary: [29, 78, 216],  light: [219, 234, 254], name: 'Azul Clássico' },
  rosa:   { primary: [219, 39, 119], light: [252, 231, 243], name: 'Rosa Delicado' },
  verde:  { primary: [22, 163, 74],  light: [220, 252, 231], name: 'Verde Natureza' },
  neutro: { primary: [107, 114, 128],light: [243, 244, 246], name: 'Neutro Claro' }
};

const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

// ─── Navegação de steps ────────────────────────
function goStep(n) {
  if (n === 2 && !validateStep1()) return;

  document.getElementById('step-' + state.step).classList.remove('active');
  document.getElementById('step-dot-' + state.step).classList.remove('active');
  if (n > state.step) {
    document.getElementById('step-dot-' + state.step).classList.add('done');
  } else {
    document.getElementById('step-dot-' + (state.step)).classList.remove('done');
  }

  state.step = n;
  document.getElementById('step-' + n).classList.add('active');
  document.getElementById('step-dot-' + n).classList.add('active');

  if (n === 4) buildSummary();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateStep1() {
  const nome = document.getElementById('prof-nome').value.trim();
  const escola = document.getElementById('prof-escola').value.trim();
  const turma = document.getElementById('prof-turma').value;
  if (!nome) { alert('Por favor, informe seu nome.'); return false; }
  if (!escola) { alert('Por favor, informe o nome da escola.'); return false; }
  if (!turma) { alert('Por favor, selecione a turma/série.'); return false; }
  state.dados = {
    nome,
    escola,
    turma,
    ano: document.getElementById('prof-ano').value || '2026',
    alunos: parseInt(document.getElementById('prof-alunos').value) || 30
  };
  return true;
}

// ─── Seções (checkboxes) ───────────────────────
document.querySelectorAll('.section-item').forEach(item => {
  item.addEventListener('click', () => {
    const cb = item.querySelector('input[type="checkbox"]');
    cb.checked = !cb.checked;
    item.classList.toggle('checked', cb.checked);
  });
});

function getSecoesSelecionadas() {
  const secs = [];
  document.querySelectorAll('.section-item input:checked').forEach(cb => secs.push(cb.value));
  return secs;
}

// ─── Tema (radio) ──────────────────────────────
document.querySelectorAll('.theme-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    const radio = card.querySelector('input[type="radio"]');
    radio.checked = true;
    state.tema = radio.value;
  });
});

// ─── Summary ───────────────────────────────────
function buildSummary() {
  state.secoes = getSecoesSelecionadas();
  const tema = TEMAS[state.tema];
  const nomesSec = {
    capa: 'Capa Personalizada', semanal: 'Planejamento Semanal',
    chamada: 'Lista de Chamada', alunos: 'Ficha por Aluno',
    calendario: 'Calendário Mensal', metas: 'Metas do Bimestre',
    atividades: 'Plano de Atividades', comunicados: 'Registro de Comunicados',
    checklist: 'Checklist Diário', notas: 'Registro de Notas'
  };

  const rows = [
    ['Professora', state.dados.nome],
    ['Escola', state.dados.escola],
    ['Turma', state.dados.turma + ' · ' + state.dados.ano],
    ['Alunos', state.dados.alunos + ' alunos'],
    ['Tema', tema.name],
    ['Seções', state.secoes.map(s => nomesSec[s] || s).join(', ')]
  ];

  document.getElementById('summary-box').innerHTML = rows.map(([k, v]) =>
    `<div class="row"><span>${k}</span><span>${v}</span></div>`
  ).join('');
}

// ─── Geração de PDF ────────────────────────────
async function gerarPDF() {
  const btn = document.getElementById('btn-gerar');
  const txt = document.getElementById('btn-text');
  btn.disabled = true;
  txt.textContent = '⏳ Gerando PDF...';

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const tema = TEMAS[state.tema];
    const d = state.dados;
    const W = 210, H = 297;
    const [pr, pg, pb] = tema.primary;
    const [lr, lg, lb] = tema.light;

    let pageNum = 0;

    function addPage() {
      if (pageNum > 0) doc.addPage();
      pageNum++;
      // Rodapé
      doc.setFillColor(pr, pg, pb);
      doc.rect(0, H - 10, W, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text(`Planner do Professor ${d.ano} · ${d.nome} · ${d.turma}`, W / 2, H - 3.5, { align: 'center' });
      doc.setTextColor(0, 0, 0);
    }

    function header(title, subtitle = '') {
      doc.setFillColor(pr, pg, pb);
      doc.rect(0, 0, W, 22, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(title, 14, 13);
      if (subtitle) {
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(subtitle, 14, 19);
      }
      doc.setTextColor(0, 0, 0);
      return 28;
    }

    function sectionTitle(y, text) {
      doc.setFillColor(lr, lg, lb);
      doc.rect(10, y, W - 20, 7, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(pr, pg, pb);
      doc.text(text, 14, y + 5);
      doc.setTextColor(0, 0, 0);
      return y + 10;
    }

    function drawGrid(y, cols, rows, colWidths, headers) {
      const startX = 10;
      let x = startX;
      // Header row
      doc.setFillColor(pr, pg, pb);
      doc.rect(startX, y, colWidths.reduce((a, b) => a + b, 0), 6, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      headers.forEach((h, i) => {
        doc.text(h, x + 2, y + 4.2);
        x += colWidths[i];
      });
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      y += 6;

      for (let r = 0; r < rows; r++) {
        x = startX;
        const bg = r % 2 === 0 ? [255, 255, 255] : [lr, lg, lb];
        doc.setFillColor(...bg);
        doc.rect(startX, y, colWidths.reduce((a, b) => a + b, 0), 6, 'F');
        colWidths.forEach(w => {
          doc.setDrawColor(200, 210, 230);
          doc.rect(x, y, w, 6);
          x += w;
        });
        y += 6;
      }
      return y + 2;
    }

    // ── CAPA ──────────────────────────────────────
    if (state.secoes.includes('capa')) {
      addPage();
      // Fundo
      doc.setFillColor(pr, pg, pb);
      doc.rect(0, 0, W, H, 'F');
      // Faixa branca central
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(20, 80, 170, 120, 6, 6, 'F');
      // Ícone
      doc.setFontSize(36);
      doc.text('🗓', W / 2 - 8, 70);
      // Título
      doc.setTextColor(pr, pg, pb);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('PLANNER DO PROFESSOR', W / 2, 103, { align: 'center' });
      doc.setFontSize(13);
      doc.text(d.ano, W / 2, 114, { align: 'center' });
      // Separador
      doc.setDrawColor(pr, pg, pb);
      doc.setLineWidth(0.5);
      doc.line(50, 120, 160, 120);
      // Dados
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      doc.text(d.nome, W / 2, 132, { align: 'center' });
      doc.setFontSize(9);
      doc.text(d.escola, W / 2, 141, { align: 'center' });
      doc.text('Turma: ' + d.turma + '  ·  ' + d.alunos + ' alunos', W / 2, 150, { align: 'center' });
      // Rodapé da capa
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text('App Planejamento Infantil Pro', W / 2, H - 12, { align: 'center' });
    }

    // ── CALENDÁRIO MENSAL ──────────────────────────
    if (state.secoes.includes('calendario')) {
      const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      for (let m = 0; m < 12; m++) {
        addPage();
        let y = header(MESES[m] + ' ' + d.ano, 'Calendário Mensal');
        const firstDay = new Date(parseInt(d.ano), m, 1).getDay();
        const totalDays = new Date(parseInt(d.ano), m + 1, 0).getDate();
        const cellW = (W - 20) / 7;
        const cellH = 10;
        // Cabeçalho dias da semana
        diasSemana.forEach((dia, i) => {
          doc.setFillColor(pr, pg, pb);
          doc.rect(10 + i * cellW, y, cellW, 7, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(7.5);
          doc.setFont('helvetica', 'bold');
          doc.text(dia, 10 + i * cellW + cellW / 2, y + 4.8, { align: 'center' });
        });
        doc.setTextColor(0, 0, 0);
        y += 7;
        let day = 1;
        for (let week = 0; week < 6; week++) {
          if (day > totalDays) break;
          for (let wd = 0; wd < 7; wd++) {
            const cellX = 10 + wd * cellW;
            const isDay = (week > 0 || wd >= firstDay) && day <= totalDays;
            doc.setFillColor(isDay ? (wd === 0 || wd === 6 ? lr : 255) : 240, isDay ? (wd === 0 || wd === 6 ? lg : 255) : 240, isDay ? (wd === 0 || wd === 6 ? lb : 255) : 240);
            doc.rect(cellX, y, cellW, cellH, 'F');
            doc.setDrawColor(200, 215, 235);
            doc.rect(cellX, y, cellW, cellH);
            if (isDay) {
              doc.setFont('helvetica', 'bold');
              doc.setFontSize(8);
              doc.setTextColor(wd === 0 || wd === 6 ? pr : 50, wd === 0 || wd === 6 ? pg : 50, wd === 0 || wd === 6 ? pb : 50);
              doc.text(String(day), cellX + 2, y + 4);
              day++;
            }
          }
          y += cellH;
        }
        // Espaço para notas
        y += 6;
        y = sectionTitle(y, 'Anotações do mês');
        for (let i = 0; i < 8; i++) {
          doc.setDrawColor(220, 230, 245);
          doc.line(10, y, W - 10, y);
          y += 6;
        }
      }
    }

    // ── PLANEJAMENTO SEMANAL ───────────────────────
    if (state.secoes.includes('semanal')) {
      const disciplinas = ['Língua Portuguesa', 'Matemática', 'Ciências', 'História', 'Geografia', 'Arte', 'Ed. Física'];
      const diasLetivos = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

      for (let sem = 1; sem <= 40; sem += 2) {
        addPage();
        let y = header('Planejamento Semanal', `Semanas ${sem} e ${sem + 1} de 40 · Ano Letivo ${d.ano}`);

        for (let s = 0; s < 2 && sem + s <= 40; s++) {
          y = sectionTitle(y, `Semana ${sem + s}`);
          const colW = (W - 20) / 6;
          // Header
          doc.setFillColor(lr, lg, lb);
          doc.rect(10, y, W - 20, 6, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7);
          doc.setTextColor(pr, pg, pb);
          doc.text('Disciplina', 12, y + 4.2);
          diasLetivos.forEach((d2, i) => doc.text(d2, 10 + colW + i * colW + 2, y + 4.2));
          doc.setTextColor(0, 0, 0);
          y += 6;

          disciplinas.forEach((disc, ri) => {
            const rowH = 9;
            doc.setFillColor(ri % 2 === 0 ? 255 : lr, ri % 2 === 0 ? 255 : lg, ri % 2 === 0 ? 255 : lb);
            doc.rect(10, y, W - 20, rowH, 'F');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7);
            doc.text(disc, 12, y + 5.5);
            for (let col = 0; col < 5; col++) {
              doc.setDrawColor(210, 220, 240);
              doc.rect(10 + colW + col * colW, y, colW, rowH);
            }
            y += rowH;
          });
          y += 6;
        }
      }
    }

    // ── LISTA DE CHAMADA ───────────────────────────
    if (state.secoes.includes('chamada')) {
      for (const mes of MESES) {
        addPage();
        let y = header('Lista de Chamada · ' + mes, `${d.turma} · ${d.ano} · ${d.alunos} alunos`);
        const numAlunos = d.alunos;
        const diasMax = 23;
        const nomeW = 60;
        const diaW = (W - 20 - nomeW) / diasMax;

        // Header dias
        doc.setFillColor(pr, pg, pb);
        doc.rect(10, y, nomeW, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.text('ALUNO', 12, y + 4.8);
        for (let d2 = 1; d2 <= diasMax; d2++) {
          doc.rect(10 + nomeW + (d2 - 1) * diaW, y, diaW, 7, 'F');
          doc.text(String(d2), 10 + nomeW + (d2 - 1) * diaW + diaW / 2, y + 4.8, { align: 'center' });
        }
        doc.setTextColor(0, 0, 0);
        y += 7;

        for (let a = 1; a <= numAlunos; a++) {
          const rowH = 5.5;
          const bg = a % 2 === 0 ? [lr, lg, lb] : [255, 255, 255];
          doc.setFillColor(...bg);
          doc.rect(10, y, W - 20, rowH, 'F');
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(6.5);
          doc.text(String(a).padStart(2, '0') + '.', 12, y + 3.8);
          doc.setDrawColor(210, 220, 240);
          doc.rect(10, y, nomeW, rowH);
          for (let d2 = 0; d2 < diasMax; d2++) {
            doc.rect(10 + nomeW + d2 * diaW, y, diaW, rowH);
          }
          y += rowH;
          if (y > H - 20 && a < numAlunos) {
            addPage();
            y = header('Lista de Chamada · ' + mes + ' (continuação)', d.turma);
          }
        }
      }
    }

    // ── FICHA POR ALUNO ────────────────────────────
    if (state.secoes.includes('alunos')) {
      const numAlunos = d.alunos;
      const porPagina = 4;
      for (let a = 0; a < numAlunos; a += porPagina) {
        addPage();
        let y = header('Fichas Individuais de Alunos', d.turma + ' · ' + d.ano);
        const fichaH = 58;
        for (let i = 0; i < porPagina && a + i < numAlunos; i++) {
          const num = a + i + 1;
          doc.setFillColor(lr, lg, lb);
          doc.roundedRect(10, y, W - 20, fichaH, 3, 3, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(pr, pg, pb);
          doc.text(`Aluno ${num}`, 14, y + 7);
          doc.setDrawColor(pr, pg, pb);
          doc.setLineWidth(0.3);
          doc.line(14, y + 10, W - 14, y + 10);
          const campos = [
            ['Nome:', ''], ['Data de Nasc.:', ''], ['Responsável:', ''],
            ['Contato:', ''], ['Obs. Especiais:', ''], ['Notas:', '']
          ];
          let cy = y + 16;
          doc.setTextColor(80, 80, 80);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          campos.forEach(([label]) => {
            doc.setFont('helvetica', 'bold');
            doc.text(label, 14, cy);
            doc.setFont('helvetica', 'normal');
            doc.setDrawColor(180, 190, 210);
            doc.line(35, cy + 0.5, W - 14, cy + 0.5);
            cy += 7;
          });
          doc.setTextColor(0, 0, 0);
          y += fichaH + 4;
        }
      }
    }

    // ── METAS DO BIMESTRE ──────────────────────────
    if (state.secoes.includes('metas')) {
      addPage();
      let y = header('Metas por Bimestre', d.ano);
      const bimestres = ['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'];
      bimestres.forEach((bim, bi) => {
        if (y > H - 80) { addPage(); y = header('Metas por Bimestre (continuação)', d.ano); }
        y = sectionTitle(y, bim);
        const areas = ['Objetivos pedagógicos', 'Estratégias a usar', 'Resultados esperados', 'Avaliação do bimestre'];
        areas.forEach(area => {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7.5);
          doc.setTextColor(80, 80, 80);
          doc.text(area + ':', 12, y);
          doc.setFont('helvetica', 'normal');
          doc.setDrawColor(210, 220, 240);
          for (let l = 0; l < 3; l++) {
            y += 6;
            doc.line(12, y, W - 12, y);
          }
          y += 8;
          doc.setTextColor(0, 0, 0);
        });
        y += 4;
      });
    }

    // ── PLANO DE ATIVIDADES ────────────────────────
    if (state.secoes.includes('atividades')) {
      const discs = ['Língua Portuguesa','Matemática','Ciências','História','Geografia','Arte','Educação Física','Outros'];
      discs.forEach(disc => {
        addPage();
        let y = header('Plano de Atividades · ' + disc, d.turma + ' · ' + d.ano);
        const campos = [
          'Objetivo da disciplina:', 'Competências a desenvolver:', 'Atividades planejadas:',
          'Recursos necessários:', 'Avaliação prevista:', 'Observações:'
        ];
        campos.forEach(campo => {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(pr, pg, pb);
          doc.text(campo, 12, y);
          y += 4;
          doc.setTextColor(0, 0, 0);
          doc.setFont('helvetica', 'normal');
          for (let l = 0; l < 5; l++) {
            doc.setDrawColor(210, 220, 240);
            doc.line(12, y, W - 12, y);
            y += 6;
          }
          y += 4;
        });
      });
    }

    // ── REGISTRO DE COMUNICADOS ────────────────────
    if (state.secoes.includes('comunicados')) {
      for (const mes of MESES) {
        addPage();
        let y = header('Registro de Comunicados · ' + mes, d.turma + ' · ' + d.ano);
        y = drawGrid(y, 5, 20, [12, 50, 60, 40, 28], ['Nº', 'Data', 'Assunto / Tipo de comunicado', 'Aluno(s)', 'Assinatura']);
      }
    }

    // ── CHECKLIST DIÁRIO ───────────────────────────
    if (state.secoes.includes('checklist')) {
      for (let bloco = 0; bloco < 4; bloco++) {
        addPage();
        let y = header('Checklist Diário da Professora', `Bloco ${bloco + 1} de 4 · ${d.ano}`);
        const itensFixos = [
          'Plano de aula preparado', 'Materiais organizados', 'Chamada registrada',
          'Atividades entregues/recolhidas', 'Comunicados enviados', 'Diário preenchido',
          'Ambiente organizado', 'Necessidades especiais atendidas'
        ];
        const diasLetivos = ['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira'];
        for (let semana = 0; semana < 2; semana++) {
          y = sectionTitle(y, `Semana ${bloco * 2 + semana + 1}`);
          const colW = (W - 20) / 6;
          doc.setFillColor(pr, pg, pb);
          doc.rect(10, y, W - 20, 6, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7);
          doc.text('Tarefa', 12, y + 4.2);
          diasLetivos.forEach((dia, i) => doc.text(dia.substring(0, 3), 10 + colW + i * colW + colW / 2, y + 4.2, { align: 'center' }));
          doc.setTextColor(0, 0, 0);
          y += 6;
          itensFixos.forEach((item, ri) => {
            const rowH = 8;
            doc.setFillColor(ri % 2 === 0 ? 255 : lr, ri % 2 === 0 ? 255 : lg, ri % 2 === 0 ? 255 : lb);
            doc.rect(10, y, W - 20, rowH, 'F');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7);
            doc.text(item, 12, y + 5);
            for (let col = 0; col < 5; col++) {
              doc.setDrawColor(210, 220, 240);
              doc.rect(10 + colW + col * colW, y, colW, rowH);
              // Checkbox
              doc.setFillColor(255, 255, 255);
              doc.rect(10 + colW + col * colW + colW / 2 - 2.5, y + 1.5, 5, 5, 'F');
              doc.setDrawColor(180, 190, 210);
              doc.rect(10 + colW + col * colW + colW / 2 - 2.5, y + 1.5, 5, 5);
            }
            y += rowH;
          });
          y += 8;
        }
      }
    }

    // ── REGISTRO DE NOTAS ──────────────────────────
    if (state.secoes.includes('notas')) {
      const bimestres = ['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'];
      bimestres.forEach(bim => {
        addPage();
        let y = header('Registro de Notas · ' + bim, d.turma + ' · ' + d.ano + ' · ' + d.alunos + ' alunos');
        const provas = ['Ativ. 1', 'Ativ. 2', 'Prova 1', 'Prova 2', 'Média'];
        const nomeW = 70;
        const colW = (W - 20 - nomeW) / (provas.length);
        // Header
        doc.setFillColor(pr, pg, pb);
        doc.rect(10, y, nomeW, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.text('ALUNO', 12, y + 4.2);
        provas.forEach((p, i) => {
          doc.rect(10 + nomeW + i * colW, y, colW, 6, 'F');
          doc.text(p, 10 + nomeW + i * colW + colW / 2, y + 4.2, { align: 'center' });
        });
        doc.setTextColor(0, 0, 0);
        y += 6;
        for (let a = 1; a <= d.alunos; a++) {
          const rowH = 6;
          const bg = a % 2 === 0 ? [lr, lg, lb] : [255, 255, 255];
          doc.setFillColor(...bg);
          doc.rect(10, y, W - 20, rowH, 'F');
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          doc.text(String(a).padStart(2, '0') + '.', 12, y + 4.2);
          doc.setDrawColor(210, 220, 240);
          doc.rect(10, y, nomeW, rowH);
          provas.forEach((_, i) => doc.rect(10 + nomeW + i * colW, y, colW, rowH));
          y += rowH;
          if (y > H - 20 && a < d.alunos) {
            addPage();
            y = header('Registro de Notas (cont.) · ' + bim, d.turma);
          }
        }
      });
    }

    // Salvar
    const nomePDF = `Planner_${d.nome.replace(/\s+/g, '_')}_${d.ano}.pdf`;
    doc.save(nomePDF);

    txt.textContent = '✅ PDF gerado! Verifique seus downloads.';
    btn.style.background = 'linear-gradient(135deg, #16a34a, #22c55e)';

  } catch (err) {
    console.error(err);
    txt.textContent = '❌ Erro ao gerar. Tente novamente.';
    btn.disabled = false;
  }
}
