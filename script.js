/* ============================================================
   QUERIDA GRATIDÃO · YOGA — Lógica de captura
   ============================================================ */

/* ⚙️ CONFIGURAÇÃO — ajuste estes 2 valores (veja o README.md)
   ------------------------------------------------------------
   1) GOOGLE_SHEET_URL: o link do seu app Google Apps Script
      que grava os leads na planilha. Enquanto estiver vazio,
      o formulário funciona em "modo teste" (não envia nada).
   2) EBOOK_FILE: o nome do arquivo PDF do seu ebook (deixe-o
      na mesma pasta deste site).
   ------------------------------------------------------------ */
const CONFIG = {
  GOOGLE_SHEET_URL: "https://script.google.com/macros/s/AKfycbzC9PXFDcE2aTor7MrfFQ8Z_uue5z1dhUcdQ1nB615D90fQCjtF0F7gf-n3kw9fsrli/exec",
  EBOOK_FILE: "ebook.pdf",       // nome do arquivo do ebook
};

/* ------------------------------------------------------------ */

const form = document.getElementById("lead-form");
const submitBtn = document.getElementById("submit-btn");
const errorBox = document.getElementById("form-error");
const successBox = document.getElementById("success");
const downloadLink = document.getElementById("download-link");

// Ano do rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.hidden = false;
}

function startDownload() {
  downloadLink.setAttribute("href", CONFIG.EBOOK_FILE);
  // dispara o download automaticamente
  const a = document.createElement("a");
  a.href = CONFIG.EBOOK_FILE;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorBox.hidden = true;

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const nivel = document.getElementById("nivel").value;
  const motivo = document.getElementById("motivo").value;
  const consent = document.getElementById("consent").checked;

  // Validações simples
  if (!nome) return showError("Por favor, preencha o seu nome. 🌱");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return showError("Confira o seu e-mail — parece que falta algo. ✶");
  if (whatsapp.replace(/\D/g, "").length < 10)
    return showError("Inclua o seu WhatsApp com DDD, por favor. 📱");
  if (!nivel) return showError("Conta pra mim o seu nível de yoga. 🧘🏽‍♀️");
  if (!motivo) return showError("Escolha o que te traz ao yoga. 💛");
  if (!consent) return showError("Marque a caixinha para receber o ebook. 🙏");

  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando… 🌿";

  const payload = {
    nome,
    email,
    whatsapp,
    nivel,
    motivo,
    origem: "Landing Page Ebook Yoga",
    data: new Date().toLocaleString("pt-BR"),
  };

  try {
    if (CONFIG.GOOGLE_SHEET_URL) {
      await fetch(CONFIG.GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors", // necessário para o Google Apps Script
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
    } else {
      // Modo teste (sem planilha configurada)
      console.log("[MODO TESTE] Lead capturado:", payload);
    }

    // Sucesso → mostra agradecimento e baixa o ebook
    form.hidden = true;
    successBox.hidden = false;
    successBox.scrollIntoView({ behavior: "smooth", block: "center" });
    startDownload();
  } catch (err) {
    console.error(err);
    submitBtn.disabled = false;
    submitBtn.textContent = "Quero meu ebook gratuito";
    showError("Ops, algo deu errado ao enviar. Tente de novo em instantes. 💛");
  }
});
