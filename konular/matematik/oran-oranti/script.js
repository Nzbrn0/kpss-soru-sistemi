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
   PROGRESS
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
   MINI SORULAR
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
                    "✗ Yanlış cevap. Doğru seçeneği kontrol et.";

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
            "2/5 = x/15 olduğuna göre x kaçtır?",

        answers: [
            "4",
            "5",
            "6",
            "8"
        ],

        correct: 2,

        explanation:
            "İçler dışlar çarpımı: 2 × 15 = 5x → 30 = 5x → x = 6."
    },


    {
        question:
            "3 işçi bir işi 12 günde bitiriyorsa, aynı işi 6 işçi kaç günde bitirir?",

        answers: [
            "4",
            "6",
            "8",
            "9"
        ],

        correct: 1,

        explanation:
            "İşçi sayısı ile süre ters orantılıdır. 3 × 12 = 6 × x → x = 6."
    },


    {
        question:
            "4 kalem 28 TL ise 10 kalem kaç TL'dir?",

        answers: [
            "56",
            "63",
            "70",
            "84"
        ],

        correct: 2,

        explanation:
            "Doğru orantı vardır. 4/28 = 10/x → 4x = 280 → x = 70."
    },


    {
        question:
            "Ali'nin parasının Veli'nin parasına oranı 2/3'tür. Toplam 100 TL ise Ali'nin parası kaç TL'dir?",

        answers: [
            "30",
            "40",
            "50",
            "60"
        ],

        correct: 1,

        explanation:
            "Ali = 2x, Veli = 3x. 5x = 100 → x = 20. Ali = 40 TL."
    },


    {
        question:
            "x/8 = 9/12 olduğuna göre x kaçtır?",

        answers: [
            "4",
            "5",
            "6",
            "7"
        ],

        correct: 2,

        explanation:
            "İçler dışlar: 12x = 72 → x = 6."
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


    nextButton.style.display = "inline-block";


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


    let message = "";


    if (score === 5) {

        message =
            "Mükemmel! Oran-orantı konusunu çok iyi kavramışsın.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Birkaç noktayı tekrar ederek konuyu pekiştirebilirsin.";

    } else {

        message =
            "Temel formülleri ve doğru/ters orantıyı tekrar etmen faydalı olur.";
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