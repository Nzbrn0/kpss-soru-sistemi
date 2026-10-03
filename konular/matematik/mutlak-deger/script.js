
const sections = document.querySelectorAll(".lesson-section");

let openedSections = 0;

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

function updateProgress() {
    const percent = Math.round(
        (openedSections / sections.length) * 100
    );

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

            const isCorrect = button.dataset.correct === "true";

            if (isCorrect) {
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
        question: "|−9| kaçtır?",
        answers: ["−9", "0", "9", "18"],
        correct: 2,
        explanation: "Mutlak değer uzaklığı gösterir. |−9| = 9."
    },
    {
        question: "|x| = 5 denkleminin çözüm kümesi hangisidir?",
        answers: ["{5}", "{−5}", "{−5, 5}", "{0, 5}"],
        correct: 2,
        explanation: "x, 5 veya −5 olabilir."
    },
    {
        question: "|x| < 4 eşitsizliğinin çözümü hangisidir?",
        answers: [
            "x < −4 veya x > 4",
            "−4 < x < 4",
            "−4 ≤ x ≤ 4",
            "x > 4"
        ],
        correct: 1,
        explanation: "Mutlak değer 4'ten küçükse x, −4 ile 4 arasında olmalıdır."
    },
    {
        question: "|x − 3| = 4 ise x'in alabileceği değerler hangileridir?",
        answers: [
            "−1 ve 7",
            "1 ve 7",
            "−4 ve 4",
            "3 ve 4"
        ],
        correct: 0,
        explanation: "x − 3 = 4 ise x = 7; x − 3 = −4 ise x = −1."
    },
    {
        question: "|x| = −2 denkleminin gerçek sayılarda kaç çözümü vardır?",
        answers: ["1", "2", "Sonsuz", "0"],
        correct: 3,
        explanation: "Mutlak değer negatif olamayacağı için gerçek sayılarda çözüm yoktur."
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
    answered = false;

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
        answerFeedback.textContent =
            `Doğru cevap! ${question.explanation}`;
        answerFeedback.classList.add("correct-text");
    } else {
        buttons[selectedIndex].classList.add("wrong");
        buttons[question.correct].classList.add("correct");

        answerFeedback.textContent =
            `Yanlış cevap. ${question.explanation}`;
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

// Konuyu bitir ve ana ders seçimine dön
document.getElementById("finishLesson").addEventListener("click", function () {
    window.location.href = "../../../index.html?return=subjects";
});