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
            "Bir bölme işleminde bölen 7 ise kalan aşağıdakilerden hangisi olamaz?",

        answers: [
            "2",
            "4",
            "6",
            "7"
        ],

        correct: 3,

        difficulty: "KOLAY",

        explanation:
            "Kalan her zaman bölen sayıdan küçük olmalıdır. Bölen 7 ise kalan 0, 1, 2, 3, 4, 5 veya 6 olabilir; 7 olamaz."
    },

    {
        question:
            "Aşağıdaki sayılardan hangisi 3 ile tam bölünür?",

        answers: [
            "124",
            "235",
            "372",
            "451"
        ],

        correct: 2,

        difficulty: "KOLAY",

        explanation:
            "372'nin rakamları toplamı 3 + 7 + 2 = 12'dir. 12, 3'ün katı olduğu için 372 sayısı 3'e tam bölünür."
    },

    {
        question:
            "Aşağıdakilerden hangisi 4 ile tam bölünür?",

        answers: [
            "2314",
            "2416",
            "3522",
            "4718"
        ],

        correct: 1,

        difficulty: "ORTA",

        explanation:
            "4 ile bölünebilmede son iki basamağa bakılır. 2416'nın son iki basamağı 16'dır ve 16, 4'e tam bölünür."
    },

    {
        question:
            "Aşağıdakilerden hangisi 6 ile tam bölünür?",

        answers: [
            "125",
            "214",
            "234",
            "317"
        ],

        correct: 2,

        difficulty: "ORTA",

        explanation:
            "6 ile bölünebilmek için sayı hem 2'ye hem 3'e bölünmelidir. 234 çift sayıdır ve rakamları toplamı 9 olduğu için 3'e de bölünür."
    },

    {
        question:
            "53 sayısının 7 ile bölümünden kalan kaçtır?",

        answers: [
            "2",
            "3",
            "4",
            "5"
        ],

        correct: 2,

        difficulty: "ZOR",

        explanation:
            "53 = 7 × 7 + 4 olduğundan 53 sayısının 7 ile bölümünden kalan 4'tür."
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
            "Mükemmel! Bölme ve bölünebilme konusunu çok iyi kavramışsın.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Bölünebilme kurallarını birkaç soru daha çözerek pekiştirebilirsin.";

    } else {

        message =
            "Bölünebilme kurallarını tekrar inceleyip testi yeniden çözebilirsin.";

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