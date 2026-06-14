import { j as jsPDF } from "../_libs/jspdf.mjs";
import { a as autoTable } from "../_libs/jspdf-autotable.mjs";
import { a as formatDateBR, f as formatBRL } from "./config-BwxWJN3e.mjs";
function exportProntuarioPDF(opts) {
  const { aluno, historico, notas, pagamentos } = opts;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const margin = 40;
  let y = margin;
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, W, 70, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Prontuário do Aluno", margin, 32);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Atlântida · Gerado em ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")}`, margin, 52);
  doc.setTextColor(0);
  y = 90;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(aluno.nome, margin, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const linhas = [
    aluno.telefone ? `Telefone: ${aluno.telefone}` : null,
    aluno.data_inicio ? `Início: ${formatDateBR(aluno.data_inicio)}` : null,
    aluno.valor_mensalidade ? `Mensalidade: ${formatBRL(Number(aluno.valor_mensalidade))}` : null,
    aluno.dia_vencimento ? `Vencimento: dia ${aluno.dia_vencimento}` : null,
    aluno.status ? `Status: ${aluno.status}` : null
  ].filter(Boolean);
  for (const l of linhas) {
    doc.text(l, margin, y);
    y += 14;
  }
  if (aluno.objetivo) {
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Objetivo", margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    const wrapped = doc.splitTextToSize(aluno.objetivo, W - margin * 2);
    doc.text(wrapped, margin, y);
    y += wrapped.length * 12;
  }
  if (aluno.observacoes) {
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Observações", margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    const wrapped = doc.splitTextToSize(aluno.observacoes, W - margin * 2);
    doc.text(wrapped, margin, y);
    y += wrapped.length * 12;
  }
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Caderno de anotações", margin, y);
  y += 6;
  autoTable(doc, {
    startY: y + 6,
    margin: { left: margin, right: margin },
    head: [["Data", "Tipo", "Título", "Conteúdo"]],
    body: notas.map((n) => [formatDateBR(n.data), n.tipo, n.titulo, n.conteudo]),
    styles: { fontSize: 9, cellPadding: 4, valign: "top" },
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    columnStyles: { 3: { cellWidth: 240 } }
  });
  y = doc.lastAutoTable.finalY + 18;
  if (y > 720) {
    doc.addPage();
    y = margin;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Histórico de treinos", margin, y);
  autoTable(doc, {
    startY: y + 6,
    margin: { left: margin, right: margin },
    head: [["Data", "Dia", "Foco", "Exerc. feitos", "Total"]],
    body: historico.map((h) => [
      formatDateBR(h.data),
      h.dia_semana,
      h.foco ?? "-",
      String(h.exercicios_feitos?.length ?? 0),
      String(h.total_exercicios)
    ]),
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255 }
  });
  y = doc.lastAutoTable.finalY + 18;
  if (y > 720) {
    doc.addPage();
    y = margin;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Pagamentos", margin, y);
  autoTable(doc, {
    startY: y + 6,
    margin: { left: margin, right: margin },
    head: [["Mês", "Vencimento", "Valor", "Status", "Pago em"]],
    body: pagamentos.map((p) => [
      p.mes_referencia,
      formatDateBR(p.vencimento),
      formatBRL(Number(p.valor)),
      p.status,
      p.pago_em ? formatDateBR(p.pago_em) : "-"
    ]),
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255 }
  });
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(`Página ${i} de ${pages}`, W - margin, doc.internal.pageSize.getHeight() - 20, { align: "right" });
  }
  doc.save(`prontuario-${aluno.nome.toLowerCase().replace(/\s+/g, "-")}.pdf`);
}
function exportFinanceiroPDF(opts) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const margin = 40;
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, W, 70, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(opts.titulo, margin, 32);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Mês ${opts.mes} · Gerado em ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")}`, margin, 52);
  doc.setTextColor(0);
  let y = 100;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Receitas: ${formatBRL(opts.receitas)}`, margin, y);
  doc.text(`Despesas: ${formatBRL(opts.despesas)}`, margin + 200, y);
  doc.text(`Saldo: ${formatBRL(opts.receitas - opts.despesas)}`, margin + 400, y);
  y += 12;
  autoTable(doc, {
    startY: y + 6,
    margin: { left: margin, right: margin },
    head: [["Data", "Tipo", "Categoria", "Descrição", "Valor"]],
    body: opts.lancamentos.map((l) => [
      formatDateBR(l.data),
      l.tipo,
      l.categoria ?? "-",
      l.descricao,
      formatBRL(Number(l.valor))
    ]),
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255 }
  });
  doc.save(`financeiro-${opts.mes}.pdf`);
}
export {
  exportProntuarioPDF as a,
  exportFinanceiroPDF as e
};
