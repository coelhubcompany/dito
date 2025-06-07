// === ELEMENTOS ===
const fraseTexto = document.getElementById("frase-texto");
const fraseAutor = document.getElementById("frase-autor");
const btnTema = document.getElementById("toggle-tema");
const btnCurtir = document.getElementById("btn-curtir");
const btnFavoritar = document.getElementById("btn-favoritar");
const btnCopiar = document.getElementById("btn-copiar");
const btnCompartilhar = document.getElementById("btn-compartilhar");

// === FRASES POR PERÍODO ===
const frases = {
  manha: {
    texto: "Acredite no poder de um novo começo.",
    autor: "Clarice Lispector"
  },
  tarde: {
    texto: "A tarde é perfeita para renovar os sonhos.",
    autor: "Cora Coralina"
  },
  noite: {
    texto: "A noite traz a paz que o coração precisa.",
    autor: "Carlos Drummond de Andrade"
  }
};

// === FUNÇÃO: Determinar período do dia ===
function obterPeriodo() {
  const hora = new Date().getHours();
  if (hora >= 5 && hora < 12) return "manha";
  if (hora >= 12 && hora < 18) return "tarde";
  return "noite";
}

// === FUNÇÃO: Carregar frase do momento ===
function carregarFrase() {
  const periodo = obterPeriodo();
  const frase = frases[periodo];

  fraseTexto.textContent = `“${frase.texto}”`;
  fraseAutor.textContent = `— ${frase.autor}`;

  verificarFavorito(frase);
}

// === FUNÇÃO: Alternar tema claro/escuro ===
btnTema.addEventListener("click", () => {
  const html = document.documentElement;
  const atual = html.getAttribute("data-theme");
  const novo = atual === "light" ? "dark" : "light";
  html.setAttribute("data-theme", novo);
  btnTema.textContent = novo === "light" ? "🌙" : "☀️";
  localStorage.setItem("tema", novo);
});

// === FUNÇÃO: Carregar tema salvo ===
function carregarTema() {
  const salvo = localStorage.getItem("tema") || "light";
  document.documentElement.setAttribute("data-theme", salvo);
  btnTema.textContent = salvo === "light" ? "🌙" : "☀️";
}

// === FUNÇÃO: Curtir frase ===
btnCurtir.addEventListener("click", () => {
  const ativo = btnCurtir.classList.toggle("ativo");
  btnCurtir.textContent = ativo ? "💖" : "❤️";
});

// === FUNÇÃO: Favoritar frase ===
btnFavoritar.addEventListener("click", () => {
  const ativo = btnFavoritar.classList.toggle("ativo");
  btnFavoritar.textContent = ativo ? "🌟" : "⭐";

  const fraseAtual = {
    texto: fraseTexto.textContent,
    autor: fraseAutor.textContent
  };

  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  const index = favoritos.findIndex(f =>
    f.texto === fraseAtual.texto && f.autor === fraseAtual.autor
  );

  if (ativo && index === -1) {
    favoritos.push(fraseAtual);
  } else if (!ativo && index !== -1) {
    favoritos.splice(index, 1);
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
});

// === FUNÇÃO: Verifica se frase já é favorita ===
function verificarFavorito(frase) {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const existe = favoritos.some(f =>
    f.texto === `“${frase.texto}”` && f.autor === `— ${frase.autor}`
  );

  btnFavoritar.classList.toggle("ativo", existe);
  btnFavoritar.textContent = existe ? "🌟" : "⭐";
}

// === FUNÇÃO: Copiar frase ===
btnCopiar.addEventListener("click", () => {
  const texto = `${fraseTexto.textContent} ${fraseAutor.textContent}`;
  navigator.clipboard.writeText(texto).then(() => {
    btnCopiar.textContent = "✅";
    setTimeout(() => (btnCopiar.textContent = "📋"), 1500);
  });
});

// === FUNÇÃO: Compartilhar frase ===
btnCompartilhar.addEventListener("click", () => {
  const texto = `${fraseTexto.textContent} ${fraseAutor.textContent}`;
  if (navigator.share) {
    navigator.share({
      title: "Frase do Dia",
      text: texto,
      url: window.location.href
    }).catch(() => {});
  } else {
    alert("Seu navegador não suporta compartilhamento direto.");
  }
});

// === INICIALIZAÇÃO ===
carregarTema();
carregarFrase();
