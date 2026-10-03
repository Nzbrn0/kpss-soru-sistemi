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

    let total =
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
    ).style.width = percent + "%";


    document.getElementById(
        "progressPercent"
    ).textContent = percent + "%";

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
            "✗ Yanlış cevap. Diğer seçenekleri de incele.";

    }

}


/* =========================
   TEST SORULARI
========================= */

const questions = [

    {
        question:
            "Aşağıdaki cümlelerin hangisinde noktalama işareti doğru kullanılmıştır?",

        answers: [
            "Bugün, okula gittim.",
            "Ali, Ayşe ve Mehmet geldi.",
            "Ankara'ya, yarın gideceğim.",
            "Kitabımı, evde bıraktım."
        ],

        correct: 1,

        difficulty: "KOLAY",

        explanation:
            "Eş görevli isimlerden oluşan sıralamada virgül doğru kullanılmıştır."
    },


    {
        question:
            "Aşağıdaki cümlelerin hangisinde iki nokta doğru kullanılmıştır?",

        answers: [
            "Çantamda: kitap ve kalem var.",
            "Şunu unutma: Düzenli çalışmalısın.",
            "Bugün: okula gittim.",
            "Ben: eve erken geldim."
        ],

        correct: 1,

        difficulty: "ORTA",

        explanation:
            "İki nokta kendisinden sonra açıklama yapılacağını göstermek için kullanılabilir."
    },


    {
        question:
            "Aşağıdakilerden hangisinin sonuna soru işareti getirilmelidir?",

        answers: [
            "Bugün hava çok güzel",
            "Keşke sen de gelsen",
            "Sınav saat kaçta başlayacak",
            "Ders çalışmayı seviyorum"
        ],

        correct: 2,

        difficulty: "KOLAY",

        explanation:
            "Sınav saat kaçta başlayacak? cümlesi soru anlamı taşıdığı için soru işaretiyle tamamlanır."
    },


    {
        question:
            "Aşağıdaki cümlelerin hangisinde kesme işareti doğru kullanılmıştır?",

        answers: [
            "ankara'ya gittim.",
            "Ankara ya gittim.",
            "Ankara'ya gittim.",
            "Ankara'ya' gittim."
        ],

        correct: 2,

        difficulty: "ORTA",

        explanation:
            "Özel ad olan Ankara'ya gelen yönelme eki kesme işaretiyle ayrılır."
    },


    {
        question:
            "Aşağıdakilerden hangisinde noktalı virgülün kullanımı doğrudur?",

        answers: [
            "Elma, armut, muz; süt, peynir, ekmek aldım.",
            "Bugün; okula gittim.",
            "Ali; geldi.",
            "Kitabı; okudum."
        ],

        correct: 0,

        difficulty: "ZOR",

        explanation:
            "Virgüllerle ayrılmış iki farklı söz grubunu birbirinden ayırmak için noktalı virgül kullanılabilir."
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
    ).style.display = "none";


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


    let message = "";


    if (score === 5) {

        message =
            "Mükemmel! Noktalama konusunu çok iyi öğrenmişsin.";

    }

    else if (score >= 3) {

        message =
            "Gayet iyi! Birkaç noktayı tekrar ederek konuyu pekiştirebilirsin.";

    }

    else {

        message =
            "Konu özetini tekrar inceleyip testi yeniden çözebilirsin.";

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