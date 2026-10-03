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
   TEST
========================= */

const testQuestions = [

    {
        question:
            "Bir sayının 3 katının 4 fazlası 19'dur. Bu sayı kaçtır?",

        answers: [
            "4",
            "5",
            "6",
            "7"
        ],

        correct: 1,

        explanation:
            "3x + 4 = 19 → 3x = 15 → x = 5."
    },


    {
        question:
            "Ardışık üç sayının toplamı 42'dir. En büyük sayı kaçtır?",

        answers: [
            "13",
            "14",
            "15",
            "16"
        ],

        correct: 2,

        explanation:
            "x + (x+1) + (x+2) = 42 → 3x+3=42 → x=13. En büyük sayı 15'tir."
    },


    {
        question:
            "Bir babanın yaşı oğlunun yaşının 4 katıdır. Yaşları toplamı 50 ise baba kaç yaşındadır?",

        answers: [
            "35",
            "40",
            "45",
            "48"
        ],

        correct: 1,

        explanation:
            "Oğul = x, baba = 4x. 5x = 50 → x = 10. Baba = 40."
    },


    {
        question:
            "240 TL'nin %25'i kaç TL'dir?",

        answers: [
            "50",
            "60",
            "70",
            "80"
        ],

        correct: 1,

        explanation:
            "240 × 25 / 100 = 60 TL."
    },


    {
        question:
            "Saatte 70 km hızla giden bir araç 3 saatte kaç km yol alır?",

        answers: [
            "180",
            "200",
            "210",
            "240"
        ],

        correct: 2,

        explanation:
            "Yol = Hız × Zaman → 70 × 3 = 210 km."
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
   CEVAP
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
   SONUÇ
========================= */

function showResult() {

    document.getElementById("testArea")
        .style.display = "none";


    document.getElementById("testResult")
        .style.display = "block";


    document.getElementById("scoreText")
        .textContent =
        `${score} / ${testQuestions.length}`;


    let message;


    if (score === 5) {

        message =
            "Mükemmel! Problem çözme mantığını çok iyi kavramışsın.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Birkaç farklı problem tipi daha çözerek konuyu pekiştirebilirsin.";

    } else {

        message =
            "Problem kurma mantığını ve temel formülleri tekrar etmen faydalı olur.";
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