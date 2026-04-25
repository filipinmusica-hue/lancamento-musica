// ordenar por mais ouvidas
musicas.sort((a,b) => b.plays - a.plays);

// 🔥 LANÇAMENTO ATUAL
const atual = musicas[0];

const bg = document.getElementById("bg");
const titulo = document.getElementById("titulo");
const contador = document.getElementById("contador");
const botao = document.getElementById("botao");

if(bg){
  bg.src = atual.capa;
  titulo.innerText = atual.nome;
  botao.href = atual.preSave || atual.ouvir;

  if(atual.data){
    const data = new Date(atual.data).getTime();

    setInterval(() => {
      const agora = new Date().getTime();
      const dif = data - agora;

      if(dif <= 0){
        contador.innerHTML = "🎵 Já disponível";
        bg.style.filter = "blur(0)";
        botao.innerText = "▶ Ouvir";
        botao.href = atual.ouvir;
        return;
      }

      const d = Math.floor(dif / (1000*60*60*24));
      const h = Math.floor((dif / (1000*60*60)) % 24);

      contador.innerHTML = `${d}d ${h}h`;
    },1000);
  }
}

// 🔥 TOP 3 HOME
const top = document.getElementById("top");

if(top){
  musicas.slice(0,3).forEach(m => {
    top.innerHTML += `
      <div class="card">
        <img src="${m.capa}">
        <p>${m.nome}</p>
      </div>
    `;
  });
}

// 📀 CATÁLOGO
const grid = document.getElementById("grid");

if(grid){
  musicas.forEach((m,i) => {
    grid.innerHTML += `
      <div class="card">
        <h3>#${i+1}</h3>
        <img src="${m.capa}">
        <p>${m.nome}</p>
        <small>${m.plays} plays</small>
      </div>
    `;
  });
}

