let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctAnswerText; // Deklariere correctAnswerText außerhalb der Funktionen

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

    feedbackElement.innerText = ""; // Feedback-Text leeren
    feedbackElement.style.display = "block"; // Sicherstellen, dass es sichtbar bleibt
    feedbackElement.classList.remove("correct-answer", "wrong-answer"); // Klassen entfernen
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
            button.onclick = () => selectAnswer(answer, correctAnswerText);
            questionContainer.appendChild(button);
        });
    }
}

function selectAnswer(answer, correctAnswerText) {
    const feedbackElement = document.getElementById("feedback");
    const questionContainer = document.getElementById("question-container");
    const scoreElement = document.getElementById("score");
    const nextBtn = document.getElementById("next-btn");

    nextBtn.style.display = "none"; // nextBtn verstecken

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
        imageElement.style.height = "auto";
        questionContainer.appendChild(imageElement);

    } else {
        feedbackElement.innerText = `Falsch! Schade, beim nächsten Mal. Richtige Antwort: ${correctAnswerText}`;
        feedbackElement.classList.add("wrong-answer");

        questionContainer.innerHTML = "";
        const imageElement = document.createElement("img");
        imageElement.src = "../../Bilder/Falsch.jpg";
        imageElement.alt = "Falsche Antwort";
        imageElement.style.width = "300px";
        imageElement.style.height = "auto";
        questionContainer.appendChild(imageElement);
    }

    setTimeout(() => {
        feedbackElement.innerHTML = "";
        nextBtn.style.display = "inline-block";
        nextQuestion(); // Die nächste Frage anzeigen
    }, 2500);
}

function nextQuestion() {
    const questionContainer = document.getElementById("question-container");
    const feedbackElement = document.getElementById("feedback");
    const nextBtn = document.getElementById("next-btn");

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionContainer.innerHTML = "";
        feedbackElement.innerText = "Glückwunsch, du hast das Quiz beendet!";
        feedbackElement.style.color = "White";
        nextBtn.style.display = "none";
        

        const imageElement = document.createElement("img");
        if (score === questions.length) {
            imageElement.src = "../../Bilder/Perfekt.jpg";
            feedbackElement.innerText = "VOLLE PUNKTZAHL!";
        } else if (score > questions.length * 0.7) {
            imageElement.src = "../../Bilder/highscore.jpg";
        } else if (score > questions.length * 0.3) {
            imageElement.src = "../../Bilder/lowscore.jpg";
        } else {
            imageElement.src = "../../Bilder/TryAgain.webp";
        }

        imageElement.alt = "Quiz beendet";
        imageElement.style.width = "280px";
        imageElement.style.margin = "20px auto";
        questionContainer.appendChild(imageElement);
    }
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}