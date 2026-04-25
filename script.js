if (typeof musicas !== "undefined") {

  const agora = new Date().getTime();

  // ===== SEPARAR MÚSICAS =====
  let lancamento = null;
  let liberadas = [];

  musicas.forEach(m => {
    if (m.data) {
      const data = new Date(m.data).getTime();

      if (data > agora) {
        lancamento = m; // futura
      } else {
        liberadas.push(m); // já lançou
      }
    } else {
      liberadas.push(m);
    }
  });

  // ordenar liberadas
  liberadas.sort((a,b) => (b.plays || 0) - (a.plays || 0));

  // ===== HOME (BANNER) =====
  const bg = document.getElementById("bg");
  const titulo = document.getElementById("titulo");
  const contador = document.getElementById("contador");
  const botao = document.getElementById("botao");

  if (bg && titulo && contador && botao && lancamento) {

    bg.src = lancamento.capa;
    titulo.innerText = lancamento.nome;
    botao.href = lancamento.preSave || "#";

    const data = new Date(lancamento.data).getTime();

    const intervalo = setInterval(() => {
      const agora2 = new Date().getTime();
      const dif = data - agora2;

      if (dif <= 0) {
        contador.innerHTML = "🎵 Já disponível";
        bg.style.filter = "blur(0)";
        botao.innerText = "▶ Ouvir agora";
        botao.href = lancamento.ouvir || "#";
        clearInterval(intervalo);

        // 🔥 entra nas liberadas automaticamente
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
  }

  // ===== FUNÇÕES =====

  function atualizarTop(){
    const top = document.getElementById("top");
    if (!top) return;

    top.innerHTML = "";

    liberadas.slice(0,3).forEach(m => {
      top.innerHTML +=