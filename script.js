// só roda se existir dados
if (typeof musicas !== "undefined") {

  // ===== ORDENAR =====
  musicas.sort((a,b) => (b.plays || 0) - (a.plays || 0));

  // ===== HOME =====
  const bg = document.getElementById("bg");
  const titulo = document.getElementById("titulo");
  const contador = document.getElementById("contador");
  const botao = document.getElementById("botao");

  if (bg && titulo && contador && botao && musicas.length > 0) {
    const atual = musicas[0];

    bg.src = atual.capa || "";
    titulo.innerText = atual.nome || "";

    // botão
    botao.href = atual.preSave || atual.ouvir || "#";

    // ===== CONTADOR =====
    if (atual.data) {
      const data = new Date(atual.data).getTime();

      const intervalo = setInterval(() => {
        const agora = new Date().getTime();
        const dif = data - agora;

        if (dif <= 0) {
          contador.innerHTML = "🎵 Já disponível";
          bg.style.filter = "blur(0)";
          botao.innerText = "▶ Ouvir agora";
          botao.href = atual.ouvir || "#";
          clearInterval(intervalo);
          return;
        }

        const d = Math.floor(dif / (1000 * 60 * 60 * 24));
        const h = Math.floor((dif / (1000 * 60 * 60)) % 24);
        const m = Math.floor((dif / (1000 * 60)) % 60);

        contador.innerHTML = `${d}d ${h}h ${m}m`;
      }, 1000);
    } else {
      contador.innerHTML = "";
    }
  }

  // ===== MAIS OUVIDAS (HOME) =====
  const top = document.getElementById("top");

  if (top && musicas.length > 0) {
    top.innerHTML = "";

    musicas.slice(0, 3).forEach((m) => {
      top.innerHTML += `
        <div class="card">
          <img src="${m.capa || ""}">
          <p>${m.nome || ""}</p>
        </div>
      `;
    });
  }

  // ===== CATÁLOGO =====
  const grid = document.getElementById("grid");

  if (grid && musicas.length > 0) {
    grid.innerHTML = "";

    musicas.forEach((m, i) => {
      grid.innerHTML += `
        <div class="card">
          <h3>#${i + 1}</h3>
          <img src="${m.capa || ""}">
          <p>${m.nome || ""}</p>
          <small>${m.plays || 0} plays</small>
        </div>
      `;
    });
  }

}