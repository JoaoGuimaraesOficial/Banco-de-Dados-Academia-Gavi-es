// Nome da pasta onde estão header.html e footer.html
const PASTA_LAYOUT = "layout";

// Raiz do projeto, calculada a partir do local deste script (js/include.js)
const BASE = new URL("../", document.currentScript.src).href;

// Carrega um ficheiro HTML externo dentro de um elemento.
async function loadPartial(el, file) {
  if (!el) return;
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(res.status);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error("Erro ao carregar " + file + ":", err);
    el.innerHTML = '<p class="erro">Não foi possível carregar: ' + file + "</p>";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const tarefas = [
    loadPartial(document.getElementById("header-placeholder"), BASE + PASTA_LAYOUT + "/header.html"),
    loadPartial(document.getElementById("footer-placeholder"), BASE + PASTA_LAYOUT + "/footer.html"),
  ];

  // Blocos com data-include: caminho relativo à página atual
  document.querySelectorAll("[data-include]").forEach((el) => {
    tarefas.push(loadPartial(el, el.dataset.include));
  });

  await Promise.all(tarefas);

  // Links do header: caminho sempre a partir da raiz do projeto
  document.querySelectorAll("[data-page]").forEach((a) => {
    a.href = BASE + a.dataset.page;
  });

  // Ano automático no rodapé
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Menu mobile
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  // Destaca o link da página atual
  document.querySelectorAll("#mainNav a").forEach((a) => {
    if (a.pathname === location.pathname) a.classList.add("active");
  });

  // Se a URL tiver #entidade, rola até ela depois de carregar o conteúdo
  if (location.hash) {
    const alvo = document.querySelector(location.hash);
    if (alvo) alvo.scrollIntoView();
  }
});
