const sections =
    document.querySelectorAll(".lesson-section");

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");

let openedSections = 0;

const totalSections =
    sections.length;


function updateProgress() {

    const percentage =
        Math.round(
            (openedSections / totalSections) * 100
        );

    progressFill.style.width =
        percentage + "%";

    progressText.textContent =
        "%" + percentage;
}


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


/* =========================
   MİNİ SORU
========================= */

const miniButtons =
    document.querySelectorAll(".answer-button");


miniButtons.forEach(button => {

    button.addEventListener("click", function () {

        miniButtons.forEach(btn => {
            btn.disabled = true;
        });


        const correct =
            this.dataset.correct === "true";


        const result =
            this
                .closest(".mini-question")
                .querySelector(".mini-result");


        if (correct) {

            this.classList.add("correct");

            result.innerHTML =
                '<span style="color:#00ff78;">✓ Doğru!</span> ' +
                '1/2 + 1/4 işleminin sonucu 3/4’tür.';

        } else {

            this.classList.add("wrong");

            result.innerHTML =
                '<span style="color:#ff6666;">✗ Yanlış.</span> ' +
                'Önce ortak payda bulunur. ' +
                '1/2 = 2/4 olduğundan 2/4 + 1/4 = 3/4 olur.';

            const correctButton =
                document.querySelector(
                    '.answer-button[data-correct="true"]'
                );

            correctButton.classList.add("correct");

        }

    });

});


/* =========================
   TEST
========================= */

const questions = [

    {
        question:
            "Aşağıdakilerden hangisi rasyonel sayıdır?",

        answers: [
            "√2",
            "π",
            "3/5",
            "√3"
        ],

        correct: 2,

        explanation:
            "3/5 iki tam sayının oranı şeklinde yazılabildiği için rasyonel sayıdır."
    },


    {
        question:
            "1/2 + 1/3 işleminin sonucu kaçtır?",

        answers: [
            "2/5",
            "5/6",
            "1/6",
            "3/5"
        ],

        correct: 1,

        explanation:
            "Ortak payda 6 alınır. 1/2 = 3/6 ve 1/3 = 2/6 olduğundan sonuç 5/6'dır."
    },


    {
        question:
            "2/3 × 3/4 işleminin sonucu kaçtır?",

        answers: [
            "1/2",
            "2/7",
            "3/8",
            "5/12"
        ],

        correct: 0,

        explanation:
            "2/3 × 3/4 = 6/12 = 1/2."
    },


    {
        question:
            "2/5 ÷ 4/3 işleminin sonucu kaçtır?",

        answers: [
            "8/15",
            "3/10",
            "5/12",
            "6/5"
        ],

        correct: 1,

        explanation:
            "Bölen kesir ters çevrilir: 2/5 × 3/4 = 6/20 = 3/10."
    },


    {
        question:
            "Aşağıdakilerden hangisi doğrudur?",

        answers: [
            "5/8 > 7/8",
            "-2/5 < -3/5",
            "3/4 > 2/3",
            "1/2 > 3/4"
        ],

        correct: 2,

        explanation:
            "3/4 = 9/12 ve 2/3 = 8/12 olduğundan 3/4 > 2/3'tür."
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;


const startTest =
    document.getElementById("startTest");

const testStart =
    document.getElementById("testStart");

const testContent =
    document.getElementById("testContent");

const testResult =
    document.getElementById("testResult");

const questionText =
    document.getElementById("questionText");

const questionAnswers =
    document.getElementById("questionAnswers");

const answerFeedback =
    document.getElementById("answerFeedback");

const nextQuestion =
    document.getElementById("nextQuestion");

const questionNumber =
    document.getElementById("questionNumber");

const scoreText =
    document.getElementById("score");

const finalScore =
    document.getElementById("finalScore");

const resultMessage =
    document.getElementById("resultMessage");


startTest.addEventListener("click", function () {

    testStart.style.display = "none";

    testContent.style.display = "block";

    currentQuestion = 0;

    score = 0;

    loadQuestion();

});


function loadQuestion() {

    answered = false;

    answerFeedback.textContent = "";

    nextQuestion.style.display = "none";


    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        `Soru ${currentQuestion + 1} / ${questions.length}`;


    scoreText.textContent =
        `Puan: ${score}`;


    questionText.textContent =
        question.question;


    questionAnswers.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className =
            "answer-option";

        button.textContent =
            answer;


        button.addEventListener(
            "click",
            function () {

                if (answered) {
                    return;
                }

                answered = true;

                checkAnswer(
                    index,
                    button
                );

            }
        );


        questionAnswers.appendChild(button);

    });

}


function checkAnswer(index, selectedButton) {

    const question =
        questions[currentQuestion];


    const buttons =
        document.querySelectorAll(".answer-option");


    buttons.forEach(button => {
        button.disabled = true;
    });


    if (index === question.correct) {

        selectedButton.classList.add("correct");

        score++;

        answerFeedback.innerHTML =
            `<span style="color:#00ff78;">
                ✓ Doğru cevap!
            </span>
            <br>
            ${question.explanation}`;

    } else {

        selectedButton.classList.add("wrong");

        buttons[question.correct]
            .classList.add("correct");

        answerFeedback.innerHTML =
            `<span style="color:#ff6666;">
                ✗ Yanlış cevap.
            </span>
            <br>
            ${question.explanation}`;

    }


    scoreText.textContent =
        `Puan: ${score}`;


    nextQuestion.style.display =
        "inline-block";


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextQuestion.textContent =
            "TESTİ BİTİR →";

    }

}


nextQuestion.addEventListener(
    "click",
    function () {

        currentQuestion++;


        if (
            currentQuestion >=
            questions.length
        ) {

            finishTest();

        } else {

            loadQuestion();

        }

    }
);


function finishTest() {

    testContent.style.display =
        "none";

    testResult.style.display =
        "block";


    finalScore.textContent =
        `${score} / ${questions.length}`;


    if (score === 5) {

        resultMessage.textContent =
            "Mükemmel! Rasyonel sayılar konusunu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç noktayı tekrar ederek konuyu pekiştirebilirsin.";

    } else {

        resultMessage.textContent =
            "Temel kuralları bir kez daha gözden geçirmen faydalı olacaktır.";

    }

}


function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";

}