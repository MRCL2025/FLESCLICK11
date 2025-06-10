const sounds = [
  "babuino",
  "capuchino asesino",
  "el guay",
  "estraquet petitet",
  "ilyas bensaic",
  "ilyas topuria",
  "leoncio",
  "leoton narizon",
  "MONOS",
  "santi chino",
  "santiró"
];

const container = document.getElementById("sound-list");
const showFavsBtn = document.getElementById("show-favorites");
const toggleDarkBtn = document.getElementById("toggle-dark");

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function isFavorite(name) {
  return getFavorites().includes(name);
}

function toggleFavorite(name) {
  const favs = getFavorites();
  if (favs.includes(name)) {
    localStorage.setItem("favorites", JSON.stringify(favs.filter(f => f !== name)));
  } else {
    favs.push(name);
    localStorage.setItem("favorites", JSON.stringify(favs));
  }
  renderSounds();
}

function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function renderSounds(filterFavorites = false) {
  container.innerHTML = "";
  const favs = getFavorites();

  sounds.forEach((name, index) => {
    if (filterFavorites && !favs.includes(name)) return;

    const div = document.createElement("div");
    div.className = "sound-item";

    const button = document.createElement("button");
    button.className = "sound-button";
    button.onclick = () => playSound(name);
    button.id = `btn${index + 1}`;

    const label = document.createElement("p");
    label.textContent = name;

    const actions = document.createElement("div");
    actions.className = "sound-actions";

    const favBtn = document.createElement("button");
    favBtn.textContent = isFavorite(name) ? "⭐" : "☆";
    favBtn.title = "Favorito";
    favBtn.onclick = () => toggleFavorite(name);

    const shareBtn = document.createElement("button");
    shareBtn.textContent = "📤";
    shareBtn.title = "Compartir";
    shareBtn.onclick = () => {
      const url = `${location.origin}/sounds/${encodeURIComponent(name)}.mp3`;
      navigator.clipboard.writeText(url);
      alert("Enlace copiado: " + url);
    };

    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "⬇️";
    downloadBtn.title = "Descargar";
    downloadBtn.onclick = () => {
      const a = document.createElement("a");
      a.href = `sounds/${name}.mp3`;
      a.download = `${name}.mp3`;
      a.click();
    };

    actions.appendChild(favBtn);
    actions.appendChild(shareBtn);
    actions.appendChild(downloadBtn);

    div.appendChild(button);
    div.appendChild(label);
    div.appendChild(actions);
    container.appendChild(div);
  });
}

toggleDarkBtn.onclick = () => {
  document.body.classList.toggle("dark");
  toggleDarkBtn.textContent = document.body.classList.contains("dark") ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
};

showFavsBtn.onclick = () => {
  const isFiltering = showFavsBtn.dataset.filter === "true";
  showFavsBtn.dataset.filter = !isFiltering;
  showFavsBtn.textContent = isFiltering ? "⭐ Favoritos" : "🔙 Ver Todos";
  renderSounds(!isFiltering);
};

renderSounds();
