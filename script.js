// Função para trocar de tela
function mostrarTela(tela) {
  const telas = document.querySelectorAll('.tela');
  telas.forEach(t => t.style.display = 'none');
  document.getElementById(tela).style.display = 'block';
}

// ----- QUIZ DE RED FLAGS -----
const redFlags = [
  {texto: "Título sensacionalista?", pontos: 2},
  {texto: "Notícia sem fonte confiável?", pontos: 3},
  {texto: "Erro de ortografia?", pontos: 1},
  {texto: "Imagem ou vídeo manipulado?", pontos: 2},
  {texto: "URL suspeita ou clickbait?", pontos: 2},
  {texto: "Sensacionalismo exagerado no texto?", pontos: 1},
  {texto: "Notícia sem data?", pontos: 1},
  {texto: "Texto com muitas maiúsculas?", pontos: 1},
  {texto: "Compartilhada apenas em redes sociais?", pontos: 1},
  {texto: "Fonte não conhecida ou duvidosa?", pontos: 3},
];

let indice = 0;
let pontosTotais = 0;

// Função para mostrar a red flag atual
function mostrarRedFlag() {
  if(indice < redFlags.length) {
    const r = redFlags[indice];
    document.getElementById('perguntas').innerHTML = `
      <p>${r.texto}</p>
      <button onclick="responder(true)">Sim</button>
      <button onclick="responder(false)">Não</button>
    `;
  } else {
    mostrarResultado();
  }
}

// Função que atualiza a pontuação e passa para a próxima red flag
function responder(respostaUsuario) {
  if(respostaUsuario) {
    pontosTotais += redFlags[indice].pontos;
  }
  indice++;
  mostrarRedFlag();
}

// Função que mostra o resultado final do quiz
function mostrarResultado() {
  let resultado = "";
  if(pontosTotais <= 2) resultado = "Notícia provavelmente verdadeira";
  else if(pontosTotais <= 5) resultado = "Atenção: notícia pode ter inconsistências";
  else resultado = "Notícia provavelmente falsa";

  document.getElementById('perguntas').innerHTML = `
    <p>Seu resultado: <strong>${resultado}</strong></p>
    <p>Pontuação total: ${pontosTotais}</p>
    <button onclick="indice=0; pontosTotais=0; mostrarRedFlag()">Refazer Quiz</button>
    <button onclick="mostrarTela('link')">Ir para verificação por link</button>
  `;
}

// Inicializa quiz
mostrarRedFlag();

// ----- VERIFICAÇÃO POR LINK -----
function verificarLink() {
  let url = document.getElementById('linkNoticia').value.toLowerCase();
  let resultado = document.getElementById('resultadoLink');

  if(url.includes("site-suspeito") || url.includes("clickbait")) {
    resultado.textContent = "Esta notícia pode ser falsa!";
    resultado.style.color = "red";
  } else if(url === "") {
    resultado.textContent = "Por favor, insira um link.";
    resultado.style.color = "orange";
  } else {
    result
