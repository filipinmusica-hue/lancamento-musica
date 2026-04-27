// só roda se existir dados
if (typeof musicas !== "undefined" && Array.isArray(musicas)) {

  const agora = new Date().getTime();

  let lancamento = null;
  let liberadas = [];

  // separar músicas
  musicas.forEach(m => {
    if (m.data) {
      const data = new Date(m.data).getTime();

      if (!isNaN(data) && data > agora) {
        lancamento = m;
      } else {
        liberadas.push(m);
      }
    } else {
      liberadas.push(m);
    }
  });

  // ordenar liberadas
  liberadas.sort((a,b) => (b.plays || 0) - (a.plays || 0));

  // ===== HOME =====
  const bg = document.getElementById("bg");
  const titulo = document.getElementById("titulo");
  const contador = document.getElementById("contador");
  const botao = document.getElementById("botao");

  if (bg && titulo && contador && botao) {

    const atual = lancamento || liberadas[0];

    if (atual) {
      bg.src = atual.capa || "";
      titulo.innerText = atual.nome || "";
      botao.href = atual.preSave || atual.ouvir || "#";
    }

    // só roda contador se for lançamento futuro
    if (lancamento && lancamento.data) {
      const data = new Date(lancamento.data).getTime();

      const intervalo = setInterval(() => {
        const agora2 = new Date().getTime();
        const dif = data - agora2;

        if (dif <= 0) {
          contador.innerHTML = "Já disponível";
          bg.style.filter = "blur(0)";
          botao.innerText = "Ouvir agora";
          botao.href = lancamento.ouvir || "#";
          clearInterval(intervalo);

          liberadas.unshift(lancamento);
          atualizarTop();
          atualizarCatalogo();
          return;
        }

        const d = Math.floor(dif / (1000*60*60*24));
        const h = Math.floor((dif / (1000*60*60)) % 24);
        const m = Math.floor((dif / (1000*60)) % 60);

        contador.innerHTML = `${d}d ${h}h ${m}m`;
      }, 1000);
    } else {
      contador.innerHTML = "";
    }
  }

  // ===== TOP =====
  function atualizarTop(){
    const top = document.getElementById("top");
    if (!top) return;

    top.innerHTML = "";

    liberadas.slice(0,3).forEach(m => {
      top.innerHTML += `
        <div class="card">
          <img src="${m.capa || ""}">
          <p>${m.nome || ""}</p>
        </div>
      `;
    });
  }

  // ===== CATÁLOGO =====
  function atualizarCatalogo(){
    const grid = document.getElementById("grid");
    if (!grid) return;

    grid.innerHTML = "";

    liberadas.forEach((m,i) => {
      grid.innerHTML += `
        <div class="card">
          <h3>#${i+1}</h3>
          <img src="${m.capa || ""}">
          <p>${m.nome || ""}</p>
          <small>${m.plays || 0} plays</small>
        </div>
      `;
    });
  }

  // iniciar
  atualizarTop();
  atualizarCatalogo();

}
