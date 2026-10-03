const sections = document.querySelectorAll(".lesson-section");

let openedSections = 0;

const totalSections = 8;

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");


function updateProgress() {

    const percentage =
        (openedSections / totalSections) * 100;

    progressFill.style.width =
        percentage + "%";

    progressText.textContent =
        openedSections + " / " + totalSections;
}


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
   TEST SORULARI
========================= */

const questions = [

    {
        question:
            "Osmanlı Devleti'nde devlet adamı yetiştirilmesinde önemli rol oynayan kurum hangisidir?",

        answers: [
            "Lonca",
            "Enderun",
            "Tımar",
            "Divan"
        ],

        correct: 1,

        explanation:
            "Enderun, saray içerisinde devlet yönetiminde görev alacak kişilerin yetiştirilmesinde önemli bir kurumdu."
    },


    {
        question:
            "Osmanlı Devleti'nde mali işlerden sorumlu görevli aşağıdakilerden hangisidir?",

        answers: [
            "Nişancı",
            "Kazasker",
            "Defterdar",
            "Şeyhülislam"
        ],

        correct: 2,

        explanation:
            "Defterdar, Osmanlı maliyesinin başlıca sorumlusuydu."
    },


    {
        question:
            "Osmanlı şehirlerinde esnaf ve zanaatkârların oluşturduğu teşkilat hangisidir?",

        answers: [
            "Enderun",
            "Lonca",
            "Divan-ı Hümayun",
            "Medrese"
        ],

        correct: 1,

        explanation:
            "Lonca teşkilatı aynı meslek grubunda bulunan esnaf ve zanaatkârların örgütlenmesini sağlıyordu."
    },


    {
        question:
            "Osmanlı'da İslam hukuku temelli hukuk sistemine ne ad verilir?",

        answers: [
            "Örfi hukuk",
            "Şer'i hukuk",
            "Lonca hukuku",
            "Tımar hukuku"
        ],

        correct: 1,

        explanation:
            "İslam hukukuna dayanan kurallar Osmanlı'da şer'i hukuk olarak adlandırılır."
    },


    {
        question:
            "Aşağıdakilerden hangisi Osmanlı klasik dönem mimarisinin önemli temsilcilerinden biridir?",

        answers: [
            "Mimar Sinan",
            "Evliya Çelebi",
            "Katip Çelebi",
            "Piri Reis"
        ],

        correct: 0,

        explanation:
            "Mimar Sinan Osmanlı klasik dönem mimarisinin en önemli mimarlarından biridir."
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


/* =========================
   TESTİ BAŞLAT
========================= */

startTest.addEventListener("click", function () {

    currentQuestion = 0;

    score = 0;

    testStart.style.display = "none";

    testArea.style.display = "block";

    testResult.style.display = "none";

    loadQuestion();

});


/* =========================
   SORU YÜKLE
========================= */

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


/* =========================
   CEVABI KONTROL ET
========================= */

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


/* =========================
   SONRAKİ SORU
========================= */

nextQuestion.addEventListener("click", function () {

    currentQuestion++;


    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        finishTest();

    }

});


/* =========================
   TEST SONUCU
========================= */

function finishTest() {

    testArea.style.display =
        "none";

    testResult.style.display =
        "block";


    scoreText.textContent =
        score + " / " + questions.length;


    if (score === 5) {

        resultMessage.textContent =
            "Mükemmel! Konunun temel noktalarına oldukça hakimsin.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç noktayı daha tekrar edersen konu daha da pekişir.";

    } else {

        resultMessage.textContent =
            "Temel noktaları bir kez daha gözden geçirmen faydalı olacaktır.";

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