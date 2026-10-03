/* =========================
   KONU İLERLEMESİ
========================= */

const sections =
    document.querySelectorAll(".lesson-section");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");


function updateProgress() {

    let opened = 0;

    sections.forEach(section => {

        if (section.classList.contains("open")) {
            opened++;
        }

    });

    const percent =
        Math.round(
            (opened / sections.length) * 100
        );

    progressBar.style.width =
        percent + "%";

    progressText.textContent =
        "%" + percent;

}


/* =========================
   AÇILIR KUTULAR
========================= */

sections.forEach(section => {

    const button =
        section.querySelector(".section-header");

    button.addEventListener("click", () => {

        section.classList.toggle("open");

        updateProgress();

    });

});


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

        button.addEventListener("click", () => {

            buttons.forEach(btn => {
                btn.disabled = true;
            });


            const selected =
                button.dataset.answer;


            const correctAnswer =
                question.querySelector(
                    '[data-answer="objective"], [data-answer="correct"]'
                );


            if (
                selected === "objective" ||
                selected === "correct"
            ) {

                button.classList.add("correct");

                result.textContent =
                    "✓ Doğru!";

                result.style.color =
                    "#18d879";

            } else {

                button.classList.add("wrong");

                if (correctAnswer) {
                    correctAnswer.classList.add("correct");
                }

                result.textContent =
                    "✗ Yanlış. Doğru cevabı yukarıdaki yeşil seçenek gösteriyor.";

                result.style.color =
                    "#ff3d55";

            }

        });

    });

});


/* =========================
   TEST SORULARI
========================= */

const questions = [

    {
        difficulty: "KOLAY",

        question:
            '"Türkiye\'nin başkenti Ankara\'dır." cümlesinin anlatımı aşağıdakilerden hangisidir?',

        options: [
            "Öznel",
            "Nesnel",
            "Koşul",
            "Amaç"
        ],

        correct: 1,

        explanation:
            "Başkent bilgisi kişiden kişiye değişmez ve kanıtlanabilir. Bu nedenle nesnel bir yargıdır."
    },


    {
        difficulty: "KOLAY",

        question:
            '"Sınavı kazanmak için düzenli çalışıyor." cümlesinde hangi anlam ilişkisi vardır?',

        options: [
            "Neden-sonuç",
            "Koşul-sonuç",
            "Amaç-sonuç",
            "Karşılaştırma"
        ],

        correct: 2,

        explanation:
            "Çalışma eyleminin amacı sınavı kazanmaktır. Bu nedenle amaç-sonuç ilişkisi vardır."
    },


    {
        difficulty: "ORTA",

        question:
            '"Yağmur yağdığı için pikniğe gidemedik." cümlesinde hangi anlam ilişkisi vardır?',

        options: [
            "Amaç-sonuç",
            "Neden-sonuç",
            "Koşul-sonuç",
            "Karşılaştırma"
        ],

        correct: 1,

        explanation:
            "Pikniğe gidilememesinin nedeni yağmurun yağmasıdır. Bu nedenle neden-sonuç ilişkisi vardır."
    },


    {
        difficulty: "ORTA",

        question:
            '"Düzenli çalışırsan başarılı olursun." cümlesinde aşağıdakilerden hangisi vardır?',

        options: [
            "Neden-sonuç",
            "Amaç-sonuç",
            "Koşul-sonuç",
            "Öznel anlatım"
        ],

        correct: 2,

        explanation:
            "Başarılı olma durumu düzenli çalışma şartına bağlanmıştır. Bu nedenle koşul-sonuç ilişkisi vardır."
    },


    {
        difficulty: "ZOR",

        question:
            'Aşağıdaki cümlelerin hangisinde öznel bir değerlendirme vardır?',

        options: [
            "Türkiye'nin nüfusu 85 milyondan fazladır.",
            "Kitap 320 sayfadan oluşuyor.",
            "Bu roman, yazarın en etkileyici eseridir.",
            "Ankara Türkiye'nin başkentidir."
        ],

        correct: 2,

        explanation:
            '"En etkileyici" ifadesi kişiden kişiye değişebileceği için öznel bir değerlendirmedir.'
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


/* =========================
   TEST ELEMANLARI
========================= */

const testStart =
    document.getElementById("testStart");

const testArea =
    document.getElementById("testArea");

const testResult =
    document.getElementById("testResult");

const startTestButton =
    document.getElementById("startTestButton");

const questionNumber =
    document.getElementById("questionNumber");

const difficulty =
    document.getElementById("difficulty");

const questionText =
    document.getElementById("questionText");

const answers =
    document.getElementById("answers");

const answerFeedback =
    document.getElementById("answerFeedback");

const feedbackTitle =
    document.getElementById("feedbackTitle");

const feedbackText =
    document.getElementById("feedbackText");

const nextQuestionButton =
    document.getElementById("nextQuestionButton");

const scoreDisplay =
    document.getElementById("scoreDisplay");

const questionProgress =
    document.getElementById("questionProgress");

const resultScore =
    document.getElementById("resultScore");

const resultMessage =
    document.getElementById("resultMessage");

const retryButton =
    document.getElementById("retryButton");

const finishButton =
    document.getElementById("finishButton");


/* =========================
   TEST BAŞLAT
========================= */

startTestButton.addEventListener(
    "click",
    () => {

        testStart.style.display = "none";

        testArea.classList.add("active");

        testResult.classList.remove("active");

        currentQuestion = 0;

        score = 0;

        loadQuestion();

        testArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================
   SORUYU YÜKLE
========================= */

function loadQuestion() {

    answered = false;

    const question =
        questions[currentQuestion];

    questionNumber.textContent =
        `Soru ${currentQuestion + 1} / ${questions.length}`;

    difficulty.textContent =
        question.difficulty;

    questionText.textContent =
        question.question;

    scoreDisplay.textContent =
        `${score} Puan`;

    const progress =
        ((currentQuestion + 1) /
            questions.length) * 100;

    questionProgress.style.width =
        progress + "%";

    answers.innerHTML = "";

    answerFeedback.className =
        "answer-feedback";

    feedbackTitle.textContent = "";

    feedbackText.textContent = "";

    nextQuestionButton.classList.remove(
        "show"
    );


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "answer-option";

            button.innerHTML = `

                <span class="answer-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span>
                    ${option}
                </span>

            `;

            button.addEventListener(
                "click",
                () => {

                    checkAnswer(
                        index,
                        button
                    );

                }
            );

            answers.appendChild(button);

        }
    );

}


/* =========================
   CEVABI KONTROL ET
========================= */

function checkAnswer(
    selected,
    selectedButton
) {

    if (answered) {
        return;
    }

    answered = true;

    const question =
        questions[currentQuestion];

    const optionButtons =
        answers.querySelectorAll(
            ".answer-option"
        );


    optionButtons.forEach(
        (button, index) => {

            button.disabled = true;

            if (
                index ===
                question.correct
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selected ===
        question.correct
    ) {

        score++;

        selectedButton.classList.add(
            "correct"
        );

        answerFeedback.className =
            "answer-feedback show correct";

        feedbackTitle.textContent =
            "✓ DOĞRU CEVAP";

        feedbackText.textContent =
            question.explanation;

    } else {

        selectedButton.classList.add(
            "wrong"
        );

        answerFeedback.className =
            "answer-feedback show wrong";

        feedbackTitle.textContent =
            "✗ YANLIŞ CEVAP";

        feedbackText.textContent =
            `Doğru cevap: ${
                question.options[question.correct]
            }. ${question.explanation}`;

    }


    scoreDisplay.textContent =
        `${score} Puan`;

    nextQuestionButton.classList.add(
        "show"
    );

}


/* =========================
   SONRAKİ SORU
========================= */

nextQuestionButton.addEventListener(
    "click",
    () => {

        currentQuestion++;

        if (
            currentQuestion >=
            questions.length
        ) {

            finishTest();

            return;

        }

        loadQuestion();

        testArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================
   TESTİ BİTİR
========================= */

function finishTest() {

    testArea.classList.remove("active");

    testResult.classList.add("active");

    resultScore.textContent =
        `${score} / ${questions.length}`;


    if (score === 5) {

        resultMessage.textContent =
            "Mükemmel! Konuya tamamen hakimsin. 🔥";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç noktayı daha tekrar edebilirsin. 💪";

    } else {

        resultMessage.textContent =
            "Konuya bir kez daha göz atıp tekrar denemen faydalı olabilir. 📚";

    }


    testResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================
   TEKRAR ÇÖZ
========================= */

retryButton.addEventListener(
    "click",
    () => {

        currentQuestion = 0;

        score = 0;

        testResult.classList.remove("active");

        testArea.classList.add("active");

        loadQuestion();

        testArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================
   KONU BİTTİ
========================= */

finishButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "../../../index.html?return=subjects";

    }
);