// Liste des questions avec leurs réponses possibles et la réponse correcte
const questions = [
    {
        question: "Quelle est la capitale de la France?",
        answers: ["Paris", "Londres", "Berlin"],
        correctAnswer: "Paris"
    },
    {
        question: "Quelle est la plus grande planète du système solaire?",
        answers: ["Terre", "Mars", "Jupiter"],
        correctAnswer: "Jupiter"
    },
    {
        question: "Qui a écrit 'Les Misérables'?",
        answers: ["Victor Hugo", "Charles Dickens", "Mark Twain"],
        correctAnswer: "Victor Hugo"
    },
    {
        question: "Quelle est la vitesse de la lumière?",
        answers: ["300 000 km/s", "150 000 km/s", "100 000 km/s"],
        correctAnswer: "300 000 km/s"
    },
    {
        question: "Quelle est la langue officielle du Brésil?",
        answers: ["Espagnol", "Portugais", "Français"],
        correctAnswer: "Portugais"
    },
    {
        question: "Quelle est la monnaie du Japon?",
        answers: ["Yuan", "Won", "Yen"],
        correctAnswer: "Yen"
    },
    {
        question: "Quelle est la capitale de l'Australie?",
        answers: ["Sydney", "Melbourne", "Canberra"],
        correctAnswer: "Canberra"
    },
    {
        question: "Qui a peint la Mona Lisa?",
        answers: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "Quel est le plus grand océan du monde?",
        answers: ["Atlantique", "Indien", "Pacifique"],
        correctAnswer: "Pacifique"
    },
    {
        question: "Quel est l'élément chimique représenté par le symbole O?",
        answers: ["Osmium", "Or", "Oxygène"],
        correctAnswer: "Oxygène"
    }
];

// Variables pour suivre l'état du jeu
let currentQuestionIndex = 0;
let score = 0;
let playerName = '';
let participantsScores = [];

// Éléments du DOM
const startButton = document.getElementById('startButton');
const questionContainer = document.getElementById('questionContainer');
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer');
const messageElement = document.getElementById('message');
const nextButton = document.getElementById('nextButton');
const resultContainer = document.getElementById('result');
const resultMessage = document.getElementById('resultMessage');
const restartButton = document.getElementById('restartButton');
const historyList = document.getElementById('historyList');
const playerNameInput = document.getElementById('name');

// Écouteurs d'événements pour les boutons
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        showResult();
    }
});
restartButton.addEventListener('click', restartGame);

// Ajoute un écouteur d'événements à chaque bouton de réponse
answerButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectAnswer(button);
    });
});

// Fonction pour démarrer le jeu
function startGame() {
    playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert('Veuillez entrer votre nom pour commencer.');
        return;
    }
    // Cache l'écran d'introduction et affiche l'écran des questions
    document.querySelector('.intro').style.display = 'none';
    questionContainer.style.display = 'block';
    setNextQuestion();
}

// Fonction pour afficher la prochaine question
function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

// Fonction pour afficher une question spécifique
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        answerButtons[index].innerText = answer;
        answerButtons[index].dataset.correct = answer === question.correctAnswer;
    });
}

// Fonction pour réinitialiser l'état de l'interface utilisateur entre les questions
function resetState() {
    messageElement.innerText = '';
    answerButtons.forEach(button => {
        button.classList.remove('correct', 'wrong');
    });
    nextButton.style.display = 'none';
}

// Fonction pour sélectionner une réponse
function selectAnswer(button) {
    const selectedAnswer = button.innerText;
    const correct = button.dataset.correct === 'true';

    if (correct) {
        button.classList.add('correct');
        messageElement.innerText = 'Correct !';
        score += 5;
    } else {
        button.classList.add('wrong');
        messageElement.innerText = `Incorrect. La bonne réponse est: ${questions[currentQuestionIndex].correctAnswer}`;
        score -= 3;
    }

    nextButton.style.display = 'block';
}

// Fonction pour afficher le résultat final
function showResult() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultMessage.innerText = `${playerName}, vous avez obtenu ${score} points !`;
    saveParticipantScore();
    displayAllScores();
}

// Fonction pour sauvegarder le score du participant
function saveParticipantScore() {
    participantsScores.push({ name: playerName, score: score });
}

// Fonction pour afficher tous les scores des participants
function displayAllScores() {
    historyList.innerHTML = '';
    participantsScores.forEach(participant => {
        const li = document.createElement('li');
        li.textContent = `${participant.name}: ${participant.score} points`;
        historyList.appendChild(li);
    });
}

// Fonction pour recommencer le jeu
function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    playerName = '';
    participantsScores = [];
    playerNameInput.value = '';
    resultContainer.style.display = 'none';
    document.querySelector('.intro').style.display = 'block';
    historyList.innerHTML = '';
}