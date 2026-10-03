const sections = document.querySelectorAll(".lesson-section");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

let openedSections = 0;
const totalSections = sections.length;

function updateProgress() {

    const progress = Math.round(
        (openedSections / totalSections) * 70
    );

    progressFill.style.width = progress + "%";
    progressText.textContent = "%" + progress;
}


// ACCORDION

sections.forEach(section => {

    const header =
        section.querySelector(".section-header");

    const content =
        section.querySelector(".section-content");

    const arrow =
        section.querySelector(".section-arrow");

    header.addEventListener("click", function () {

        const isOpen =
            content.classList.contains("open");

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


// MINI QUESTIONS

const miniQuestions =
    document.querySelectorAll(".mini-question");

miniQuestions.forEach(question => {

    const buttons =
        question.querySelectorAll(".answer-button");

    const result =
        question.querySelector(".mini-result");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            buttons.forEach(btn => {
                btn.disabled = true;
            });

            const correct =
                button.dataset.correct === "true";

            if (correct) {

                button.classList.add("correct");

                result.textContent =
                    "✓ Doğru cevap!";

                result.style.color =
                    "#00ff8c";

            } else {

                button.classList.add("wrong");

                result.textContent =
                    "✗ Yanlış cevap!";

                result.style.color =
                    "#ff5555";

                buttons.forEach(btn => {

                    if (btn.dataset.correct === "true") {
                        btn.classList.add("correct");
                    }

                });

            }

        });

    });

});


// TEST

const questions = [

    {
        question:
            "Bir üçgenin iki açısı 50° ve 60° ise üçüncü açısı kaç derecedir?",

        answers: [
            "60°",
            "70°",
            "80°",
            "90°"
        ],

        correct: 1,

        explanation:
            "Üçgenin iç açıları toplamı 180° olduğundan 180 − 50 − 60 = 70°."
    },

    {
        question:
            "Dik kenarları 5 cm ve 12 cm olan dik üçgenin hipotenüsü kaç cm'dir?",

        answers: [
            "11",
            "12",
            "13",
            "14"
        ],

        correct: 2,

        explanation:
            "Pisagor'a göre 5² + 12² = 25 + 144 = 169. √169 = 13."
    },

    {
        question:
            "Tabanı 12 cm, yüksekliği 5 cm olan üçgenin alanı kaç cm²'dir?",

        answers: [
            "20",
            "30",
            "40",
            "60"
        ],

        correct: 1,

        explanation:
            "Alan = (Taban × Yükseklik) / 2 = (12 × 5) / 2 = 30 cm²."
    },

    {
        question:
            "Yarıçapı 3 cm olan dairenin alanı kaç cm²'dir?",

        answers: [
            "3π",
            "6π",
            "9π",
            "12π"
        ],

        correct: 2,

        explanation:
            "Dairenin alanı πr² olduğundan π × 3² = 9π."
    },

    {
        question:
            "Bir beşgenin iç açıları toplamı kaç derecedir?",

        answers: [
            "360°",
            "540°",
            "720°",
            "900°"
        ],

        correct: 1,

        explanation:
            "İç açılar toplamı (n − 2) × 180° formülüyle bulunur. (5 − 2) × 180 = 540°."
    }

];


let currentQuestion = 0;
let score = 0;

const testStart =
    document.getElementById("testStart");

const testArea =
    document.getElementById("testArea");

const testResult =
    document.getElementById("testResult");

const startTest =
    document.getElementById("startTest");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const answers =
    document.getElementById("answers");

const answerFeedback =
    document.getElementById("answerFeedback");

const nextQuestion =
    document.getElementById("nextQuestion");

const scoreElement =
    document.getElementById("score");

const resultMessage =
    document.getElementById("resultMessage");

const restartTest =
    document.getElementById("restartTest");


function loadQuestion() {

    const question =
        questions[currentQuestion];

    questionNumber.textContent =
        `Soru ${currentQuestion + 1} / ${questions.length}`;

    questionText.textContent =
        question.question;

    answers.innerHTML = "";

    answerFeedback.textContent = "";

    nextQuestion.style.display = "none";


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className =
            "answer-button";

        button.textContent =
            answer;

        button.addEventListener("click", function () {

            selectAnswer(index);

        });

        answers.appendChild(button);

    });

}


function selectAnswer(selectedIndex) {

    const question =
        questions[currentQuestion];

    const buttons =
        answers.querySelectorAll(".answer-button");

    buttons.forEach(button => {
        button.disabled = true;
    });


    if (selectedIndex === question.correct) {

        buttons[selectedIndex]
            .classList.add("correct");

        score++;

        answerFeedback.innerHTML =
            `✓ Doğru!<br>${question.explanation}`;

        answerFeedback.style.color =
            "#00ff8c";

    } else {

        buttons[selectedIndex]
            .classList.add("wrong");

        buttons[question.correct]
            .classList.add("correct");

        answerFeedback.innerHTML =
            `✗ Yanlış!<br>${question.explanation}`;

        answerFeedback.style.color =
            "#ff5555";

    }


    nextQuestion.style.display =
        "inline-block";

}


function showResult() {

    testArea.style.display = "none";

    testResult.style.display = "block";

    scoreElement.textContent =
        `${score} / ${questions.length}`;


    if (score === 5) {

        resultMessage.textContent =
            "Mükemmel! Geometri konusunu çok iyi kavramışsın.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç noktayı tekrar ederek konuyu pekiştirebilirsin.";

    } else {

        resultMessage.textContent =
            "Geometri formüllerini ve temel kuralları tekrar etmen faydalı olacaktır.";

    }

}


startTest.addEventListener("click", function () {

    currentQuestion = 0;
    score = 0;

    testStart.style.display = "none";

    testArea.style.display = "block";

    testResult.style.display = "none";

    loadQuestion();

});


nextQuestion.addEventListener("click", function () {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

});


restartTest.addEventListener("click", function () {

    currentQuestion = 0;
    score = 0;

    testResult.style.display = "none";

    testArea.style.display = "block";

    loadQuestion();

});


// KONU BİTTİ

const finishButton =
    document.getElementById("finishButton");

finishButton.addEventListener("click", function () {

    window.location.href =
        "../../../index.html?return=subjects";

});