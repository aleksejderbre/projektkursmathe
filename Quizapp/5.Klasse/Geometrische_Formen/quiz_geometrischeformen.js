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
        const question = questions[currentQuestionIndex];

        // Frage anzeigen
        const questionElement = document.createElement("h2");
        questionElement.innerText = question.question;
        questionContainer.appendChild(questionElement);

        // Bild zur Frage anzeigen
        if (question.image) {
            const imageElement = document.createElement("img");
            imageElement.src = question.image;
            imageElement.alt = "Fragebild";
            imageElement.style.width = "300px"; // Größe anpassen
            imageElement.style.height = "auto";
            imageElement.style.display = "block";
            imageElement.style.margin = "10px auto";
            questionContainer.appendChild(imageElement);
        }

        // Antwortmöglichkeiten mischen
        const shuffledAnswers = shuffleArray(question.answers);

        shuffledAnswers.forEach(answer => {
            const button = document.createElement("button");
            button.innerText = answer.text;
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
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// Quiz beenden
function endQuiz() {
    const questionContainer = document.getElementById("question-container");
    const feedbackElement = document.getElementById("feedback");

    questionContainer.innerHTML = "";
    feedbackElement.innerText = `Quiz beendet! Du hast ${score} von ${questions.length} Punkten erreicht.`;
    feedbackElement.style.color = "blue";
}

// Hilfsfunktion zum Mischen der Antworten
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Quiz initialisieren
startQuiz("./geometrischeformen.json");
