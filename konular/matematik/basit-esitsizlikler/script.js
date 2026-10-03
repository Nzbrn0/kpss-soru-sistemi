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
                '2x - 4 > 6 işleminde önce 4 eklenir: 2x > 10. ' +
                'Sonra 2’ye bölünür ve x > 5 bulunur.';

        } else {

            this.classList.add("wrong");

            result.innerHTML =
                '<span style="color:#ff6666;">✗ Yanlış.</span> ' +
                '2x - 4 > 6 → 2x > 10 → x > 5.';

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
            "x + 4 > 9 eşitsizliğinin çözümü nedir?",

        answers: [
            "x > 5",
            "x < 5",
            "x ≥ 5",
            "x ≤ 5"
        ],

        correct: 0,

        explanation:
            "Her iki taraftan 4 çıkarılır: x > 5."
    },


    {
        question:
            "-2x > 8 eşitsizliğinin çözümü nedir?",

        answers: [
            "x > -4",
            "x < -4",
            "x > 4",
            "x < 4"
        ],

        correct: 1,

        explanation:
            "Her iki taraf -2'ye bölündüğü için eşitsizlik yön değişir: x < -4."
    },


    {
        question:
            "3 < x ≤ 7 ve x tam sayı ise kaç farklı x değeri vardır?",

        answers: [
            "3",
            "4",
            "5",
            "6"
        ],

        correct: 1,

        explanation:
            "x = 4, 5, 6, 7 olabilir. Toplam 4 tam sayı vardır."
    },


    {
        question:
            "Aşağıdakilerden hangisi doğrudur?",

        answers: [
            "x > 3 ise x = 3 olabilir.",
            "x < 5 ise x = 5 olabilir.",
            "x ≥ 4 ise x = 4 olabilir.",
            "x ≤ 2 ise x = 3 olabilir."
        ],

        correct: 2,

        explanation:
            "≥ işareti sınır değeri kapsar. Bu nedenle x ≥ 4 için x = 4 mümkündür."
    },


    {
        question:
            "-3x + 6 ≤ 15 eşitsizliğinin çözümü nedir?",

        answers: [
            "x ≤ -3",
            "x ≥ -3",
            "x ≤ 3",
            "x ≥ 3"
        ],

        correct: 1,

        explanation:
            "-3x ≤ 9 olur. -3'e bölündüğünde yön değişir ve x ≥ -3 bulunur."
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
            "Mükemmel! Basit eşitsizlikler konusunu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç noktayı tekrar ederek konuyu pekiştirebilirsin.";

    } else {

        resultMessage.textContent =
            "Temel eşitsizlik kurallarını bir kez daha gözden geçirmen faydalı olacaktır.";

    }

}


function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";

}