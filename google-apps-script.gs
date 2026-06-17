/* ============================================================
   QUERIDA GRATIDÃO · YOGA — Recebedor de leads (Google Sheets)
   ------------------------------------------------------------
   Cole este código no Apps Script da sua planilha do Google.
   Passo a passo completo no README.md (seção "Planilha do Google").
   ============================================================ */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var dados = JSON.parse(e.postData.contents);

    // Cria o cabeçalho na primeira vez
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Data", "Nome", "E-mail", "WhatsApp", "Origem"]);
    }

    sheet.appendRow([
      dados.data || new Date(),
      dados.nome || "",
      dados.email || "",
      dados.whatsapp || "",
      dados.origem || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "erro", mensagem: erro.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
