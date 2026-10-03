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

                buttons.forEach(
                    item => {

                        item.classList.remove(
                            "correct"
                        );

                        item.classList.remove(
                            "wrong"
                        );

                    }
                );


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
// TEST SORULARI
// ==========================================

const questions = [

    {
        question:
            "Bir paragrafta yazarın okuyucuya vermek istediği temel mesaja ne ad verilir?",

        options: [
            "Konu",
            "Ana düşünce",
            "Yardımcı düşünce",
            "Başlık",
            "Sonuç"
        ],

        answer: 1,

        explanation:
            "Yazarın okuyucuya vermek istediği temel mesaj paragrafın ana düşüncesidir."
    },


    {
        question:
            "Bir paragrafta üzerinde durulan temel kavram veya olaya ne ad verilir?",

        options: [
            "Ana düşünce",
            "Yardımcı düşünce",
            "Konu",
            "Başlık",
            "Sonuç"
        ],

        answer: 2,

        explanation:
            "Paragrafta üzerinde durulan temel kavram, olay veya durum paragrafın konusudur."
    },


    {
        question:
            "Aşağıdakilerden hangisi yardımcı düşüncenin özelliğidir?",

        options: [
            "Paragrafın tamamını tek başına özetler.",
            "Ana düşünceyi destekler.",
            "Yalnızca başlıkta bulunur.",
            "Yazarın kim olduğunu gösterir.",
            "Paragrafın konusunu değiştirir."
        ],

        answer: 1,

        explanation:
            "Yardımcı düşünceler ana düşüncenin açıklanmasını ve desteklenmesini sağlar."
    },


    {
        question:
            "Bir olayın kişi, zaman ve yer unsurlarıyla anlatılmasına ne ad verilir?",

        options: [
            "Betimleme",
            "Açıklama",
            "Tartışma",
            "Öyküleme",
            "Tanımlama"
        ],

        answer: 3,

        explanation:
            "Olayların kişi, zaman ve yer unsurlarıyla anlatılması öykülemedir."
    },


    {
        question:
            "Paragraf sorularında aşağıdakilerden hangisi doğru bir çözüm yaklaşımıdır?",

        options: [
            "Kendi bilgilerimizi metne eklemek.",
            "En uzun seçeneği işaretlemek.",
            "Metindeki bilgilerden hareket etmek.",
            "Soruyu okumadan seçenekleri değerlendirmek.",
            "Her zaman ilk seçeneği tercih etmek."
        ],

        answer: 2,

        explanation:
            "Paragraf sorularında cevap metindeki bilgiler ve anlam ilişkileri üzerinden bulunmalıdır."
    }

];


let currentQuestion = 0;

let score = 0;

let testStarted = false;

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

        testStarted = true;

        currentQuestion = 0;

        score = 0;

        testStart.style.display =
            "none";

        testArea.classList.add(
            "active"
        );

        testResult.classList.remove(
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
        "show"
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
// CEVABI SEÇ
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

        feedbackTitle.style.color =
            "#18d879";

    }
    else {

        selectedButton.classList.add(
            "wrong"
        );

        feedbackTitle.textContent =
            "✗ YANLIŞ";

        feedbackTitle.style.color =
            "#ff3d55";

    }


    feedbackText.textContent =
        question.explanation;


    answerFeedback.classList.remove(
        "correct",
        "wrong"
    );


    answerFeedback.classList.add(
        selectedIndex === question.answer
            ? "correct"
            : "wrong"
    );


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
// SONRAKİ SORU
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
// TESTİ BİTİR
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
            "Mükemmel! Paragraf konusundaki temel bilgileri çok iyi öğrenmişsin.";

    }
    else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç noktayı tekrar ederek daha da iyi olabilirsin.";

    }
    else {

        resultMessage.textContent =
            "Konu anlatımındaki önemli bölümleri tekrar etmeni öneririm.";

    }


    testResult.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// TESTİ TEKRARLA
// ==========================================

retryTest.addEventListener(
    "click",
    () => {

        currentQuestion = 0;

        score = 0;

        testResult.classList.remove(
            "active"
        );

        testStart.style.display =
            "none";

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