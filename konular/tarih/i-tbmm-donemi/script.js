const sections = document.querySelectorAll(".lesson-section");

let openedSections = 0;
const totalSections = 8;

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");


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


function updateProgress() {

    const percentage =
        (openedSections / totalSections) * 100;

    progressFill.style.width =
        percentage + "%";

    progressText.textContent =
        openedSections + " / " + totalSections;
}


function miniAnswer(button, correct) {

    const question =
        button.closest(".mini-question");

    const buttons =
        question.querySelectorAll(".answer-button");

    const result =
        question.querySelector(".mini-result");

    buttons.forEach(btn => {
        btn.disabled = true;
    });


    if (correct) {

        button.classList.add("correct");

        result.textContent =
            "✓ Doğru!";

        result.style.color =
            "#00dc78";

    } else {

        button.classList.add("wrong");

        result.textContent =
            "✗ Yanlış! Doğru cevap diğer seçenektir.";

        result.style.color =
            "#ff5060";

        buttons.forEach(btn => {

            if (btn !== button) {
                btn.classList.add("correct");
            }

        });
    }
}


/* TEST */

const questions = [

    {
        question:
            "TBMM hangi tarihte açılmıştır?",

        answers: [
            "19 Mayıs 1919",
            "23 Nisan 1920",
            "29 Ekim 1923",
            "3 Aralık 1920"
        ],

        correct: 1,

        explanation:
            "TBMM 23 Nisan 1920'de Ankara'da açılmıştır."
    },

    {
        question:
            "I. TBMM döneminde uygulanan hükümet sistemi hangisidir?",

        answers: [
            "Parlamenter sistem",
            "Başkanlık sistemi",
            "Meclis hükümeti sistemi",
            "Kabine sistemi"
        ],

        correct: 2,

        explanation:
            "I. TBMM döneminde meclis hükümeti sistemi uygulanmıştır."
    },

    {
        question:
            "TBMM'nin ilk uluslararası antlaşması hangisidir?",

        answers: [
            "Lozan",
            "Moskova",
            "Gümrü",
            "Ankara"
        ],

        correct: 2,

        explanation:
            "Gümrü Antlaşması, TBMM'nin imzaladığı ilk uluslararası antlaşmadır."
    },

    {
        question:
            "Hıyanet-i Vataniye Kanunu hangi tarihte çıkarılmıştır?",

        answers: [
            "23 Nisan 1920",
            "29 Nisan 1920",
            "11 Eylül 1920",
            "3 Aralık 1920"
        ],

        correct: 1,

        explanation:
            "Hıyanet-i Vataniye Kanunu 29 Nisan 1920'de çıkarılmıştır."
    },

    {
        question:
            "Aşağıdakilerden hangisi I. TBMM'nin özelliklerinden biridir?",

        answers: [
            "Kuvvetler ayrılığı",
            "Meclis hükümeti sistemi",
            "Çift meclis sistemi",
            "Saltanatın kaldırılması"
        ],

        correct: 1,

        explanation:
            "I. TBMM döneminde meclis hükümeti sistemi ve kuvvetler birliği anlayışı uygulanmıştır."
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;


function startTest() {

    currentQuestion = 0;
    score = 0;

    document.getElementById("testStart").style.display =
        "none";

    document.getElementById("testArea").style.display =
        "block";

    document.getElementById("testResult").style.display =
        "none";

    loadQuestion();
}


function loadQuestion() {

    answered = false;

    const question =
        questions[currentQuestion];

    document.getElementById("questionNumber")
        .textContent =
        "SORU " +
        (currentQuestion + 1) +
        " / " +
        questions.length;

    document.getElementById("questionText")
        .textContent =
        question.question;

    const container =
        document.getElementById("answerContainer");

    container.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className =
            "test-answer";

        button.textContent =
            answer;

        button.onclick = function () {

            selectAnswer(index, button);

        };

        container.appendChild(button);
    });


    const feedback =
        document.getElementById("answerFeedback");

    feedback.style.display =
        "none";

    feedback.textContent =
        "";

    document.getElementById("nextButton")
        .style.display =
        "none";
}


function selectAnswer(index, button) {

    if (answered) {
        return;
    }

    answered = true;

    const question =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".test-answer");

    buttons.forEach(btn => {
        btn.disabled = true;
    });


    if (index === question.correct) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

        buttons[question.correct]
            .classList.add("correct");
    }


    const feedback =
        document.getElementById("answerFeedback");

    feedback.style.display =
        "block";

    feedback.textContent =
        question.explanation;


    document.getElementById("nextButton")
        .style.display =
        "inline-block";
}


function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        finishTest();
    }
}


function finishTest() {

    document.getElementById("testArea")
        .style.display =
        "none";

    document.getElementById("testResult")
        .style.display =
        "block";

    document.getElementById("scoreText")
        .textContent =
        score + " / " + questions.length;


    const resultMessage =
        document.getElementById("resultMessage");


    if (score === 5) {

        resultMessage.textContent =
            "🔥 Mükemmel! I. TBMM konusunu çok iyi kavramışsın.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "✓ Gayet iyi. Birkaç noktayı tekrar edersen konu daha sağlam olur.";

    } else {

        resultMessage.textContent =
            "📚 I. TBMM'nin temel özelliklerini ve tarihlerini tekrar etmen faydalı olur.";
    }
}


function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";
}