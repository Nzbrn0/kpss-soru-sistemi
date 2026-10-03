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
            "583 sayısındaki 8 rakamının basamak değeri kaçtır?",

        answers: [
            "8",
            "80",
            "800",
            "580"
        ],

        correct: 1,

        difficulty: "KOLAY",

        explanation:
            "8 rakamı onlar basamağında bulunduğu için basamak değeri 8 × 10 = 80'dir."
    },

    {
        question:
            "326 sayısının çözümlenmiş hâli aşağıdakilerden hangisidir?",

        answers: [
            "300 + 20 + 60",
            "300 + 20 + 6",
            "30 + 20 + 6",
            "300 + 200 + 6"
        ],

        correct: 1,

        difficulty: "KOLAY",

        explanation:
            "326 = 3 × 100 + 2 × 10 + 6 = 300 + 20 + 6 şeklinde çözümlenir."
    },

    {
        question:
            "Aşağıdakilerden hangisi üç basamaklı bir doğal sayıdır?",

        answers: [
            "87",
            "99",
            "105",
            "1000"
        ],

        correct: 2,

        difficulty: "ORTA",

        explanation:
            "100 ile 999 arasındaki doğal sayılar üç basamaklıdır. 105 bu aralıktadır."
    },

    {
        question:
            "4827 sayısının rakamları toplamı kaçtır?",

        answers: [
            "19",
            "20",
            "21",
            "22"
        ],

        correct: 2,

        difficulty: "ORTA",

        explanation:
            "4 + 8 + 2 + 7 = 21 olduğundan rakamlar toplamı 21'dir."
    },

    {
        question:
            "3 basamaklı ABC sayısında A, B ve C birbirinden farklıdır. A'nın 0 olamamasının temel nedeni nedir?",

        answers: [
            "0 çift olduğu için",
            "0 negatif olduğu için",
            "İlk basamak 0 olursa sayı 3 basamaklı olmaz",
            "0 rakam olmadığı için"
        ],

        correct: 2,

        difficulty: "ZOR",

        explanation:
            "Bir sayının ilk basamağı 0 olamaz. Örneğin 052 ifadesi 52'ye eşittir ve üç basamaklı bir sayı değildir."
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
            "Mükemmel! Sayı basamakları konusunu çok iyi kavramışsın.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Birkaç soru daha çözerek konuyu pekiştirebilirsin.";

    } else {

        message =
            "Sayı basamakları konusunu tekrar inceleyip testi yeniden çözebilirsin.";

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