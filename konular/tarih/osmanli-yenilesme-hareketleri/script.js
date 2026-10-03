const sections = document.querySelectorAll(".lesson-section");

let openedSections = 0;

const totalSections = 9;

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");


/* =========================
   AKORDEON
========================= */

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


function updateProgress() {

    const percentage =
        (openedSections / totalSections) * 100;

    progressFill.style.width =
        percentage + "%";

    progressText.textContent =
        openedSections + " / " + totalSections;
}


/* =========================
   MİNİ SORULAR
========================= */

const answerButtons =
    document.querySelectorAll(".answer-button");


answerButtons.forEach(button => {

    button.addEventListener("click", function () {

        const question =
            button.closest(".mini-question");

        const buttons =
            question.querySelectorAll(".answer-button");

        const result =
            question.querySelector(".mini-result");


        buttons.forEach(btn => {

            btn.disabled = true;

        });


        if (button.dataset.correct === "true") {

            button.classList.add("correct");

            result.textContent =
                "✓ Doğru cevap!";

            result.style.color =
                "#00d084";

        } else {

            button.classList.add("wrong");

            result.textContent =
                "✗ Yanlış cevap!";

            result.style.color =
                "#ff4d5a";


            buttons.forEach(btn => {

                if (btn.dataset.correct === "true") {

                    btn.classList.add("correct");

                }

            });

        }

    });

});


/* =========================
   TEST
========================= */

const questions = [

    {
        question:
            "Nizam-ı Cedid ordusu hangi padişah döneminde kurulmuştur?",

        answers: [
            "III. Mustafa",
            "III. Selim",
            "II. Mahmut",
            "I. Mahmut"
        ],

        correct: 1,

        explanation:
            "Nizam-ı Cedid, III. Selim döneminde Avrupa tarzında oluşturulan yeni ordudur."
    },


    {
        question:
            "Yeniçeri Ocağı hangi padişah döneminde kaldırılmıştır?",

        answers: [
            "III. Selim",
            "II. Mahmut",
            "Abdülmecid",
            "III. Ahmed"
        ],

        correct: 1,

        explanation:
            "Yeniçeri Ocağı 1826 yılında II. Mahmut döneminde kaldırılmıştır."
    },


    {
        question:
            "Tanzimat Fermanı hangi yıl ilan edilmiştir?",

        answers: [
            "1826",
            "1839",
            "1856",
            "1876"
        ],

        correct: 1,

        explanation:
            "Tanzimat Fermanı 1839 yılında ilan edilmiştir."
    },


    {
        question:
            "Osmanlı Devleti'nin ilk anayasası aşağıdakilerden hangisidir?",

        answers: [
            "Islahat Fermanı",
            "Tanzimat Fermanı",
            "Kanun-ı Esasi",
            "Mecelle"
        ],

        correct: 2,

        explanation:
            "Kanun-ı Esasi 1876 yılında yürürlüğe giren Osmanlı Devleti'nin ilk anayasasıdır."
    },


    {
        question:
            "II. Meşrutiyet hangi yıl ilan edilmiştir?",

        answers: [
            "1876",
            "1897",
            "1908",
            "1912"
        ],

        correct: 2,

        explanation:
            "II. Meşrutiyet 1908 yılında ilan edilmiştir."
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


const startTest =
    document.getElementById("startTest");

const testStart =
    document.getElementById("testStart");

const testArea =
    document.getElementById("testArea");

const testResult =
    document.getElementById("testResult");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const testAnswers =
    document.getElementById("testAnswers");

const answerFeedback =
    document.getElementById("answerFeedback");

const nextQuestion =
    document.getElementById("nextQuestion");

const scoreText =
    document.getElementById("scoreText");

const resultMessage =
    document.getElementById("resultMessage");


startTest.addEventListener("click", function () {

    currentQuestion = 0;

    score = 0;

    testStart.style.display = "none";

    testArea.style.display = "block";

    testResult.style.display = "none";

    loadQuestion();

});


function loadQuestion() {

    answered = false;

    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        "Soru " +
        (currentQuestion + 1) +
        " / " +
        questions.length;


    questionText.textContent =
        question.question;


    testAnswers.innerHTML = "";

    answerFeedback.textContent = "";

    nextQuestion.style.display =
        "none";


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className =
            "test-answer";

        button.textContent =
            answer;


        button.addEventListener("click", function () {

            checkAnswer(index, button);

        });


        testAnswers.appendChild(button);

    });

}


function checkAnswer(selectedIndex, selectedButton) {

    if (answered) {
        return;
    }

    answered = true;


    const question =
        questions[currentQuestion];


    const buttons =
        testAnswers.querySelectorAll(".test-answer");


    buttons.forEach(button => {

        button.disabled = true;

    });


    if (selectedIndex === question.correct) {

        selectedButton.classList.add("correct");

        score++;

        answerFeedback.textContent =
            "✓ Doğru! " +
            question.explanation;

        answerFeedback.style.color =
            "#00d084";

    } else {

        selectedButton.classList.add("wrong");

        buttons[question.correct]
            .classList.add("correct");

        answerFeedback.textContent =
            "✗ Yanlış! " +
            question.explanation;

        answerFeedback.style.color =
            "#ff4d5a";

    }


    nextQuestion.style.display =
        "inline-block";

}


nextQuestion.addEventListener("click", function () {

    currentQuestion++;


    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        finishTest();

    }

});


function finishTest() {

    testArea.style.display =
        "none";

    testResult.style.display =
        "block";


    scoreText.textContent =
        score + " / " + questions.length;


    if (score === 5) {

        resultMessage.textContent =
            "Mükemmel! Yenileşme hareketlerinin temel noktalarını iyi biliyorsun.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç noktayı tekrar ederek konuyu pekiştirebilirsin.";

    } else {

        resultMessage.textContent =
            "Kronolojiyi ve önemli padişah-reform eşleşmelerini tekrar etmen faydalı olacaktır.";

    }

}


/* =========================
   KONU BİTTİ
========================= */

const finishButton =
    document.getElementById("finishButton");


finishButton.addEventListener("click", function () {

    window.location.href =
        "../../../index.html?return=subjects";

});