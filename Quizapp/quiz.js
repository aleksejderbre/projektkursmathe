let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Quiz starten (Fragen laden und mischen)
function startQuiz(questionsUrl) {
    fetch(questionsUrl)
        .then(response => response.json())
        .then(data => {
            questions = data.questions.sort(() => Math.random()); // Fragen mischen
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

    if (currentQuestionIndex < questions.length) {
        const questionElement = document.createElement("h2");
        questionElement.innerText = questions[currentQuestionIndex].question;
        questionContainer.appendChild(questionElement);

        // Antwortmöglichkeiten mischen
        const shuffledAnswers = shuffleArray(questions[currentQuestionIndex].answers);

        shuffledAnswers.forEach(answer => {
            const button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("answer-btn");
            button.onclick = () => selectAnswer(answer);
            questionContainer.appendChild(button);
        });
    }
}

// Antwortauswahl prüfen
function selectAnswer(answer) {
    const feedbackElement = document.getElementById("feedback");
    const questionContainer = document.getElementById("question-container");
    const scoreElement = document.getElementById("score");

    // Button ausblenden
    const nextBtn = document.getElementById("next-btn");
    nextBtn.style.display = "none"; // Versteckt den Button, nachdem eine Antwort ausgewählt wurde

    if (answer.correct) {
        // Feedback für die richtige Antwort
        feedbackElement.innerText = "RICHTIG!";
        feedbackElement.style.color = "green";
        score++; // Punkt hinzufügen
        scoreElement.innerText = score;
        
        // Antwortknöpfe entfernen und ein Bild hinzufügen
        questionContainer.innerHTML = ""; // Antwortknöpfe löschen
        const imageElement = document.createElement("img");
        imageElement.src = "../../Bilder/Richtig.jpg"; // Bild für richtige Antwort
        imageElement.alt = "Richtige Antwort";
        imageElement.style.width = "300px"; // Optional: Größe anpassen
        imageElement.style.height = "auto";
        questionContainer.appendChild(imageElement);

    } else {
        // Feedback für falsche Antwort
        questionContainer.innerHTML = "";
        
        feedbackElement.innerText = "Falsch! Schade, beim nächsten Mal";
        feedbackElement.style.color = "red";
    
        // Bild für die falsche Antwort
        const imageElement = document.createElement("img");
        imageElement.src = "../../Bilder/Falsch.jpg"; // Bild für falsche Antwort
        imageElement.alt = "Falsche Antwort";
        imageElement.style.width = "300px"; // Optional: Größe anpassen
        imageElement.style.height = "auto";
        questionContainer.appendChild(imageElement);
    }
    
    // Button nach 2 Sekunden wieder anzeigen und zur nächsten Frage wechseln
    setTimeout(() => {
        // Nächste Frage anzeigen
        nextQuestion();

        // Button wieder sichtbar machen
        nextBtn.style.display = "inline-block";
    }, 2000); // Button erscheint nach 2 Sekunden und es wird zur nächsten Frage gewechselt
}


// Zur nächsten Frage wechseln
function nextQuestion() {
    const questionContainer = document.getElementById("question-container");
    const feedbackElement = document.getElementById("feedback");

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionContainer.innerHTML = "";
        feedbackElement.innerText = "Glückwunsch, du hast das Quiz beendet!";
        feedbackElement.style.color = "blue";

        const imageElement = document.createElement("img");
        if (score === questions.length) {
            imageElement.src = "../../Bilder/Perfekt.jpg";
            feedbackElement.innerText = "VOLLE PUNKTZAHL";
        } else if (score > questions.length * 0.7) {
            imageElement.src = "../../Bilder/highscore.jpg";
        } else if (score > questions.length * 0.3) {
            imageElement.src = "../../Bilder/lowscore.jpg";
        } else {
            imageElement.src = "../../Bilder/TryAgain.jpg";
        }

        imageElement.alt = "Quiz beendet";
        imageElement.style.width = "280px";
        imageElement.style.margin = "20px auto";
        questionContainer.appendChild(imageElement);
    }
}

// Hilfsfunktion zum Zufällig Mischen der Antworten
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
