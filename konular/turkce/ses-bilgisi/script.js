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
// TEST SORULARI
// ==========================================

const questions = [

    {
        question:
            "Aşağıdakilerden hangisi ince ünlülerin tamamını doğru göstermektedir?",

        options: [
            "a - ı - o - u",
            "e - i - ö - ü",
            "a - e - ı - i",
            "o - ö - u - ü",
            "a - e - o - ö"
        ],

        answer: 1,

        explanation:
            "Türkçedeki ince ünlüler e, i, ö ve ü'dür."
    },


    {
        question:
            "\"ağız + ı → ağzı\" sözcüğünde hangi ses olayı vardır?",

        options: [
            "Ünsüz yumuşaması",
            "Ünlü düşmesi",
            "Ünlü türemesi",
            "Ünsüz benzeşmesi",
            "Ünlü daralması"
        ],

        answer: 1,

        explanation:
            "Ağız sözcüğüne ek geldiğinde ikinci hecedeki ı sesi düşmüştür. Bu olay ünlü düşmesidir."
    },


    {
        question:
            "\"başla + yor → başlıyor\" örneğinde hangi ses olayı vardır?",

        options: [
            "Ünsüz düşmesi",
            "Ünsüz yumuşaması",
            "Ünlü daralması",
            "Ünlü düşmesi",
            "Ünsüz türemesi"
        ],

        answer: 2,

        explanation:
            "Başla sözcüğündeki a sesi, -yor ekiyle birlikte ı sesine dönüşmüştür. Bu ünlü daralmasıdır."
    },


    {
        question:
            "Aşağıdakilerden hangisinde ünsüz benzeşmesi vardır?",

        options: [
            "kitabı",
            "ağacı",
            "kitapçı",
            "burnu",
            "arabaya"
        ],

        answer: 2,

        explanation:
            "Kitap sözcüğüne gelen -cı eki, sert ünsüz p'nin etkisiyle -çı biçimine dönüşmüştür."
    },


    {
        question:
            "Aşağıdakilerden hangisi kaynaştırma harflerinden biri değildir?",

        options: [
            "y",
            "ş",
            "s",
            "n",
            "m"
        ],

        answer: 4,

        explanation:
            "Türkçede yaygın olarak kullanılan kaynaştırma harfleri y, ş, s ve n'dir."
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
        "show"
    );


    answerFeedback.classList.remove(
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
// TEST SONUCU
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
            "Mükemmel! Ses bilgisi konusunu çok iyi öğrenmişsin.";

    }
    else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç ses olayını tekrar ederek konuyu pekiştirebilirsin.";

    }
    else {

        resultMessage.textContent =
            "Ses olaylarını tekrar etmen faydalı olacaktır.";

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