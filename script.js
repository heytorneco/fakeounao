const questions = [
  { text: "O título está todo em caixa alta?", options: [{ text: "Sim", points: 2 }, { text: "Não", points: 0 }] },
  { text: "A notícia cita fontes confiáveis?", options: [{ text: "Sim", points: 0 }, { text: "Não", points: 2 }] },
  { text: "O conteúdo tem erros de português evidentes?", options: [{ text: "Sim", points: 1 }, { text: "Não", points: 0 }] },
  { text: "O site é conhecido ou confiável?", options: [{ text: "Sim", points: 0 }, { text: "Não", points: 2 }] },
  { text: "O título é sensacionalista ou exagerado?", options: [{ text: "Sim", points: 2 }, { text: "Não", points: 0 }] },
  { text: "A notícia apresenta datas ou números inconsistentes?", options: [{ text: "Sim", points: 2 }, { text: "Não", points: 0 }] },
  { text: "Há uso excessivo de adjetivos como 'chocante' ou 'alarmante'?", options: [{ text: "Sim", points: 1 }, { text: "Não", points: 0 }] },
  { text: "O autor é identificado e confiável?", options: [{ text: "Sim", points: 0 }, { text: "Não", points: 2 }] },
  { text: "A notícia circula apenas em redes sociais e não em veículos conhecidos?", options: [{ text: "Sim", points: 2 }, { text: "Não", points: 0 }] },
  { text: "A notícia mistura fatos com opinião de forma confusa?", options: [{ text: "Sim", points: 1 }, { text: "Não", points: 0 }] }
];

let currentIndex = 0;
let score = 0;

const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");
const restartBtn = document.getElementById("restart");

function showQuestion() {
  quizDiv.innerHTML = "";
  const q = questions[currentIndex];
  const questionEl = document.createElement("h2");
  questionEl.textContent = q.text;
  quizDiv.appendChild(questionEl);

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.addEventListener("click", () => handleAnswer(opt.points));
    quizDiv.appendChild(btn);
  });
}

function handleAnswer(points) {
  score += points;
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizDiv.classList.add("hidden");
  restartBtn.classList.remove("hidden");
  resultDiv.classList.remove("hidden");

  let message = "";
  let cssClass = "";

  if (score <= 3) {
    message = "Provavelmente verdadeira";
    cssClass = "true";
  } else if (score <= 7) {
    message = "Suspeita";
    cssClass = "suspect";
  } else {
    message = "Provavelmente fake news";
    cssClass = "fake";
  }

  resultDiv.className = cssClass;
  resultDiv.innerHTML = `<h2>Resultado final:</h2><p>${message}</p><p>Pontuação total: ${score}</p>`;
}

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  quizDiv.classList.remove("hidden");
  resultDiv.classList.add("hidden");
  restartBtn.classList.add("hidden");
  showQuestion();
});

showQuestion();
