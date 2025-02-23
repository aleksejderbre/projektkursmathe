let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctAnswerText;

function startQuiz(questionsUrl) {
    fetch(questionsUrl)
        .then(response => response.json())
        .then(data => {
            questions = data.questions.sort(() => Math.random());
            showQuestion();
        })
        .catch(error => console.error("Fehler beim Laden der Fragen:", error));
}

function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    const feedbackElement = document.getElementById("feedback");

    feedbackElement.innerText = ""; 
    feedbackElement.style.display = "block"; 
    feedbackElement.classList.remove("correct-answer", "wrong-answer"); 
    questionContainer.innerHTML = "";

    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex].question;
        const questionElement = document.createElement("h2");

        if (question.includes("/")) {
            const fractionHTML = question.replace(/(\d+)\/(\d+)/g, "<sup>$1</sup>&frasl;<sub>$2</sub>");
            questionElement.innerHTML = fractionHTML;
        } else {
            questionElement.innerText = question;
        }

        questionContainer.appendChild(questionElement);

        const shuffledAnswers = shuffleArray(questions[currentQuestionIndex].answers);
        correctAnswerText = questions[currentQuestionIndex].answers.find(answer => answer.correct).text;

        shuffledAnswers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text.replace(/(\d+)\/(\d+)/g, "<sup>$1</sup>&frasl;<sub>$2</sub>");
            button.classList.add("answer-btn");
            button.onclick = () => selectAnswer(answer);
            questionContainer.appendChild(button);
        });
    }
}

function selectAnswer(answer) {
    const feedbackElement = document.getElementById("feedback");
    const questionContainer = document.getElementById("question-container");
    const scoreElement = document.getElementById("score");

    feedbackElement.classList.remove("correct-answer", "wrong-answer");

    if (answer.correct) {
        feedbackElement.innerText = "RICHTIG!";
        feedbackElement.classList.add("correct-answer");
        score++;
        scoreElement.innerText = score;

        questionContainer.innerHTML = "";
        const imageElement = document.createElement("img");
        imageElement.src = "../../Bilder/Richtig.jpg";
        imageElement.alt = "Richtige Antwort";
        imageElement.style.width = "300px";
        questionContainer.appendChild(imageElement);

        setTimeout(() => nextQuestion(), 2500);
    } else {
        feedbackElement.innerText = "FALSCH! Versuche es erneut."
        feedbackElement.classList.add("wrong-answer");

        if (score > 0) {
            score--;
            scoreElement.innerText = score;
        }

        questionContainer.innerHTML = "";
        const imageElement = document.createElement("img");
        imageElement.src = "../../Bilder/Falsch.jpg";
        imageElement.alt = "Falsche Antwort";
        imageElement.style.width = "300px";
        questionContainer.appendChild(imageElement);

        setTimeout(() => showQuestion(), 2500);
    }
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    const questionContainer = document.getElementById("question-container");
    const feedbackElement = document.getElementById("feedback");

    questionContainer.innerHTML = "";
    feedbackElement.style.color = "white";

    const imageElement = document.createElement("img");
    if (score === questions.length) {
        imageElement.src = "../../Bilder/Perfekt.jpg";
        feedbackElement.innerText = "VOLLE PUNKTZAHL!";
    } else if (score > questions.length * 0.7) {
        imageElement.src = "../../Bilder/highscore.jpg";
        feedbackElement.innerText = "Glückwunsch, du hast das Quiz beendet!";
    } else if (score > questions.length * 0.3) {
        imageElement.src = "../../Bilder/lowscore.jpg";
        feedbackElement.innerText = "Du hast das Quiz beendet, doch hast eine niedrige Punktzahl!";
    } else {
        imageElement.src = "../../Bilder/TryAgain.webp";
        feedbackElement.innerText = "Versuch es erneut, du hast echt wenig Punkte!";
    }

    imageElement.alt = "Quiz beendet";
    imageElement.style.width = "280px";
    imageElement.style.margin = "20px auto";
    questionContainer.appendChild(imageElement);
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
