# Querida Gratidão · Yoga — Página de captura

Landing page para captar seguidores de yoga, gravar os contatos numa **planilha do Google** e entregar o **ebook em PDF** para download.

## 📁 Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | A página em si |
| `styles.css` | Identidade visual da marca (cores, fontes) |
| `script.js` | Conecta o formulário à planilha + dispara o download |
| `google-apps-script.gs` | Código para colar no Google (recebe os leads) |
| `assets/logo.svg` | Logo da marca (lótus) |
| `ebook.pdf` | **Você adiciona** — o seu ebook |

---

## ✅ Para colocar no ar — 3 passos

### 1) Adicionar o ebook
Copie o seu PDF para esta pasta com o nome **`ebook.pdf`**
(ou mude o nome em `script.js` → `CONFIG.EBOOK_FILE`).

### 2) Conectar a planilha do Google
1. Crie uma planilha em [sheets.new](https://sheets.new).
2. Menu **Extensões → Apps Script**.
3. Apague o conteúdo e cole tudo de `google-apps-script.gs`. Salve (💾).
4. Clique em **Implantar → Nova implantação**.
   - Tipo: **App da Web**
   - Executar como: **Eu**
   - Quem tem acesso: **Qualquer pessoa**
5. Copie a **URL do app da Web** (termina em `/exec`).
6. Cole essa URL em `script.js` → `CONFIG.GOOGLE_SHEET_URL`.

> Pronto: cada lead vira uma linha na sua planilha (Data, Nome, E-mail, WhatsApp).

### 3) Publicar no GitHub Pages
1. Crie um repositório novo no GitHub (ex.: `querida-gratidao-yoga`).
2. Suba estes arquivos (veja "Publicar" abaixo).
3. No repositório: **Settings → Pages**.
4. Em *Source*, escolha a branch `main` e a pasta `/ (root)`. Salve.
5. Em ~1 minuto o site fica no ar em
   `https://SEU-USUARIO.github.io/querida-gratidao-yoga/`.

---

## 🚀 Publicar (linha de comando)

Já existe um repositório git local nesta pasta. Para enviar ao GitHub:

```bash
git add .
git commit -m "Página de captura Querida Gratidão Yoga"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/querida-gratidao-yoga.git
git push -u origin main
```

---

## 🎨 Identidade da marca

- **Cores:** sálvia `#6F7F6A` · terracota `#C77B58` · creme `#F6F1E7` · dourado `#C9A24B`
- **Fontes:** Cormorant Garamond (títulos) + Mulish (texto)
- **Tom:** acolhedor, gentil, presente. *"Respire. Agradeça. Floresça."*

Para testar localmente, é só abrir o `index.html` no navegador.
