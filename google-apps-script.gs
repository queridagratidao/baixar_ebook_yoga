/* ============================================================
   QUERIDA GRATIDÃO · YOGA — Recebedor de leads (Google Sheets)
   ------------------------------------------------------------
   Cole este código no Apps Script da sua planilha do Google.
   - Grava cada lead numa linha da planilha
   - Envia um e-mail de alerta a cada novo lead
   Passo a passo completo no README.md (seção "Planilha do Google").
   ============================================================ */

// E-mail que recebe os alertas de novos leads
var EMAIL_ALERTA = "queridagratidao@gmail.com";

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var dados = JSON.parse(e.postData.contents);

    // Cria o cabeçalho na primeira vez
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Data", "Nome", "E-mail", "WhatsApp", "Nível de yoga", "O que traz ao yoga", "Origem"]);
    }

    sheet.appendRow([
      dados.data || new Date(),
      dados.nome || "",
      dados.email || "",
      dados.whatsapp || "",
      dados.nivel || "",
      dados.motivo || "",
      dados.origem || ""
    ]);

    enviarAlerta(dados);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "erro", mensagem: erro.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Envia o e-mail de alerta de novo lead
function enviarAlerta(dados) {
  try {
    var assunto = "🌿 Mais um lead baixou o Guia Prático de Yoga!";
    var corpo =
      "Você tem um novo querido(a) na egrégora! 🪷\n\n" +
      "Nome: " + (dados.nome || "-") + "\n" +
      "E-mail: " + (dados.email || "-") + "\n" +
      "WhatsApp: " + (dados.whatsapp || "-") + "\n" +
      "Nível de yoga: " + (dados.nivel || "-") + "\n" +
      "O que traz ao yoga: " + (dados.motivo || "-") + "\n" +
      "Quando: " + (dados.data || new Date()) + "\n\n" +
      "Origem: " + (dados.origem || "-") + "\n" +
      "— Querida Gratidão · Yoga";

    MailApp.sendEmail(EMAIL_ALERTA, assunto, corpo);
  } catch (erro) {
    // Se o e-mail falhar, o lead já foi salvo na planilha mesmo assim.
  }
}
