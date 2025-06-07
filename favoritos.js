const listaFavoritos = document.getElementById("lista-favoritos");
const btnTema = document.getElementById("toggle-tema");

// === TEMA ===
btnTema.addEventListener("click", () => {
  const html = document.documentElement;
  const atual = html.getAttribute("data-theme");
  const novo = atual === "light" ? "dark" : "light";
  html.setAttribute("data-theme", novo);
  btnTema.textContent = novo === "light" ? "🌙" : "☀️";
  localStorage.setItem("tema", novo);
});

function carregarTema() {
  const salvo = localStorage.getItem("tema") || "light";
  document.documentElement.setAttribute("data-theme", salvo);
  btnTema.textContent = salvo === "light" ? "🌙" : "☀️";
}

// === MOSTRAR FAVORITOS ===
function carregarFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.length === 0) {
    listaFavoritos.innerHTML = "<p>Você ainda não favoritou nenhuma frase.</p>";
    return;
  }

  listaFavoritos.innerHTML = "";

  favoritos.forEach((frase, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <blockquote>${frase.texto}</blockquote>
      <cite>${frase.autor}</cite>
      <button class="btn-remover" data-index="${index}" title="Remover">🗑️ Remover</button>
    `;
    listaFavoritos.appendChild(card);
  });

  // Botões de remover
  const botoesRemover = document.querySelectorAll(".btn-remover");
  botoesRemover.forEach(botao => {
    botao.addEventListener("click", () => {
      const i = botao.getAttribute("data-index");
      favoritos.splice(i, 1);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      carregarFavoritos(); // atualiza a lista
    });
  });
}

// === INICIALIZAR ===
carregarTema();
carregarFavoritos();
