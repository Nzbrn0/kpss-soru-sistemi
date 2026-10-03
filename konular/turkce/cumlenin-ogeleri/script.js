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
            "“Öğrenciler sınava çalıştı.” cümlesinde özne hangisidir?",

        answers: [
            "Sınava",
            "Çalıştı",
            "Öğrenciler",
            "Sınava çalıştı"
        ],

        correct: 2,

        difficulty: "KOLAY",

        explanation:
            "“Çalıştı” yükleminin bildirdiği işi yapan “öğrenciler”dir. Bu nedenle özne “öğrenciler”dir."
    },


    {
        question:
            "“Ali kitabı okudu.” cümlesinde “kitabı” hangi ögedir?",

        answers: [
            "Özne",
            "Belirtili nesne",
            "Dolaylı tümleç",
            "Zarf tümleci"
        ],

        correct: 1,

        difficulty: "KOLAY",

        explanation:
            "“Neyi okudu?” sorusunun cevabı “kitabı”dır. Bu nedenle “kitabı” belirtili nesnedir."
    },


    {
        question:
            "“Ali okula gitti.” cümlesinde “okula” hangi ögedir?",

        answers: [
            "Belirtili nesne",
            "Özne",
            "Dolaylı tümleç",
            "Yüklem"
        ],

        correct: 2,

        difficulty: "ORTA",

        explanation:
            "“Nereye gitti?” sorusunun cevabı “okula”dır. Yönelme bildirdiği için dolaylı tümleçtir."
    },


    {
        question:
            "“Çocuk hızlı koştu.” cümlesinde “hızlı” hangi ögedir?",

        answers: [
            "Özne",
            "Nesne",
            "Zarf tümleci",
            "Dolaylı tümleç"
        ],

        correct: 2,

        difficulty: "ORTA",

        explanation:
            "“Nasıl koştu?” sorusunun cevabı “hızlı”dır. Bu nedenle zarf tümlecidir."
    },


    {
        question:
            "“Dün sinemaya gittim.” cümlesinde aşağıdakilerden hangisi gizli öznedir?",

        answers: [
            "Dün",
            "Sinemaya",
            "Ben",
            "Gittim"
        ],

        correct: 2,

        difficulty: "ZOR",

        explanation:
            "“Gittim” yüklemindeki birinci tekil kişi eki, öznenin “ben” olduğunu gösterir. Ancak “ben” cümlede açıkça yazılmadığı için gizli öznedir."
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
    ).classList.remove(
        "show"
    );


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
        selectedIndex ===
        question.correct
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
    ).classList.add(
        "show"
    );

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
    ).classList.remove(
        "active"
    );


    document.getElementById(
        "testResult"
    ).classList.add(
        "active"
    );


    document.getElementById(
        "finalScore"
    ).textContent =
        `${score} / ${questions.length}`;


    let message;


    if (score === 5) {

        message =
            "Mükemmel! Cümlenin ögeleri konusunu çok iyi öğrenmişsin.";

    }

    else if (score >= 3) {

        message =
            "Gayet iyi! Birkaç noktayı tekrar ederek bilgini pekiştirebilirsin.";

    }

    else {

        message =
            "Konu anlatımını tekrar inceleyip testi yeniden çözebilirsin.";

    }


    document.getElementById(
        "resultMessage"
    ).textContent =
        message;

}


/* =========================
   TESTİ TEKRARLA
========================= */

function restartTest() {

    currentQuestion = 0;

    score = 0;


    document.getElementById(
        "testResult"
    ).classList.remove(
        "active"
    );


    document.getElementById(
        "testStart"
    ).style.display =
        "none";


    document.getElementById(
        "testArea"
    ).classList.add(
        "active"
    );


    loadQuestion();

}


/* =========================
   KONU BİTTİ
========================= */

function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";

}