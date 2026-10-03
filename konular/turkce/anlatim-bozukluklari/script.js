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
            "Aşağıdaki cümlelerin hangisinde gereksiz sözcük kullanılmıştır?",

        answers: [
            "Sabah erkenden yola çıktık.",
            "Bu olayı tekrar yeniden anlattı.",
            "Akşam arkadaşlarımla buluştum.",
            "Kitabı masanın üzerine bıraktım."
        ],

        correct: 1,

        difficulty: "KOLAY",

        explanation:
            "“Tekrar” ve “yeniden” aynı anlamı taşıdığı için birlikte kullanılmaları gereksizdir."
    },


    {
        question:
            "“Herkes fikirlerini söylediler.” cümlesindeki anlatım bozukluğunun nedeni nedir?",

        answers: [
            "Gereksiz sözcük",
            "Özne-yüklem uyumsuzluğu",
            "Tamlama yanlışlığı",
            "Sözcüğün yanlış yerde kullanılması"
        ],

        correct: 1,

        difficulty: "KOLAY",

        explanation:
            "“Herkes” tekil kabul edildiği için yüklemin “söyledi” olması gerekir."
    },


    {
        question:
            "“Seni seviyor ve güveniyorum.” cümlesindeki anlatım bozukluğunun nedeni nedir?",

        answers: [
            "Gereksiz sözcük",
            "Anlam çelişkisi",
            "Öge eksikliği",
            "Tamlama yanlışlığı"
        ],

        correct: 2,

        difficulty: "ORTA",

        explanation:
            "“Sevmek” fiili “seni” nesnesini alabilir; “güvenmek” ise “sana” biçiminde dolaylı tümleç ister. İkinci yüklem için gerekli öge eksiktir."
    },


    {
        question:
            "“Kesinlikle belki yarın gelir.” cümlesindeki temel anlatım bozukluğu nedir?",

        answers: [
            "Özne-yüklem uyumsuzluğu",
            "Gereksiz sözcük",
            "Anlamca çelişen ifadeler",
            "Tamlama yanlışlığı"
        ],

        correct: 2,

        difficulty: "ORTA",

        explanation:
            "“Kesinlikle” kesinlik, “belki” ise olasılık bildirir. Bu ifadeler aynı kullanım içinde anlam bakımından çelişmektedir."
    },


    {
        question:
            "Anlatım bozukluğu sorularında birden fazla yüklem bulunan cümlelerde öncelikle ne kontrol edilmelidir?",

        answers: [
            "Yüklemlerin istediği ögeler ve özne ilişkileri",
            "Sözcüklerin uzunlukları",
            "Yalnızca noktalama işaretleri",
            "Cümlenin kelime sayısı"
        ],

        correct: 0,

        difficulty: "ZOR",

        explanation:
            "Birden fazla yüklem varsa her yüklemin özne ve diğer ögelerle ilişkisi ayrı ayrı kontrol edilmelidir."
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
            "Mükemmel! Anlatım bozuklukları konusunu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Özellikle hata türlerini tekrar ederek bilgini pekiştirebilirsin.";

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