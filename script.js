//SOUNDS
var correctSound = new Audio()
correctSound.src = "SOUNDS/match.wav"

var winSound = new Audio()
winSound.src = "SOUNDS/victory.wav"

var wrongSound = new Audio()
wrongSound.src = "SOUNDS/wrong.mp3"

var gameOverSound = new Audio()
gameOverSound.src = "SOUNDS/gameover.wav"

var backgroundMusic = new Audio();
backgroundMusic.src = "SOUNDS/happy.mp3"

const restartButton = document.getElementById('restart-btn')
const questionContainerElement = document.getElementById('question-container')
const title = document.getElementById('title')
const nextButton = document.getElementById('next-btn')
const questionElement = document.getElementById('questions')
const answerButtonsElement = document.getElementById('answer-btn')
const passMessage = document.getElementById('pass-msg')
const failMessage = document.getElementById('fail-msg')
const menuButton = document.getElementById('menu-btn')
const scoreDisplay = document.getElementById('score-display')

let shuffledQuestions, currentQuestionIndex
let countRightAnswers = 0;

nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  document.getElementById("parallax").style.display = "none"
  restartButton.classList.add('hide')
  passMessage.classList.add('hide')
  menuButton.classList.add('hide')
  failMessage.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  countRightAnswers = 0
  questionContainerElement.classList.remove('hide')
  answerButtonsElement.classList.remove('hide')
  title.classList.remove('hide')
  backgroundMusic.play()
  backgroundMusic.loop = true
  backgroundMusic.volume = 0.05
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('answer-btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (10 > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    if (countRightAnswers >= 7) {
      backgroundMusic.pause()
      winSound.volume = .1
      winSound.play()
      passMessage.classList.remove('hide')
      menuButton.classList.remove('hide')
      title.classList.add('hide')
      answerButtonsElement.classList.add('hide')
      questionContainerElement.classList.add('hide')
      scoreDisplay.classList.add('hide')
    } else {
      backgroundMusic.pause()
      gameOverSound.volume = .1
      gameOverSound.play()
      failMessage.classList.remove('hide')
      restartButton.classList.remove('hide')
      title.classList.add('hide')
      answerButtonsElement.classList.add('hide')
      questionContainerElement.classList.add('hide')
      scoreDisplay.classList.add('hide')
    }
  }
  if (selectedButton.dataset = correct) {
    countRightAnswers++
    scoreDisplay.innerHTML = "SCORE: " + countRightAnswers
    correctSound.volume = .1
    correctSound.play()
  } else {
    wrongSound.volume = .1
    wrongSound.play()
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


const questions = [
  {
    question: "What do you call the general average you get at the end of the school year?",
    answers: [
      { text: 'Cumulative Grade Point Average', correct: true },
      { text: 'Term Grade Point Average', correct: false },
      { text: 'Cumulative Term Average', correct: false },
      { text: 'Term Grade Average', correct: false }
    ]
  },
  {
    question: 'What is the minimum Term Grade Point Average (TGPA) for you to be qualified for First Honors?',
    answers: [
      { text: '3.000', correct: false },
      { text: '2.500', correct: false },
      { text: '3.500', correct: true },
      { text: '3.800', correct: false }
    ]
  },
  {
    question: 'If you receive a percentage score of 84 for an academic course, what grade does it equate to?',
    answers: [
      { text: '2.5', correct: false },
      { text: '2.0', correct: true },
      { text: '1.5', correct: false },
      { text: '1.0', correct: false }
    ]
  },
  {
    question: 'All of these subjects are academic courses except one:',
    answers: [
      { text: 'MATWRLD', correct: false },
      { text: 'CSBLIFE', correct: true },
      { text: 'REEXSPI', correct: false },
      { text: 'ARTAPRI', correct: false }
    ]
  },
  {
    question: 'What is the general average you get at the end of every term?',
    answers: [
      { text: 'Cumulative Grade Point Average', correct: false },
      { text: 'Term Grade Point Average', correct: true },
      { text: 'Cumulative Term Average', correct: false },
      { text: 'Term Grade Average', correct: false }
    ]
  },
  {
    question: 'What is the minimum total load you should take to be eligible for the Dean’s list in this online set-up?',
    answers: [
      { text: '12', correct: false },
      { text: '10', correct: false },
      { text: '15', correct: true },
      { text: '18', correct: false }
    ]
  },
  {
    question: 'What is the minimum Term Grade Point Average (TGPA) for you to be qualified for Second Honors?',
    answers: [
      { text: '3.000', correct: true },
      { text: '2.500', correct: false },
      { text: '3.500', correct: false },
      { text: '3.800', correct: false }
    ]
  },
  {
    question: 'Which of the following qualifications for Dean’s List is incorrect?',
    answers: [
      { text: 'Take a total load of at least 15 academic units in an online term.', correct: false },
      { text: 'No record of a major offense or academic dishonesty.', correct: false },
      { text: 'Have no grade below 2.000 in an academic course.', correct: true },
      { text: 'Have a TGPA of at least 3.000 for Second Honors and 3.500 for First Honors.', correct: false }
    ]
  },
  {
    question: 'If you receive a percentage score of 95 for an academic course, what grade does it equate to?',
    answers: [
      { text: '4.0', correct: false },
      { text: '3.5', correct: true },
      { text: '3.0', correct: false },
      { text: '2.5', correct: false }
    ]
  },
  {
    question: 'Which courses do not follow a numerical grade point system?',
    answers: [
      { text: 'Major Courses', correct: false },
      { text: 'Academic Courses', correct: false },
      { text: 'Non-Academic Courses', correct: true },
      { text: 'None of the choices given', correct: false }
    ]
  },
]