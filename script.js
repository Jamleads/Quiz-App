"use strict";

// VARIABLES
const startBtn = document.querySelector(".start-btn");
const nextBtn = document.querySelector(".next-btn");
const questionContainer = document.querySelector(".question-container");
const questionElement = document.querySelector(".question-element");
const answerBtn = document.querySelector(".answer-btn");
const upperCount = document.querySelector(".upper-count");
const controlCount = document.querySelector(".controls-count");
const correctNote = document.querySelector(".corect-note");
const wrongNote = document.querySelector(".wrong-note");
let questionCount = document.querySelector(".count");
let score = document.querySelector(".score");
let shuffledQiestion, currentQuestion;
const questions = [
  {
    question: "What is 3 * 3 ?",
    answers: [
      { text: "6", correct: false },
      { text: "9", correct: true },
      { text: "33", correct: false },
      { text: "12", correct: false },
    ],
  },
  {
    question: "The study of the nose is Called ? ",
    answers: [
      { text: "hippology", correct: false },
      { text: "grammatology", correct: false },
      { text: "ethnology", correct: false },
      { text: "rhinology", correct: true },
    ],
  },
  {
    question: "What is the name of this Grick letter 'ß' ",
    answers: [
      { text: "Beta", correct: true },
      { text: "Alpha", correct: false },
      { text: "Gama", correct: false },
      { text: "Xray", correct: false },
    ],
  },
  {
    question: "What is 2 * 3 ?",
    answers: [
      { text: "6", correct: true },
      { text: "9", correct: false },
      { text: "33", correct: false },
      { text: "12", correct: false },
    ],
  },
  {
    question: "The Fear of thunder and lightening is known as ?",
    answers: [
      { text: "Astraphobia", correct: true },
      { text: "Entomophobia", correct: false },
      { text: "Tachophobia", correct: false },
      { text: "Gamophobia", correct: false },
    ],
  },
  {
    question: "Geology is the study or science of ?",
    answers: [
      { text: "study of earth's crust", correct: true },
      { text: "study of human material remains", correct: false },
      { text: "science of knowledge or wisdom", correct: false },
      { text: "study of earthquakes", correct: false },
    ],
  },
  {
    question: "What is 4 * 3 ?",
    answers: [
      { text: "6", correct: false },
      { text: "9", correct: false },
      { text: "33", correct: false },
      { text: "12", correct: true },
    ],
  },
  {
    question: "Fear of houses is known as which phobia ?",
    answers: [
      { text: "Barophobia", correct: false },
      { text: "Nosocomephobia", correct: false },
      { text: "Philophobia", correct: false },
      { text: "Domatophobia", correct: true },
    ],
  },
  {
    question:
      "What is the name of the newly elected president of Nigeria (2023)?",
    answers: [
      { text: "Peter Obi", correct: false },
      { text: "Goodwin Emefiele", correct: false },
      { text: "Atiku Abubaka", correct: false },
      { text: "Bola Tinubu", correct: true },
    ],
  },
  {
    question: "What is 5 * 5 ?",
    answers: [
      { text: "6", correct: false },
      { text: "9", correct: false },
      { text: "25", correct: true },
      { text: "12", correct: false },
    ],
  },
];

// EVENTS
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
  nextBtn.classList.add("hide");
  clearStatusClass(controlCount);
  currentQuestion++;
  setNextQuestion();
  countQuetions();
  correctNote.classList.add("hide");
  wrongNote.classList.add("hide");
});

// FUNCTION
function startGame() {
  console.log("SartBtn is clciked");
  startBtn.classList.add("hide");
  upperCount.classList.remove("hide");
  questionContainer.classList.remove("hide");
  shuffledQiestion = questions.sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  setNextQuestion();
}

function setNextQuestion() {
  reSetState();
  showQuestion(shuffledQiestion[currentQuestion]);
}

function showQuestion(question) {
  questionElement.innerHTML = question.question;

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);

    if (answer.correct === true) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function reSetState() {
  clearStatusClass(questionContainer);
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct;
  setStatusClass(controlCount, correct);

  if (selectedBtn.dataset.correct) {
    correctNote.classList.remove("hide");
    wrongNote.classList.add("hide");
    countPoint();
  } else {
    correctNote.classList.add("hide");
    wrongNote.classList.remove("hide");
  }

  Array.from(answerBtn.children).forEach((button) => {
    if (selectedBtn.dataset.correct) {
      selectedBtn.classList.add("correct");
    } else {
      if (button.dataset.correct) {
        selectedBtn.classList.add("wrong");
        button.classList.add("correct");
      }
    }
  });

  if (shuffledQiestion.length > currentQuestion + 1) {
    nextBtn.classList.remove("hide");
  } else {
    startBtn.innerHTML = "Restart";
    startBtn.classList.remove("hide");
    startBtn.addEventListener("click", () => {
      score.innerHTML = "0";
      questionCount.innerHTML = "1";
    });
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("wrong");
  element.classList.remove("correct");
}

function countPoint() {
  if (score.innerHTML === "0") {
    score.innerHTML = "1";
  } else {
    score.innerHTML = Number(score.innerHTML) + 1;
  }
}

function countQuetions() {
  if (questionCount.innerHTML === "1") {
    questionCount.innerHTML = "2";
    console.log("got here");
  } else {
    questionCount.innerHTML = Number(questionCount.innerHTML) + 1;
  }
}
