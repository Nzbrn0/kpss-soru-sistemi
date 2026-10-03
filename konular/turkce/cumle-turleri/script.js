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
            "“Bugün hava çok güzel.” cümlesi yüklemin türüne göre hangisidir?",

        answers: [
            "Fiil cümlesi",
            "İsim cümlesi",
            "Devrik cümle",
            "Birleşik cümle"
        ],

        correct: 1,

        difficulty: "KOLAY",

        explanation:
            "Cümlenin yüklemi “güzel” isim soylu olduğu için cümle isim cümlesidir."
    },


    {
        question:
            "“Geldi sonunda beklediğimiz gün.” cümlesi yüklemin yerine göre hangisidir?",

        answers: [
            "Kurallı",
            "Devrik",
            "Eksiltili",
            "Basit"
        ],

        correct: 1,

        difficulty: "KOLAY",

        explanation:
            "“Geldi” yüklemi cümlenin başında yer aldığı için cümle devriktir."
    },


    {
        question:
            "“Ali bugün okula gitmedi.” cümlesi anlamına göre hangisidir?",

        answers: [
            "Olumlu",
            "Soru",
            "Olumsuz",
            "Ünlem"
        ],

        correct: 2,

        difficulty: "ORTA",

        explanation:
            "“Gitmedi” yüklemindeki olumsuzluk nedeniyle cümle anlamına göre olumsuzdur."
    },


    {
        question:
            "“Kitabımı aldım ve odama çıktım.” cümlesi yapısına göre hangisidir?",

        answers: [
            "Basit",
            "Birleşik",
            "Sıralı",
            "Bağlı"
        ],

        correct: 3,

        difficulty: "ORTA",

        explanation:
            "İki ayrı yargı “ve” bağlacıyla birbirine bağlandığı için cümle bağlı cümledir."
    },


    {
        question:
            "“Seni görünce çok sevindim.” cümlesi yapısına göre hangisidir?",

        answers: [
            "Basit",
            "Girişik birleşik",
            "Sıralı",
            "Bağlı"
        ],

        correct: 1,

        difficulty: "ZOR",

        explanation:
            "“Görünce” fiilimsidir. Fiilimsi bulunan bu yapı girişik birleşik cümledir."
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
            "Mükemmel! Cümle türleri konusunu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Birkaç noktayı tekrar ederek bilgini pekiştirebilirsin.";

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