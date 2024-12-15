// Quiz für das Thema "Brüche" starten
document.addEventListener("DOMContentLoaded", () => {
    startQuiz('questions_bruche.json');
});

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Fragen laden und Quiz starten
fetch('questions_bruche.json')
    .then(response => response.json())
    .then(data => {
        questions = data.questions.sort(() => Math.random() - 0.5); // Fragen mischen
        showQuestion(); // Quiz starten, nachdem die Fragen geladen wurden
    })
    .catch(error => console.error("Fehler beim Laden der Fragen:", error));

// Frage anzeigen
function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.innerText = ""; // Feedback zurücksetzen
    questionContainer.innerHTML = '';

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
        imageElement.style.width = "300px"; // Optional: Größe anpassen
        imageElement.style.height = "auto";
        questionContainer.appendChild(imageElement);
        
        // Nach einer kurzen Verzögerung zur nächsten Frage wechseln
        setTimeout(nextQuestion, 2000); // Wechselt nach 2 Sekunden zur nächsten Frage
    } else {
        // Feedback für falsche Antworten
        questionContainer.innerHTML = "";
        feedbackElement.innerText = "Falsch! Schade beim nächsten Mal";
        feedbackElement.style.color = "red";
        imageElement = document.createElement("img");
        imageElement.src = "../Bilder/Falsch.jpg";
        imageElement.alt = "Falsche Antwort";
        imageElement.style.width = "300px"; // Optional: Größe anpassen
        imageElement.style.height = "auto";
        questionContainer.appendChild(imageElement);

        // Nach einer kurzen Verzögerung zur nächsten Frage wechseln
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
        // Zeige die nächste Frage
        showQuestion();
    } else {
        // Quiz beendet
        questionContainer.innerHTML = ""; // Lösche die Antworten und Fragen
        feedbackElement.innerText = "Glückwunsch, du hast das Quiz beendet!";
        feedbackElement.style.color = "blue";
        scoreElement.innerText = `Dein Punktestand: ${score}`;

        // Wähle das passende Bild basierend auf der Punktzahl
        const imageElement = document.createElement("img");
        if (score == 10){
            imageElement.src = "IMAGE_SOURCE_VERY_HIGH";
        } else if (score > 7) {
            imageElement.src = "IMAGE_SOURCE_HIGH_SCORE"; // Bild für hohe Punktzahl
        } else if (score > 3) {
            imageElement.src = "IMAGE_SOURCE_LOW_SCORE"; // Bild für niedrige Punktzahl
        }

        // Bildgröße und Styling
        imageElement.alt = "Quiz beendet";
        imageElement.style.width = "500px"; // Breite anpassen
        imageElement.style.height = "auto"; // Automatische Höhe für Proportionen
        imageElement.style.display = "block"; // Zentriert das Bild
        imageElement.style.margin = "20px auto";

        // Bild hinzufügen
        questionContainer.appendChild(imageElement);
    }
}


// Event-Listener für DOM-Content-Load entfernen, da das Quiz erst nach dem Laden der JSON gestartet wird

// Starte das Quiz beim Laden der Seite
document.addEventListener("DOMContentLoaded", showQuestion);
