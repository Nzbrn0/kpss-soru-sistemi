
const sections = document.querySelectorAll(".lesson-section");

let openedSections = 0;

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

function updateProgress() {
    const percent = Math.round((openedSections / sections.length) * 100);

    progressText.textContent = `%${percent}`;
    progressFill.style.width = `${percent}%`;
}

sections.forEach(section => {
    const header = section.querySelector(".section-header");
    const content = section.querySelector(".section-content");
    const arrow = section.querySelector(".section-arrow");

    header.addEventListener("click", function () {
        const isOpen = content.classList.contains("open");

        if (isOpen) {
            content.classList.remove("open");
            arrow.textContent = "+";
        } else {
            content.classList.add("open");
            arrow.textContent = "−";

            if (!section.dataset.visited) {
                section.dataset.visited = "true";
                openedSections++;
                updateProgress();
            }
        }
    });
});

// Konu içindeki mini sorular
document.querySelectorAll(".mini-question").forEach(question => {
    const buttons = question.querySelectorAll(".answer-button");
    const result = question.querySelector(".mini-result");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            if (question.dataset.answered) return;

            question.dataset.answered = "true";

            if (button.dataset.correct === "true") {
                button.classList.add("correct");
                result.textContent = "Doğru cevap! Tebrikler.";
                result.style.color = "#86efac";
            } else {
                button.classList.add("wrong");
                result.textContent = "Yanlış cevap. Doğru seçenek yeşil renkle gösterildi.";
                result.style.color = "#fca5a5";

                buttons.forEach(option => {
                    if (option.dataset.correct === "true") {
                        option.classList.add("correct");
                    }
                });
            }

            buttons.forEach(option => {
                option.disabled = true;
            });
        });
    });
});

// Beş soruluk test
const questions = [
    {
        question: "2³ · 2⁴ işleminin sonucu hangisidir?",
        answers: ["2⁷", "4⁷", "2¹²", "2¹"],
        correct: 0,
        explanation: "Tabanlar aynı olduğunda çarpmada üsler toplanır: 2³ · 2⁴ = 2⁷."
    },
    {
        question: "3⁰ + 2² işleminin sonucu kaçtır?",
        answers: ["4", "5", "6", "9"],
        correct: 1,
        explanation: "3⁰ = 1 ve 2² = 4. Toplamları 5'tir."
    },
    {
        question: "(−2)⁴ kaçtır?",
        answers: ["−16", "−8", "8", "16"],
        correct: 3,
        explanation: "Negatif tabanın çift kuvveti pozitiftir: (−2)⁴ = 16."
    },
    {
        question: "2⁻³ hangi kesre eşittir?",
        answers: ["−8", "1/8", "−1/8", "8"],
        correct: 1,
        explanation: "Negatif üs tersini almayı gerektirir: 2⁻³ = 1/2³ = 1/8."
    },
    {
        question: "5⁶ / 5² işleminin sonucu hangisidir?",
        answers: ["5³", "5⁸", "5⁴", "1"],
        correct: 2,
        explanation: "Tabanlar aynı olduğunda bölmede üsler çıkarılır: 5⁶ / 5² = 5⁴."
    }
];

const testStart = document.getElementById("testStart");
const testArea = document.getElementById("testArea");
const testResult = document.getElementById("testResult");

const startTestButton = document.getElementById("startTest");
const questionCounter = document.getElementById("questionCounter");
const testScore = document.getElementById("testScore");
const testProgress = document.getElementById("testProgress");
const questionText = document.getElementById("questionText");
const testAnswers = document.getElementById("testAnswers");
const answerFeedback = document.getElementById("answerFeedback");
const nextQuestionButton = document.getElementById("nextQuestion");
const resultText = document.getElementById("resultText");
const retryTestButton = document.getElementById("retryTest");

let currentQuestion = 0;
let score = 0;
let answered = false;

function beginTest() {
    currentQuestion = 0;
    score = 0;

    testStart.hidden = true;
    testResult.hidden = true;
    testArea.hidden = false;

    showQuestion();
}

function showQuestion() {
    answered = false;

    const question = questions[currentQuestion];

    questionCounter.textContent =
        `Soru ${currentQuestion + 1} / ${questions.length}`;

    testScore.textContent = `Doğru: ${score}`;
    testProgress.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    questionText.textContent = question.question;
    testAnswers.innerHTML = "";
    answerFeedback.textContent = "";
    answerFeedback.className = "answer-feedback";
    nextQuestionButton.hidden = true;

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-option";
        button.textContent =
            `${String.fromCharCode(65 + index)}) ${answer}`;

        button.addEventListener("click", function () {
            selectAnswer(index);
        });

        testAnswers.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];
    const buttons = testAnswers.querySelectorAll(".answer-option");
    const isCorrect = selectedIndex === question.correct;

    if (isCorrect) {
        score++;
        buttons[selectedIndex].classList.add("correct");
        answerFeedback.textContent = `Doğru cevap! ${question.explanation}`;
        answerFeedback.classList.add("correct-text");
    } else {
        buttons[selectedIndex].classList.add("wrong");
        buttons[question.correct].classList.add("correct");
        answerFeedback.textContent = `Yanlış cevap. ${question.explanation}`;
        answerFeedback.classList.add("wrong-text");
    }

    buttons.forEach(button => {
        button.disabled = true;
    });

    testScore.textContent = `Doğru: ${score}`;

    nextQuestionButton.textContent =
        currentQuestion === questions.length - 1
            ? "Sonucu Gör →"
            : "Sonraki Soru →";

    nextQuestionButton.hidden = false;
}

function showResult() {
    testArea.hidden = true;
    testResult.hidden = false;
    testProgress.style.width = "100%";

    resultText.textContent =
        `${questions.length} soruda ${score} doğru yaptın. ` +
        (score === questions.length
            ? "Harika, tüm soruları doğru cevapladın!"
            : "Yanlış yaptığın soruların açıklamalarını inceleyip tekrar deneyebilirsin.");
}

startTestButton.addEventListener("click", beginTest);

nextQuestionButton.addEventListener("click", function () {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
});

retryTestButton.addEventListener("click", beginTest);

document.getElementById("finishLesson").addEventListener("click", function () {
    window.location.href = "../../../index.html?return=subjects";
});