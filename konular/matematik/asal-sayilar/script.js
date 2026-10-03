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
                '29 yalnızca 1 ve 29’a bölündüğü için asal sayıdır.';

        } else {

            this.classList.add("wrong");

            result.innerHTML =
                '<span style="color:#ff6666;">✗ Yanlış.</span> ' +
                'Doğru cevap 29’dur.';

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
            "Aşağıdakilerden hangisi asal sayıdır?",

        answers: [
            "27",
            "31",
            "39",
            "49"
        ],

        correct: 1,

        explanation:
            "31 yalnızca 1 ve 31'e bölündüğü için asal sayıdır."
    },


    {
        question:
            "Aşağıdakilerden hangisi asal değildir?",

        answers: [
            "17",
            "19",
            "23",
            "25"
        ],

        correct: 3,

        explanation:
            "25 = 5 × 5 olduğundan asal değildir."
    },


    {
        question:
            "60 sayısının farklı asal çarpanlarının toplamı kaçtır?",

        answers: [
            "8",
            "10",
            "12",
            "15"
        ],

        correct: 1,

        explanation:
            "60 = 2² × 3 × 5. Farklı asal çarpanlar 2, 3 ve 5'tir. Toplamları 10'dur."
    },


    {
        question:
            "Aşağıdaki sayı çiftlerinden hangisi aralarında asaldır?",

        answers: [
            "12 ve 18",
            "14 ve 21",
            "8 ve 15",
            "16 ve 24"
        ],

        correct: 2,

        explanation:
            "8 ve 15'in 1 dışında ortak böleni yoktur."
    },


    {
        question:
            "Aşağıdakilerden hangisi 2 dışındaki asal sayılar için doğrudur?",

        answers: [
            "Çifttir.",
            "5'in katıdır.",
            "Tektir.",
            "3'ün katıdır."
        ],

        correct: 2,

        explanation:
            "2 dışındaki bütün asal sayılar tektir."
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
            "Mükemmel! Asal sayılar konusunu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç noktayı tekrar ederek konuyu pekiştirebilirsin.";

    } else {

        resultMessage.textContent =
            "Temel kuralları bir kez daha gözden geçirmen faydalı olacaktır.";

    }

}



/* =========================
   KONU BİTTİ
========================= */

function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";

}