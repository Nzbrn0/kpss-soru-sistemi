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
        Math.round((openedSections / totalSections) * 100);

    progressFill.style.width = percentage + "%";

    progressText.textContent =
        "%" + percentage;
}


/* =========================
   MINI SORULAR
========================= */

function checkMini(button, correct) {

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
            "#00d084";

    } else {

        button.classList.add("wrong");

        result.textContent =
            "✗ Yanlış! Doğru cevabı tekrar incele.";

        result.style.color =
            "#ff4d4d";


        buttons.forEach(btn => {

            if (
                btn.getAttribute("onclick") &&
                btn.getAttribute("onclick").includes("true")
            ) {
                btn.classList.add("correct");
            }

        });

    }

}


/* =========================
   TEST
========================= */

const questions = [

    {
        question:
            "Millet egemenliğini esas alan Atatürk ilkesi hangisidir?",

        answers: [
            "Cumhuriyetçilik",
            "Devletçilik",
            "Laiklik",
            "İnkılapçılık"
        ],

        correct: 0,

        explanation:
            "Cumhuriyetçilik, egemenliğin millete ait olmasını ve milli iradeyi esas alır."
    },


    {
        question:
            "Türk Dil Kurumunun ve Türk Tarih Kurumunun kurulması en çok hangi ilkeyle ilişkilidir?",

        answers: [
            "Halkçılık",
            "Milliyetçilik",
            "Devletçilik",
            "Laiklik"
        ],

        correct: 1,

        explanation:
            "TDK ve TTK, milli kültürün araştırılması ve geliştirilmesi yönüyle milliyetçilikle ilişkilidir."
    },


    {
        question:
            "Ekonomik kalkınmada devletin aktif rol üstlenmesi hangi ilkeyle ilgilidir?",

        answers: [
            "Cumhuriyetçilik",
            "Halkçılık",
            "Devletçilik",
            "Laiklik"
        ],

        correct: 2,

        explanation:
            "Devletçilik, ekonomik kalkınmada devletin aktif rol üstlenmesini ifade eder."
    },


    {
        question:
            "Halifeliğin kaldırılması en doğrudan hangi ilkeyle ilişkilidir?",

        answers: [
            "Milliyetçilik",
            "Laiklik",
            "Halkçılık",
            "Devletçilik"
        ],

        correct: 1,

        explanation:
            "Halifeliğin kaldırılması, din ve devlet işlerinin ayrılması yönüyle laiklikle ilişkilidir."
    },


    {
        question:
            "Harf İnkılabı aşağıdaki ilkelerden hangisiyle doğrudan ilişkilendirilebilir?",

        answers: [
            "İnkılapçılık",
            "Devletçilik",
            "Cumhuriyetçilik",
            "Halkçılık"
        ],

        correct: 0,

        explanation:
            "Harf İnkılabı, yenilik ve çağdaşlaşma yönüyle inkılapçılık ilkesiyle ilişkilidir."
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


function startTest() {

    currentQuestion = 0;

    score = 0;

    answered = false;

    document.getElementById("testStart")
        .style.display = "none";

    document.getElementById("testResult")
        .style.display = "none";

    document.getElementById("testArea")
        .style.display = "block";

    loadQuestion();
}


function loadQuestion() {

    const question =
        questions[currentQuestion];

    document.getElementById("questionNumber")
        .textContent =
        `Soru ${currentQuestion + 1} / ${questions.length}`;

    document.getElementById("questionText")
        .textContent =
        question.question;


    const answers =
        document.getElementById("answers");

    answers.innerHTML = "";


    document.getElementById("answerFeedback")
        .textContent = "";


    document.getElementById("nextButton")
        .style.display = "none";


    answered = false;


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className =
            "test-answer";

        button.textContent =
            answer;


        button.onclick = function () {

            selectAnswer(
                index,
                button
            );

        };


        answers.appendChild(button);

    });

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

        score++;

        button.classList.add("correct");

        document.getElementById("answerFeedback")
            .innerHTML =
            `✓ Doğru! ${question.explanation}`;

    } else {

        button.classList.add("wrong");

        buttons[question.correct]
            .classList.add("correct");

        document.getElementById("answerFeedback")
            .innerHTML =
            `✗ Yanlış. ${question.explanation}`;

    }


    const nextButton =
        document.getElementById("nextButton");

    nextButton.style.display =
        "inline-block";


    if (currentQuestion === questions.length - 1) {

        nextButton.textContent =
            "Testi Bitir →";

    } else {

        nextButton.textContent =
            "Sonraki Soru →";
    }

}


function nextQuestion() {

    if (!answered) {
        return;
    }

    currentQuestion++;


    if (currentQuestion >= questions.length) {

        finishTest();

        return;
    }


    loadQuestion();
}


function finishTest() {

    document.getElementById("testArea")
        .style.display = "none";

    document.getElementById("testResult")
        .style.display = "block";


    document.getElementById("scoreText")
        .textContent =
        `${score} / ${questions.length}`;


    let message = "";


    if (score === 5) {

        message =
            "🔥 Mükemmel! Konuyu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        message =
            "👍 Gayet iyi! Eksik olduğun yerleri tekrar et.";

    } else {

        message =
            "📚 Konuyu bir kez daha gözden geçirmen faydalı olacaktır.";
    }


    document.getElementById("resultMessage")
        .textContent =
        message;
}


/* =========================
   KONU BİTTİ
========================= */

function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";

}