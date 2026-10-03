let sections =
    document.querySelectorAll(".lesson-section");

let openedSections = 0;


/* =========================
   BÖLÜM AÇ / KAPAT
========================= */

function toggleSection(button) {

    const section =
        button.parentElement;

    const wasOpen =
        section.classList.contains("open");

    section.classList.toggle("open");


    if (!wasOpen) {

        openedSections++;

        updateProgress();

    }

}


/* =========================
   İLERLEME
========================= */

function updateProgress() {

    const total =
        sections.length;

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

        button.classList.add("correct");

        result.textContent =
            "✓ Doğru cevap!";

    } else {

        button.classList.add("wrong");

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
            "Sözel mantık sorularında ilk yapılması gerekenlerden biri aşağıdakilerden hangisidir?",

        answers: [
            "Verilen bilgileri düzenlemek",
            "Şıkları ezberlemek",
            "Soruyu tahmin etmek",
            "En uzun şıkkı seçmek"
        ],

        correct: 0,

        difficulty: "KOLAY",

        explanation:
            "Sözel mantık sorularında verilen bilgileri tablo, sıra veya şema hâline getirmek çözümü kolaylaştırır."
    },


    {
        question:
            "Ali, Mehmet'ten önce; Mehmet de Can'dan önce gelmektedir. Buna göre hangisi doğrudur?",

        answers: [
            "Ali → Mehmet → Can",
            "Can → Mehmet → Ali",
            "Mehmet → Ali → Can",
            "Can → Ali → Mehmet"
        ],

        correct: 0,

        difficulty: "KOLAY",

        explanation:
            "Ali, Mehmet'ten; Mehmet de Can'dan önce olduğuna göre sıralama Ali → Mehmet → Can şeklindedir."
    },


    {
        question:
            "A ile B'nin yan yana olması gerektiği biliniyorsa hangisi kesinlikle doğrudur?",

        answers: [
            "A ilk sıradadır.",
            "B son sıradadır.",
            "A ile B arasında başka bir kişi yoktur.",
            "A ile B arasında en az iki kişi vardır."
        ],

        correct: 2,

        difficulty: "ORTA",

        explanation:
            "Yan yana olmak, iki unsurun arasında başka bir unsur bulunmaması anlamına gelir."
    },


    {
        question:
            "“Ali gelirse Burak gelmez.” bilgisine göre Ali gelmişse hangisi doğrudur?",

        answers: [
            "Burak gelmez.",
            "Burak kesinlikle gelir.",
            "Ali gelmez.",
            "Ali ve Burak kesinlikle birlikte gelir."
        ],

        correct: 0,

        difficulty: "ORTA",

        explanation:
            "Verilen koşula göre Ali'nin gelmesi durumunda Burak'ın gelmesi mümkün değildir."
    },


    {
        question:
            "“Kesinlikle doğrudur” sorusunda hangi bilgi seçilmelidir?",

        answers: [
            "Sadece bir durumda gerçekleşen",
            "Tahmin edilen",
            "Bütün geçerli olasılıklarda doğru olan",
            "En uzun olan"
        ],

        correct: 2,

        difficulty: "ZOR",

        explanation:
            "Kesinlik bildiren sorularda yalnızca tüm geçerli durumlarda doğru olmak zorunda olan bilgi seçilir."
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
        document.getElementById("answers");

    answers.innerHTML = "";


    question.answers.forEach(
        function (answer, index) {

            const button =
                document.createElement("button");


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


            answers.appendChild(button);

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
        ((currentQuestion + 1) /
            questions.length) * 100;


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
   TEST BİTİR
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
            "Mükemmel! Sözel mantık konusunun temelini çok iyi kavramışsın.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Birkaç soru daha çözerek mantık kurma hızını geliştirebilirsin.";

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
    ).style.display = "none";


    document.getElementById(
        "testArea"
    ).classList.add("active");


    loadQuestion();

}


/* =========================
   KONU BİTTİ
========================= */

function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";

}