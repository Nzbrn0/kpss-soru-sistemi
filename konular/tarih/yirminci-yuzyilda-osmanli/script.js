const sections = document.querySelectorAll(".lesson-section");

let openedSections = 0;

const totalSections = 8;

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
            "Trablusgarp Savaşı hangi devletle yapılmıştır?",

        answers: [
            "İngiltere",
            "İtalya",
            "Fransa",
            "Rusya"
        ],

        correct: 1,

        explanation:
            "Trablusgarp Savaşı 1911-1912 yıllarında Osmanlı Devleti ile İtalya arasında gerçekleşmiştir."
    },


    {
        question:
            "Osmanlı Devleti'nin I. Dünya Savaşı'nda önemli bir savunma başarısı gösterdiği cephe hangisidir?",

        answers: [
            "Kanal",
            "Irak",
            "Çanakkale",
            "Kafkas"
        ],

        correct: 2,

        explanation:
            "Çanakkale Cephesi'nde Osmanlı kuvvetleri İtilaf Devletlerinin saldırılarını durdurmuştur."
    },


    {
        question:
            "Mondros Ateşkes Antlaşması hangi tarihte imzalanmıştır?",

        answers: [
            "30 Ekim 1918",
            "15 Mayıs 1919",
            "10 Ağustos 1920",
            "29 Ekim 1918"
        ],

        correct: 0,

        explanation:
            "Mondros Ateşkes Antlaşması 30 Ekim 1918 tarihinde imzalanmıştır."
    },


    {
        question:
            "Mondros Ateşkes Antlaşması'nın işgallere dayanak olarak kullanılan maddesi hangisidir?",

        answers: [
            "1. madde",
            "7. madde",
            "24. madde",
            "36. madde"
        ],

        correct: 1,

        explanation:
            "Mondros'un 7. maddesi İtilaf Devletlerine güvenliklerini tehdit eden stratejik noktaları işgal etme imkânı verdi."
    },


    {
        question:
            "Osmanlı Devleti'nin I. Dünya Savaşı sonrasında imzaladığı ancak uygulanamayan antlaşma hangisidir?",

        answers: [
            "Mondros",
            "Uşi",
            "Sevr",
            "Brest-Litovsk"
        ],

        correct: 2,

        explanation:
            "Sevr Antlaşması 10 Ağustos 1920'de imzalanmış ancak uygulanamamıştır."
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
            "Mükemmel! Konunun temel noktalarını iyi biliyorsun.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Kronolojiyi bir kez daha tekrar ederek konuyu pekiştirebilirsin.";

    } else {

        resultMessage.textContent =
            "Özellikle savaşlar, tarihler ve antlaşmaları tekrar etmen faydalı olacaktır.";

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