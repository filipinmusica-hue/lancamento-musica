// música atual (lançamento mais novo)
const atual = musicas[0];

const bg = document.getElementById("bg");
const titulo = document.getElementById("titulo");
const contador = document.getElementById("contador");
const botao = document.getElementById("botao");

// aplica dados na home
if(bg){
  bg.src = atual.capa;
  titulo.innerText = atual.nome;
  botao.href = atual.preSave || atual.ouvir;

  const data = new Date(atual.data).getTime();

  setInterval(() => {
    const agora = new Date().getTime();
    const dif = data - agora;

    if (dif <= 0) {
      contador.innerHTML = "🎵 Já disponível";
      bg.style.filter = "blur(0)";
      botao.innerText = "▶ Ouvir";
      botao.href = atual.ouvir;
      return;
    }

    const d = Math.floor(dif / (1000*60*60*24));
    const h = Math.floor((dif / (1000*60*60)) % 24);

    contador.innerHTML = `${d}d ${h}h`;
  }, 1000);
}

// 🔥 SALVAR DESTAQUES
function salvarDestaque(musica){
  let destaques = JSON.parse(localStorage.getItem("destaques")) || [];

  // evita duplicar
  if(!destaques.find(m => m.nome === musica.nome)){
    destaques.push(musica);
  }

  localStorage.setItem("destaques", JSON.stringify(destaques));
}

// 🎧 GERAR CATÁLOGO
const grid = document.getElementById("grid");

if(grid){
  musicas.forEach(m => {
    grid.innerHTML += `
      <div class="card" onclick='salvarDestaque(${JSON.stringify(m)})'>
        <img src="${m.capa}">
        <p>${m.nome}</p>
      </div>
    `;
  });
}

// ⭐ MOSTRAR DESTAQUES NA HOME
const gridDestaques = document.getElementById("destaques");

if(gridDestaques){
  const destaques = JSON.parse(localStorage.getItem("destaques")) || [];

  destaques.forEach(m => {
    gridDestaques.innerHTML += `
      <div class="card">
        <img src="${m.capa}">
        <p>${m.nome}</p>
      </div>
    `;
  });
}
