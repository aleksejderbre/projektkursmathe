let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Quiz starten (Fragen laden und mischen)
function startQuiz(questionsUrl) {
    fetch(questionsUrl)
        .then(response => response.json())
        .then(data => {
            questions = data.questions.sort(() => Math.random() - 0.5); // Fragen mischen
            showQuestion(); // Quiz starten, nachdem die Fragen geladen wurden
        })
        .catch(error => console.error("Fehler beim Laden der Fragen:", error));
}

// Frage anzeigen
function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.innerText = ""; // Feedback zurücksetzen
    questionContainer.innerHTML = "";

    const questionElement = document.createElement("h2");
    questionElement.innerText = questions[currentQuestionIndex].question;
    questionContainer.appendChild(questionElement);

    questions[currentQuestionIndex].answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        button.onclick = () => selectAnswer(answer);
        questionContainer.appendChild(button);
    });
}

// Antwortauswahl prüfen
function selectAnswer(answer) {
    const feedbackElement = document.getElementById("feedback");
    const questionContainer = document.getElementById("question-container");
    const scoreElement = document.getElementById("score");

    if (answer.correct) {
        // Feedback für die richtige Antwort
        feedbackElement.innerText = "RICHTIG!";
        feedbackElement.style.color = "green";
        score++; // Punkt hinzufügen
        scoreElement.innerText = score;

        // Antwortknöpfe entfernen und ein Bild hinzufügen
        questionContainer.innerHTML = ""; // Antwortknöpfe löschen
        const imageElement = document.createElement("img");
        imageElement.src = "../Bilder/Richtig.jpg"; // Platzhalter für das Bild
        imageElement.alt = "Richtige Antwort";
        imageElement.style.width = "300px";
        questionContainer.appendChild(imageElement);

        // Nach einer kurzen Verzögerung zur nächsten Frage wechseln
        setTimeout(nextQuestion, 2000); // Wechselt nach 2 Sekunden zur nächsten Frage
    } else {
        // Feedback für falsche Antworten
        questionContainer.innerHTML = "";
        feedbackElement.innerText = "Falsch! Schade, beim nächsten Mal.";
        feedbackElement.style.color = "red";

        const imageElement = document.createElement("img");
        imageElement.src = "../Bilder/Falsch.jpg";
        imageElement.alt = "Falsche Antwort";
        imageElement.style.width = "300px";
        questionContainer.appendChild(imageElement);

        setTimeout(nextQuestion, 2000); // Wechselt nach 2 Sekunden zur nächsten Frage
    }
}

// Zur nächsten Frage wechseln
function nextQuestion() {
    const questionContainer = document.getElementById("question-container");
    const feedbackElement = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Nächste Frage anzeigen
    } else {
        // Quiz beendet
        questionContainer.innerHTML = ""; // Antworten und Fragen löschen
        feedbackElement.innerText = "Glückwunsch, du hast das Quiz beendet!";
        feedbackElement.style.color = "blue";
        scoreElement.innerText = `Dein Punktestand: ${score}`;

        const imageElement = document.createElement("img");
        // Passendes Bild basierend auf der Punktzahl auswählen
        if (score == 10) {
            imageElement.src = "./Bilder/Perfekt.jpg";
        } else if (score > 7) {
            imageElement.src = "./Bilder/HighScore.jpg";
        } else if (score > 3) {
            imageElement.src = "./Bilder/LowScore.jpg";
        } else {
            imageElement.src = "./Bilder/TryAgain.jpg";
        }

        imageElement.alt = "Quiz beendet";
        imageElement.style.width = "500px";
        imageElement.style.margin = "20px auto";
        questionContainer.appendChild(imageElement);
    }
}
