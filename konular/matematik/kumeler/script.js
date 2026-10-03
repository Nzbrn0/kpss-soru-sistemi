// ==========================================
// KÜMELER - KPSS
// ==========================================


// ==========================================
// AKORDİYON
// ==========================================

const sections = document.querySelectorAll(".lesson-section");

let openedSections = 0;

function updateProgress() {

    const totalSections = sections.length;

    const progress =
        Math.round((openedSections / totalSections) * 70);

    document.getElementById("progressFill").style.width =
        progress + "%";

    document.getElementById("progressText").textContent =
        progress + "%";
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


// ==========================================
// MİNİ SORULAR
// ==========================================

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


            if (button.dataset.correct === "true") {

                button.classList.add("correct");

                result.textContent =
                    "✓ Doğru cevap!";

                result.style.color =
                    "#00d66b";

            } else {

                button.classList.add("wrong");

                result.textContent =
                    "✗ Yanlış cevap!";

                result.style.color =
                    "#ff4040";


                buttons.forEach(btn => {

                    if (btn.dataset.correct === "true") {

                        btn.classList.add("correct");

                    }

                });

            }

        });

    });

});


// ==========================================
// TEST SORULARI
// ==========================================

const questions = [

    {
        question:
            "5 elemanlı bir kümenin kaç farklı alt kümesi vardır?",

        answers: [
            "10",
            "16",
            "25",
            "32"
        ],

        correct: 3,

        explanation:
            "n elemanlı bir kümenin alt küme sayısı 2ⁿ olduğundan 2⁵ = 32."
    },


    {
        question:
            "A = {1, 2, 3, 4} ve B = {3, 4, 5, 6} olduğuna göre A ∩ B nedir?",

        answers: [
            "{1, 2}",
            "{3, 4}",
            "{5, 6}",
            "{1, 2, 5, 6}"
        ],

        correct: 1,

        explanation:
            "Kesişim, iki kümede ortak bulunan elemanlardan oluşur. Ortak elemanlar 3 ve 4'tür."
    },


    {
        question:
            "A = {1, 2, 3} ve B = {3, 4, 5} olduğuna göre A ∪ B nedir?",

        answers: [
            "{1, 2}",
            "{3}",
            "{1, 2, 3, 4, 5}",
            "{4, 5}"
        ],

        correct: 2,

        explanation:
            "Birleşim, iki kümenin tüm elemanlarını içerir. Ortak eleman 3 yalnızca bir kez yazılır."
    },


    {
        question:
            "A = {1, 2, 3, 4} ve B = {3, 4, 5} ise A − B nedir?",

        answers: [
            "{1, 2}",
            "{3, 4}",
            "{5}",
            "{1, 2, 5}"
        ],

        correct: 0,

        explanation:
            "A'da olup B'de olmayan elemanlar 1 ve 2'dir."
    },


    {
        question:
            "Bir sınıfta 24 öğrenci matematik, 18 öğrenci Türkçe çalışmaktadır. Her iki dersi çalışan 7 öğrenci varsa en az birini çalışan kaç öğrenci vardır?",

        answers: [
            "35",
            "42",
            "49",
            "31"
        ],

        correct: 0,

        explanation:
            "Birleşim formülü kullanılır: 24 + 18 − 7 = 35."
    }

];


// ==========================================
// TEST DEĞİŞKENLERİ
// ==========================================

let currentQuestion = 0;

let score = 0;

let answered = false;


// ==========================================
// TEST ELEMENTLERİ
// ==========================================

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


// ==========================================
// TEST BAŞLAT
// ==========================================

startTest.addEventListener("click", function () {

    currentQuestion = 0;

    score = 0;

    testStart.style.display = "none";

    testResult.style.display = "none";

    testArea.style.display = "block";

    showQuestion();

});


// ==========================================
// SORUYU GÖSTER
// ==========================================

function showQuestion() {

    answered = false;

    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        currentQuestion + 1;


    questionText.textContent =
        question.question;


    answers.innerHTML = "";


    answerFeedback.textContent = "";

    answerFeedback.style.color = "";


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

            selectAnswer(
                button,
                index
            );

        });


        answers.appendChild(button);

    });

}


// ==========================================
// CEVAP SEÇ
// ==========================================

function selectAnswer(button, selectedIndex) {

    if (answered) {
        return;
    }

    answered = true;


    const question =
        questions[currentQuestion];


    const allButtons =
        answers.querySelectorAll(".test-answer");


    allButtons.forEach(btn => {

        btn.disabled = true;

    });


    if (selectedIndex === question.correct) {

        button.classList.add("correct");

        score++;

        answerFeedback.textContent =
            "✓ Doğru! " + question.explanation;

        answerFeedback.style.color =
            "#00d66b";

    } else {

        button.classList.add("wrong");


        allButtons[question.correct]
            .classList.add("correct");


        answerFeedback.textContent =
            "✗ Yanlış. " + question.explanation;

        answerFeedback.style.color =
            "#ff4040";

    }


    nextQuestion.style.display =
        "inline-block";

}


// ==========================================
// SONRAKİ SORU
// ==========================================

nextQuestion.addEventListener("click", function () {

    currentQuestion++;


    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        finishTest();

    }

});


// ==========================================
// TESTİ BİTİR
// ==========================================

function finishTest() {

    testArea.style.display =
        "none";

    testResult.style.display =
        "block";


    scoreElement.textContent =
        score + " / " + questions.length;


    if (score === 5) {

        resultMessage.textContent =
            "Mükemmel! Kümeler konusunu çok iyi kavramışsın.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç noktayı tekrar ederek konuyu pekiştirebilirsin.";

    } else {

        resultMessage.textContent =
            "Konu anlatımındaki temel kuralları tekrar etmen faydalı olacaktır.";

    }

}


// ==========================================
// TESTİ TEKRARLA
// ==========================================

restartTest.addEventListener("click", function () {

    currentQuestion = 0;

    score = 0;

    testResult.style.display =
        "none";

    testArea.style.display =
        "block";

    showQuestion();

});


// ==========================================
// KONU BİTTİ
// ==========================================

document
    .getElementById("finishLesson")
    .addEventListener("click", function () {

        window.location.href =
            "../../../index.html?return=subjects";

    });


// ==========================================
// TEST ALANINI GÖSTER
// ==========================================

// Konu bölümleri açıldıkça test bölümü
// otomatik olarak görünür hale gelir.

testStart.style.display = "block";