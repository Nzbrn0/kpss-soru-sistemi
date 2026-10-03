// ==========================================
// FONKSİYONLAR - KPSS
// ==========================================


// ==========================================
// AKORDİYON
// ==========================================

const sections =
    document.querySelectorAll(".lesson-section");

let openedSections = 0;


function updateProgress() {

    const totalSections =
        sections.length;

    const progress =
        Math.round(
            (openedSections / totalSections) * 70
        );

    document.getElementById("progressFill")
        .style.width = progress + "%";

    document.getElementById("progressText")
        .textContent = progress + "%";
}


sections.forEach(section => {

    const header =
        section.querySelector(".section-header");

    const content =
        section.querySelector(".section-content");

    const arrow =
        section.querySelector(".section-arrow");


    header.addEventListener("click", function () {

        const isOpen =
            content.classList.contains("open");


        if (isOpen) {

            content.classList.remove("open");

            arrow.textContent = "+";

        } else {

            content.classList.add("open");

            arrow.textContent = "−";


            if (!section.dataset.visited) {

                section.dataset.visited = "true";

                openedSections++;

                updateProgress();

            }

        }

    });

});


// ==========================================
// MİNİ SORULAR
// ==========================================

const miniQuestions =
    document.querySelectorAll(".mini-question");


miniQuestions.forEach(question => {

    const buttons =
        question.querySelectorAll(".answer-button");

    const result =
        question.querySelector(".mini-result");


    buttons.forEach(button => {

        button.addEventListener("click", function () {

            buttons.forEach(btn => {
                btn.disabled = true;
            });


            if (
                button.dataset.correct === "true"
            ) {

                button.classList.add("correct");

                result.textContent =
                    "✓ Doğru cevap!";

                result.style.color =
                    "#00d66b";

            } else {

                button.classList.add("wrong");

                result.textContent =
                    "✗ Yanlış cevap!";

                result.style.color =
                    "#ff4040";


                buttons.forEach(btn => {

                    if (
                        btn.dataset.correct === "true"
                    ) {

                        btn.classList.add("correct");

                    }

                });

            }

        });

    });

});


// ==========================================
// TEST SORULARI
// ==========================================

const questions = [

    {
        question:
            "f(x) = 3x + 2 olduğuna göre f(4) kaçtır?",

        answers: [
            "10",
            "12",
            "14",
            "16"
        ],

        correct: 2,

        explanation:
            "x yerine 4 yazılır: f(4) = 3·4 + 2 = 14."
    },


    {
        question:
            "f : A → B bir fonksiyondur. A kümesindeki her eleman için aşağıdakilerden hangisi kesinlikle doğrudur?",

        answers: [
            "İki farklı görüntüsü vardır.",
            "Bir görüntüsü vardır.",
            "Hiç görüntüsü yoktur.",
            "Bütün B elemanlarına gider."
        ],

        correct: 1,

        explanation:
            "Fonksiyon olabilmesi için tanım kümesindeki her elemanın tam olarak bir görüntüsü bulunmalıdır."
    },


    {
        question:
            "f(x) = x + 2 ve g(x) = 3x olduğuna göre (f ∘ g)(2) kaçtır?",

        answers: [
            "6",
            "8",
            "10",
            "12"
        ],

        correct: 1,

        explanation:
            "Önce g(2) = 6 bulunur. Daha sonra f(6) = 8 olur."
    },


    {
        question:
            "5 elemanlı bir kümeden 3 elemanlı bir kümeye kaç farklı fonksiyon tanımlanabilir?",

        answers: [
            "15",
            "125",
            "243",
            "625"
        ],

        correct: 2,

        explanation:
            "5 elemanın her biri 3 farklı elemana gidebilir. Fonksiyon sayısı 3⁵ = 243'tür."
    },


    {
        question:
            "f(x) = 2x + 4 fonksiyonunun tersinde f⁻¹(10) kaçtır?",

        answers: [
            "2",
            "3",
            "4",
            "5"
        ],

        correct: 1,

        explanation:
            "f(x) = 10 için 2x + 4 = 10 → 2x = 6 → x = 3."
    }

];


// ==========================================
// TEST DEĞİŞKENLERİ
// ==========================================

let currentQuestion = 0;

let score = 0;

let answered = false;


// ==========================================
// TEST ELEMENTLERİ
// ==========================================

const testStart =
    document.getElementById("testStart");

const testArea =
    document.getElementById("testArea");

const testResult =
    document.getElementById("testResult");

const startTest =
    document.getElementById("startTest");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const answers =
    document.getElementById("answers");

const answerFeedback =
    document.getElementById("answerFeedback");

const nextQuestion =
    document.getElementById("nextQuestion");

const scoreElement =
    document.getElementById("score");

const resultMessage =
    document.getElementById("resultMessage");

const restartTest =
    document.getElementById("restartTest");


// ==========================================
// TEST BAŞLAT
// ==========================================

startTest.addEventListener("click", function () {

    currentQuestion = 0;

    score = 0;

    testStart.style.display =
        "none";

    testResult.style.display =
        "none";

    testArea.style.display =
        "block";

    showQuestion();

});


// ==========================================
// SORUYU GÖSTER
// ==========================================

function showQuestion() {

    answered = false;


    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        currentQuestion + 1;


    questionText.textContent =
        question.question;


    answers.innerHTML = "";


    answerFeedback.textContent = "";

    answerFeedback.style.color = "";


    nextQuestion.style.display =
        "none";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.className =
                "test-answer";

            button.textContent =
                answer;


            button.addEventListener(
                "click",
                function () {

                    selectAnswer(
                        button,
                        index
                    );

                }
            );


            answers.appendChild(button);

        }
    );

}


// ==========================================
// CEVAP SEÇ
// ==========================================

function selectAnswer(
    button,
    selectedIndex
) {

    if (answered) {
        return;
    }


    answered = true;


    const question =
        questions[currentQuestion];


    const allButtons =
        answers.querySelectorAll(
            ".test-answer"
        );


    allButtons.forEach(btn => {
        btn.disabled = true;
    });


    if (
        selectedIndex === question.correct
    ) {

        button.classList.add("correct");

        score++;


        answerFeedback.textContent =
            "✓ Doğru! " +
            question.explanation;

        answerFeedback.style.color =
            "#00d66b";

    } else {

        button.classList.add("wrong");


        allButtons[
            question.correct
        ].classList.add("correct");


        answerFeedback.textContent =
            "✗ Yanlış. " +
            question.explanation;

        answerFeedback.style.color =
            "#ff4040";

    }


    nextQuestion.style.display =
        "inline-block";

}


// ==========================================
// SONRAKİ SORU
// ==========================================

nextQuestion.addEventListener(
    "click",
    function () {

        currentQuestion++;


        if (
            currentQuestion <
            questions.length
        ) {

            showQuestion();

        } else {

            finishTest();

        }

    }
);


// ==========================================
// TESTİ BİTİR
// ==========================================

function finishTest() {

    testArea.style.display =
        "none";

    testResult.style.display =
        "block";


    scoreElement.textContent =
        score +
        " / " +
        questions.length;


    if (score === 5) {

        resultMessage.textContent =
            "Mükemmel! Fonksiyonlar konusunu çok iyi kavramışsın.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç noktayı tekrar ederek konuyu pekiştirebilirsin.";

    } else {

        resultMessage.textContent =
            "Temel fonksiyon kurallarını tekrar etmen faydalı olacaktır.";

    }

}


// ==========================================
// TESTİ TEKRARLA
// ==========================================

restartTest.addEventListener(
    "click",
    function () {

        currentQuestion = 0;

        score = 0;

        testResult.style.display =
            "none";

        testArea.style.display =
            "block";

        showQuestion();

    }
);


// ==========================================
// KONU BİTTİ
// ==========================================

document
    .getElementById("finishLesson")
    .addEventListener(
        "click",
        function () {

            window.location.href =
                "../../../index.html?return=subjects";

        }
    );


// ==========================================
// TEST ALANI
// ==========================================

testStart.style.display =
    "block";