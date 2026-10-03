// ==========================================
// KONU BÖLÜMLERİ
// ==========================================

const sections =
    document.querySelectorAll(".lesson-section");

const progressFill =
    document.getElementById("progressFill");

const progressPercent =
    document.getElementById("progressPercent");


sections.forEach(section => {

    const button =
        section.querySelector(".section-header");

    button.addEventListener("click", () => {

        section.classList.toggle("open");

        updateProgress();

    });

});


// ==========================================
// İLERLEME
// ==========================================

function updateProgress() {

    const total =
        sections.length;

    const opened =
        document.querySelectorAll(
            ".lesson-section.open"
        ).length;

    const percentage =
        Math.round(
            (opened / total) * 100
        );

    progressFill.style.width =
        percentage + "%";

    progressPercent.textContent =
        "%" + percentage;
}


// ==========================================
// MİNİ SORULAR
// ==========================================

const miniQuestions =
    document.querySelectorAll(".mini-question");


miniQuestions.forEach(question => {

    const buttons =
        question.querySelectorAll(
            ".answer-button"
        );

    const result =
        question.querySelector(
            ".mini-result"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(item => {

                    item.classList.remove(
                        "correct"
                    );

                    item.classList.remove(
                        "wrong"
                    );

                });


                if (
                    button.classList.contains(
                        "correct-answer"
                    )
                ) {

                    button.classList.add(
                        "correct"
                    );

                    result.textContent =
                        "✓ Doğru cevap!";

                    result.style.color =
                        "#18d879";

                }
                else {

                    button.classList.add(
                        "wrong"
                    );

                    const correct =
                        question.querySelector(
                            ".correct-answer"
                        );

                    correct.classList.add(
                        "correct"
                    );

                    result.textContent =
                        "✗ Yanlış cevap. Doğru cevap yeşil ile gösterildi.";

                    result.style.color =
                        "#ff3d55";

                }

            }
        );

    });

});


// ==========================================
// TEST
// ==========================================

const questions = [

    {
        question:
            "Aşağıdakilerden hangisinin yazımı doğrudur?",

        options: [
            "Ankaraya",
            "Ankara'ya",
            "Ankara ya",
            "ankara'ya",
            "Ankara'Ya"
        ],

        answer: 1,

        explanation:
            "Ankara özel addır ve kendisine gelen çekim eki kesme işaretiyle ayrılır."
    },


    {
        question:
            "Aşağıdaki cümlelerin hangisinde 'de' doğru yazılmıştır?",

        options: [
            "Bende seninle geleceğim.",
            "Ev de kimse yok.",
            "Ben de seninle geleceğim.",
            "Okul da bugün tatildi.",
            "Sende bizimle gel."
        ],

        answer: 2,

        explanation:
            "Buradaki 'de' bağlaçtır ve ayrı yazılır: Ben de seninle geleceğim."
    },


    {
        question:
            "Aşağıdakilerden hangisinde 'ki' doğru yazılmıştır?",

        options: [
            "Biliyorki gelecek.",
            "Ev deki kitap",
            "Duydumki sınav ertelenmiş.",
            "Biliyorum ki gelecek.",
            "Seninki deil."
        ],

        answer: 3,

        explanation:
            "Cümledeki 'ki' bağlaç görevindedir ve ayrı yazılır."
    },


    {
        question:
            "Aşağıdakilerden hangisinde soru eki doğru yazılmıştır?",

        options: [
            "Geldinmi?",
            "Geldin mi?",
            "Geldinmi ?",
            "Geldin mı?",
            "Geldinmi?"
        ],

        answer: 1,

        explanation:
            "Soru eki olan 'mi' kendinden önceki kelimeden ayrı yazılır."
    },


    {
        question:
            "Aşağıdakilerden hangisinin yazımı yanlıştır?",

        options: [
            "Türkiye'de",
            "Ahmet'in",
            "Ankara'ya",
            "TBMM'nin",
            "türkiye'de"
        ],

        answer: 4,

        explanation:
            "Türkiye özel ad olduğu için büyük harfle başlamalıdır: Türkiye'de."
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


// ==========================================
// ELEMENTLER
// ==========================================

const testStart =
    document.getElementById("testStart");

const testArea =
    document.getElementById("testArea");

const testResult =
    document.getElementById("testResult");

const startTest =
    document.getElementById("startTest");

const questionText =
    document.getElementById("questionText");

const answers =
    document.getElementById("answers");

const questionNumber =
    document.getElementById("questionNumber");

const scoreDisplay =
    document.getElementById("score");

const questionProgress =
    document.getElementById("questionProgress");

const answerFeedback =
    document.getElementById("answerFeedback");

const feedbackTitle =
    document.getElementById("feedbackTitle");

const feedbackText =
    document.getElementById("feedbackText");

const nextQuestion =
    document.getElementById("nextQuestion");

const finalScore =
    document.getElementById("finalScore");

const resultMessage =
    document.getElementById("resultMessage");

const retryTest =
    document.getElementById("retryTest");


// ==========================================
// TESTİ BAŞLAT
// ==========================================

startTest.addEventListener(
    "click",
    () => {

        currentQuestion = 0;

        score = 0;

        testStart.style.display =
            "none";

        testResult.classList.remove(
            "active"
        );

        testArea.classList.add(
            "active"
        );

        loadQuestion();

        testArea.scrollIntoView({
            behavior: "smooth"
        });

    }
);


// ==========================================
// SORUYU YÜKLE
// ==========================================

function loadQuestion() {

    answered = false;

    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        `Soru ${currentQuestion + 1} / ${questions.length}`;


    scoreDisplay.textContent =
        score;


    questionText.textContent =
        question.question;


    answers.innerHTML =
        "";


    answerFeedback.classList.remove(
        "show",
        "correct",
        "wrong"
    );


    nextQuestion.classList.remove(
        "show"
    );


    questionProgress.style.width =
        (
            ((currentQuestion + 1) /
            questions.length) * 100
        ) + "%";


    const letters = [
        "A",
        "B",
        "C",
        "D",
        "E"
    ];


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");

            button.className =
                "answer-option";


            button.innerHTML = `

                <span class="answer-letter">
                    ${letters[index]}
                </span>

                <span>
                    ${option}
                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    selectAnswer(
                        index,
                        button
                    );

                }
            );


            answers.appendChild(
                button
            );

        }
    );

}


// ==========================================
// CEVAP
// ==========================================

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


    const allAnswers =
        document.querySelectorAll(
            ".answer-option"
        );


    allAnswers.forEach(
        (button, index) => {

            button.disabled = true;


            if (
                index === question.answer
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selectedIndex ===
        question.answer
    ) {

        selectedButton.classList.add(
            "correct"
        );

        score++;

        scoreDisplay.textContent =
            score;

        feedbackTitle.textContent =
            "✓ DOĞRU";

        answerFeedback.classList.add(
            "correct"
        );

    }
    else {

        selectedButton.classList.add(
            "wrong"
        );

        feedbackTitle.textContent =
            "✗ YANLIŞ";

        answerFeedback.classList.add(
            "wrong"
        );

    }


    feedbackText.textContent =
        question.explanation;


    answerFeedback.classList.add(
        "show"
    );


    if (
        currentQuestion <
        questions.length - 1
    ) {

        nextQuestion.textContent =
            "SONRAKİ SORU →";

    }
    else {

        nextQuestion.textContent =
            "TESTİ BİTİR →";

    }


    nextQuestion.classList.add(
        "show"
    );

}


// ==========================================
// SONRAKİ
// ==========================================

nextQuestion.addEventListener(
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
            behavior: "smooth"
        });

    }
);


// ==========================================
// SONUÇ
// ==========================================

function finishTest() {

    testArea.classList.remove(
        "active"
    );

    testResult.classList.add(
        "active"
    );


    finalScore.textContent =
        `${score} / ${questions.length}`;


    if (score === 5) {

        resultMessage.textContent =
            "Mükemmel! Yazım kurallarını çok iyi öğrenmişsin.";

    }
    else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç noktayı tekrar ederek konuyu pekiştirebilirsin.";

    }
    else {

        resultMessage.textContent =
            "Yazım kurallarının temel noktalarını tekrar etmen faydalı olacaktır.";

    }


    testResult.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// TEKRARLA
// ==========================================

retryTest.addEventListener(
    "click",
    () => {

        currentQuestion = 0;

        score = 0;

        testResult.classList.remove(
            "active"
        );

        testArea.classList.add(
            "active"
        );

        loadQuestion();

        testArea.scrollIntoView({
            behavior: "smooth"
        });

    }
);


// ==========================================
// KONU BİTTİ
// ==========================================

document
    .getElementById("finishButton")
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "../../../index.html?return=subjects";

        }
    );