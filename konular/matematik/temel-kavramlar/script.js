let sections =
    document.querySelectorAll(".lesson-section");

let openedSections = 0;


/* =========================
   KONU BÖLÜMLERİ
========================= */

function toggleSection(button) {

    const section = button.parentElement;

    const wasOpen =
        section.classList.contains("open");

    section.classList.toggle("open");

    if (!wasOpen) {

        openedSections++;

        updateProgress();
    }
}


function updateProgress() {

    const total = sections.length;

    let percent =
        Math.round(
            (openedSections / total) * 100
        );

    if (percent > 100) {
        percent = 100;
    }

    document.getElementById(
        "progressFill"
    ).style.width =
        percent + "%";

    document.getElementById(
        "progressPercent"
    ).textContent =
        percent + "%";
}


/* =========================
   MİNİ SORULAR
========================= */

function checkMini(button, correct) {

    const container =
        button.parentElement;

    const buttons =
        container.querySelectorAll(
            ".answer-button"
        );

    const result =
        container.querySelector(
            ".mini-result"
        );

    buttons.forEach(function (btn) {

        btn.disabled = true;

    });

    if (correct) {

        button.classList.add(
            "correct"
        );

        result.textContent =
            "✓ Doğru cevap!";

    } else {

        button.classList.add(
            "wrong"
        );

        result.textContent =
            "✗ Yanlış cevap. Konuyu tekrar inceleyebilirsin.";

    }
}


/* =========================
   TEST SORULARI
========================= */

const questions = [

    {
        question:
            "Aşağıdakilerden hangisi ne pozitif ne de negatif bir sayıdır?",

        answers: [
            "-5",
            "0",
            "5",
            "10"
        ],

        correct: 1,

        difficulty: "KOLAY",

        explanation:
            "0, sayı doğrusunda pozitif ve negatif sayıların arasında bulunur. Bu nedenle 0 ne pozitif ne de negatiftir."
    },

    {
        question:
            "Aşağıdakilerden hangisi çift sayıdır?",

        answers: [
            "17",
            "23",
            "31",
            "48"
        ],

        correct: 3,

        difficulty: "KOLAY",

        explanation:
            "48 sayısı 2'ye tam bölündüğü için çift sayıdır."
    },

    {
        question:
            "Tek + Tek işleminin sonucu aşağıdakilerden hangisidir?",

        answers: [
            "Tek",
            "Çift",
            "Negatif",
            "Sıfır"
        ],

        correct: 1,

        difficulty: "ORTA",

        explanation:
            "İki tek sayının toplamı her zaman çift sayıdır."
    },

    {
        question:
            "|-15| işleminin sonucu kaçtır?",

        answers: [
            "-15",
            "0",
            "15",
            "30"
        ],

        correct: 2,

        difficulty: "ORTA",

        explanation:
            "Mutlak değer bir sayının 0'a olan uzaklığıdır. -15'in 0'a uzaklığı 15'tir."
    },

    {
        question:
            "Aşağıdakilerden hangisi 4, 6, 8, 10, ... dizisinin bir sonraki terimidir?",

        answers: [
            "11",
            "12",
            "13",
            "14"
        ],

        correct: 1,

        difficulty: "ZOR",

        explanation:
            "Bu dizi ardışık çift sayılardan oluşmaktadır ve her adımda 2 artmaktadır. 10'dan sonra 12 gelir."
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


/* =========================
   TESTİ BAŞLAT
========================= */

function startTest() {

    document.getElementById(
        "testStart"
    ).style.display = "none";

    document.getElementById(
        "testArea"
    ).classList.add("active");

    document.getElementById(
        "testResult"
    ).classList.remove("active");

    currentQuestion = 0;

    score = 0;

    loadQuestion();
}


/* =========================
   SORUYU YÜKLE
========================= */

function loadQuestion() {

    answered = false;

    const question =
        questions[currentQuestion];


    document.getElementById(
        "questionNumber"
    ).textContent =
        `Soru ${currentQuestion + 1} / ${questions.length}`;


    document.getElementById(
        "scoreDisplay"
    ).textContent =
        `Puan: ${score}`;


    document.getElementById(
        "difficulty"
    ).textContent =
        question.difficulty;


    document.getElementById(
        "questionText"
    ).textContent =
        question.question;


    const answers =
        document.getElementById(
            "answers"
        );

    answers.innerHTML = "";


    question.answers.forEach(
        function (answer, index) {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "answer-option";


            button.innerHTML = `
                <span class="answer-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span>
                    ${answer}
                </span>
            `;


            button.onclick =
                function () {

                    selectAnswer(
                        index,
                        button
                    );

                };


            answers.appendChild(
                button
            );

        }
    );


    document.getElementById(
        "answerFeedback"
    ).className =
        "answer-feedback";


    document.getElementById(
        "answerFeedback"
    ).style.display =
        "none";


    document.getElementById(
        "nextButton"
    ).classList.remove("show");


    const progress =
        (
            (currentQuestion + 1) /
            questions.length
        ) * 100;


    document.getElementById(
        "questionProgress"
    ).style.width =
        progress + "%";
}


/* =========================
   CEVAP SEÇ
========================= */

function selectAnswer(
    selectedIndex,
    selectedButton
) {

    if (answered) {
        return;
    }

    answered = true;


    const question =
        questions[currentQuestion];


    const allButtons =
        document.querySelectorAll(
            ".answer-option"
        );


    allButtons.forEach(
        function (button, index) {

            button.disabled = true;

            if (
                index === question.correct
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    const feedback =
        document.getElementById(
            "answerFeedback"
        );


    const feedbackTitle =
        document.getElementById(
            "feedbackTitle"
        );


    const feedbackText =
        document.getElementById(
            "feedbackText"
        );


    if (
        selectedIndex === question.correct
    ) {

        selectedButton.classList.add(
            "correct"
        );

        score++;


        feedback.className =
            "answer-feedback show correct";


        feedbackTitle.textContent =
            "✓ DOĞRU";


        feedbackText.textContent =
            question.explanation;

    } else {

        selectedButton.classList.add(
            "wrong"
        );


        feedback.className =
            "answer-feedback show wrong";


        feedbackTitle.textContent =
            "✗ YANLIŞ";


        feedbackText.textContent =
            question.explanation;

    }


    document.getElementById(
        "scoreDisplay"
    ).textContent =
        `Puan: ${score}`;


    document.getElementById(
        "nextButton"
    ).classList.add("show");
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
   TESTİ BİTİR
========================= */

function finishTest() {

    document.getElementById(
        "testArea"
    ).classList.remove("active");


    document.getElementById(
        "testResult"
    ).classList.add("active");


    document.getElementById(
        "finalScore"
    ).textContent =
        `${score} / ${questions.length}`;


    let message;


    if (score === 5) {

        message =
            "Mükemmel! Temel kavramlar konusunu çok iyi kavramışsın.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Birkaç soru daha çözerek konuyu pekiştirebilirsin.";

    } else {

        message =
            "Konu anlatımını tekrar inceleyip testi yeniden çözebilirsin.";

    }


    document.getElementById(
        "resultMessage"
    ).textContent =
        message;
}


/* =========================
   TEKRAR ÇÖZ
========================= */

function restartTest() {

    currentQuestion = 0;

    score = 0;


    document.getElementById(
        "testResult"
    ).classList.remove("active");


    document.getElementById(
        "testStart"
    ).style.display =
        "none";


    document.getElementById(
        "testArea"
    ).classList.add("active");


    loadQuestion();
}


/* =========================
   KONUYU BİTİR
========================= */

function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";
}