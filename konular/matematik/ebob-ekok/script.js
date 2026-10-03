const sections =
    document.querySelectorAll(".lesson-section");

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");

let openedSections = 0;


/* =========================
   KONU KUTULARI
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
   İLERLEME
========================= */

function updateProgress() {

    let percentage =
        Math.round(
            (openedSections / sections.length) * 100
        );


    if (percentage > 100) {
        percentage = 100;
    }


    progressFill.style.width =
        percentage + "%";


    progressText.textContent =
        percentage + "%";
}


/* =========================
   MİNİ SORULAR
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

        result.className =
            "mini-result correct-result";

    } else {

        button.classList.add("wrong");

        result.textContent =
            "✗ Yanlış! Doğru cevap yeşil olarak gösterildi.";

        result.className =
            "mini-result wrong-result";


        buttons.forEach(btn => {

            const onclick =
                btn.getAttribute("onclick");

            if (
                onclick &&
                onclick.includes("true")
            ) {

                btn.classList.add("correct");

            }

        });

    }

}


/* =========================
   TEST SORULARI
========================= */

const questions = [

    {
        question:
            "12 ve 18 sayılarının EBOB'u kaçtır?",

        answers: [
            "2",
            "3",
            "6",
            "9"
        ],

        correct: 2,

        explanation:
            "12 ve 18'in en büyük ortak böleni 6'dır."
    },


    {
        question:
            "6 ve 8 sayılarının EKOK'u kaçtır?",

        answers: [
            "12",
            "18",
            "24",
            "48"
        ],

        correct: 2,

        explanation:
            "6 ve 8'in en küçük ortak katı 24'tür."
    },


    {
        question:
            "24 ve 36 sayılarının EBOB'u kaçtır?",

        answers: [
            "6",
            "8",
            "12",
            "18"
        ],

        correct: 2,

        explanation:
            "24 ve 36'nın en büyük ortak böleni 12'dir."
    },


    {
        question:
            "Bir zil 12 dakikada, başka bir zil 18 dakikada bir çalıyor. Birlikte çaldıktan kaç dakika sonra tekrar birlikte çalarlar?",

        answers: [
            "24",
            "30",
            "36",
            "54"
        ],

        correct: 2,

        explanation:
            "Tekrar aynı anda çalma süresi EKOK(12,18) = 36 dakikadır."
    },


    {
        question:
            "EBOB(8,24) ve EKOK(8,24) değerleri sırasıyla hangisidir?",

        answers: [
            "4 ve 16",
            "8 ve 24",
            "8 ve 32",
            "24 ve 8"
        ],

        correct: 1,

        explanation:
            "8, 24'ü tam böldüğü için EBOB 8, EKOK 24'tür."
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


/* =========================
   TEST BAŞLAT
========================= */

function startTest() {

    currentQuestion = 0;

    score = 0;

    answered = false;


    document.querySelector(".test-start")
        .style.display = "none";


    document.getElementById("testResult")
        .style.display = "none";


    document.getElementById("testArea")
        .style.display = "block";


    loadQuestion();

}


/* =========================
   SORU YÜKLE
========================= */

function loadQuestion() {

    answered = false;


    const question =
        questions[currentQuestion];


    const questionCard =
        document.getElementById("questionCard");


    const answers =
        document.getElementById("testAnswers");


    const feedback =
        document.getElementById("answerFeedback");


    const nextButton =
        document.getElementById("nextButton");


    questionCard.innerHTML = `
        <span>
            Soru ${currentQuestion + 1} / ${questions.length}
        </span>

        <h3>
            ${question.question}
        </h3>
    `;


    answers.innerHTML = "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");


            button.className =
                "answer-option";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                function () {

                    selectAnswer(
                        button,
                        index
                    );

                }
            );


            answers.appendChild(button);

        }
    );


    feedback.textContent = "";

    feedback.className =
        "answer-feedback";


    nextButton.style.display =
        "none";

}


/* =========================
   CEVAP SEÇ
========================= */

function selectAnswer(button, index) {

    if (answered) {
        return;
    }


    answered = true;


    const question =
        questions[currentQuestion];


    const buttons =
        document.querySelectorAll(
            ".answer-option"
        );


    buttons.forEach(btn => {

        btn.disabled = true;

    });


    if (index === question.correct) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

        buttons[
            question.correct
        ].classList.add("correct");

    }


    const feedback =
        document.getElementById(
            "answerFeedback"
        );


    if (index === question.correct) {

        feedback.textContent =
            "✓ Doğru! " +
            question.explanation;

        feedback.classList.add(
            "feedback-correct"
        );

    } else {

        feedback.textContent =
            "✗ Yanlış! " +
            question.explanation;

        feedback.classList.add(
            "feedback-wrong"
        );

    }


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    nextButton.style.display =
        "block";


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.textContent =
            "TESTİ BİTİR";

    } else {

        nextButton.textContent =
            "SONRAKİ SORU →";

    }

}


/* =========================
   SONRAKİ SORU
========================= */

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion >=
        questions.length
    ) {

        finishTest();

        return;
    }


    loadQuestion();

}


/* =========================
   TEST BİTİR
========================= */

function finishTest() {

    document.getElementById("testArea")
        .style.display = "none";


    document.getElementById("testResult")
        .style.display = "block";


    document.getElementById("scoreText")
        .textContent =
        `${score} / ${questions.length}`;

}


/* =========================
   KONUYU BİTİR
========================= */

function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";

}