const sections =
    document.querySelectorAll(".lesson-section");

let openedSections = 0;

const totalSections = sections.length;


/* =========================
   AKORDİYON
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

    const percent =
        Math.round(
            (openedSections / totalSections) * 100
        );


    document.getElementById("progressFill")
        .style.width = percent + "%";


    document.getElementById("progressText")
        .textContent = "%" + percent;
}


/* =========================
   MİNİ SORULAR
========================= */

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


            if (
                this.dataset.correct === "true"
            ) {

                this.classList.add("correct");

                result.textContent =
                    "✓ Doğru cevap!";

                result.style.color =
                    "#00ff78";

            } else {

                this.classList.add("wrong");

                result.textContent =
                    "✗ Yanlış cevap. Doğru seçenek yeşil gösterildi.";

                result.style.color =
                    "#ff4b4b";


                buttons.forEach(btn => {

                    if (
                        btn.dataset.correct === "true"
                    ) {

                        btn.classList.add("correct");

                    }

                });

            }

        });

    });

});


/* =========================
   TEST SORULARI
========================= */

const testQuestions = [

    {
        question:
            "3x + 5 = 20 olduğuna göre x kaçtır?",

        answers: [
            "3",
            "4",
            "5",
            "6"
        ],

        correct: 2,

        explanation:
            "3x = 15 olduğundan x = 5 bulunur."
    },


    {
        question:
            "2(x + 4) = 18 olduğuna göre x kaçtır?",

        answers: [
            "4",
            "5",
            "6",
            "7"
        ],

        correct: 1,

        explanation:
            "2x + 8 = 18 → 2x = 10 → x = 5."
    },


    {
        question:
            "5x - 7 = 2x + 8 olduğuna göre x kaçtır?",

        answers: [
            "3",
            "4",
            "5",
            "6"
        ],

        correct: 2,

        explanation:
            "5x - 2x = 8 + 7 → 3x = 15 → x = 5."
    },


    {
        question:
            "x/4 + 3 = 8 olduğuna göre x kaçtır?",

        answers: [
            "16",
            "18",
            "20",
            "24"
        ],

        correct: 2,

        explanation:
            "x/4 = 5 olduğundan x = 20 bulunur."
    },


    {
        question:
            "Bir sayının 4 katının 3 eksiği 21'dir. Bu sayı kaçtır?",

        answers: [
            "5",
            "6",
            "7",
            "8"
        ],

        correct: 2,

        explanation:
            "4x - 3 = 21 → 4x = 24 → x = 6."
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


/* =========================
   TESTİ BAŞLAT
========================= */

function beginTest() {

    currentQuestion = 0;

    score = 0;

    answered = false;


    document.querySelector(".test-start")
        .style.display = "none";


    document.getElementById("testResult")
        .style.display = "none";


    document.getElementById("testArea")
        .style.display = "block";


    showQuestion();
}


/* =========================
   SORUYU GÖSTER
========================= */

function showQuestion() {

    answered = false;


    const question =
        testQuestions[currentQuestion];


    document.getElementById("questionNumber")
        .textContent =
        `SORU ${currentQuestion + 1} / ${testQuestions.length}`;


    document.getElementById("questionText")
        .textContent =
        question.question;


    const answersContainer =
        document.getElementById("testAnswers");


    answersContainer.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");


        button.className = "test-answer";

        button.textContent =
            `${String.fromCharCode(65 + index)}) ${answer}`;


        button.onclick = function () {

            selectAnswer(index, button);

        };


        answersContainer.appendChild(button);

    });


    document.getElementById("answerFeedback")
        .textContent = "";


    document.getElementById("nextButton")
        .style.display = "none";
}


/* =========================
   CEVAP SEÇ
========================= */

function selectAnswer(index, button) {

    if (answered) {
        return;
    }


    answered = true;


    const question =
        testQuestions[currentQuestion];


    const allButtons =
        document.querySelectorAll(".test-answer");


    allButtons.forEach(btn => {
        btn.disabled = true;
    });


    if (index === question.correct) {

        button.classList.add("correct");

        score++;


        document.getElementById("answerFeedback")
            .textContent =
            "✓ Doğru! " + question.explanation;


        document.getElementById("answerFeedback")
            .style.color =
            "#00ff78";

    } else {

        button.classList.add("wrong");


        allButtons[question.correct]
            .classList.add("correct");


        document.getElementById("answerFeedback")
            .textContent =
            "✗ Yanlış. " + question.explanation;


        document.getElementById("answerFeedback")
            .style.color =
            "#ff4b4b";
    }


    const nextButton =
        document.getElementById("nextButton");


    nextButton.style.display =
        "inline-block";


    if (
        currentQuestion ===
        testQuestions.length - 1
    ) {

        nextButton.textContent =
            "TESTİ BİTİR →";

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
        testQuestions.length
    ) {

        showResult();

        return;
    }


    showQuestion();
}


/* =========================
   TEST SONUCU
========================= */

function showResult() {

    document.getElementById("testArea")
        .style.display = "none";


    const result =
        document.getElementById("testResult");


    result.style.display = "block";


    document.getElementById("scoreText")
        .textContent =
        `${score} / ${testQuestions.length}`;


    let message;


    if (score === 5) {

        message =
            "Mükemmel! Denklem çözme konusunu çok iyi kavramışsın.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Birkaç soru daha çözerek konuyu pekiştirebilirsin.";

    } else {

        message =
            "Denklem kurma ve terim taşıma işlemlerini tekrar etmen faydalı olur.";
    }


    document.getElementById("resultMessage")
        .textContent = message;
}


/* =========================
   KONU BİTTİ
========================= */

function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";
}