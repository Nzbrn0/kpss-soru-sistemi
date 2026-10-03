// ==========================================
// KOMBİNASYON - KPSS
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
            "C(5,2) kaçtır?",

        answers: [
            "5",
            "10",
            "15",
            "20"
        ],

        correct: 1,

        explanation:
            "C(5,2) = 5! / (2! × 3!) = 10."
    },


    {
        question:
            "6 kişiden 3 kişi kaç farklı şekilde seçilebilir?",

        answers: [
            "15",
            "18",
            "20",
            "30"
        ],

        correct: 2,

        explanation:
            "C(6,3) = 6! / (3! × 3!) = 20."
    },


    {
        question:
            "C(8,2) aşağıdakilerden hangisine eşittir?",

        answers: [
            "C(8,3)",
            "C(8,4)",
            "C(8,5)",
            "C(8,6)"
        ],

        correct: 3,

        explanation:
            "C(n,r) = C(n,n−r) olduğundan C(8,2) = C(8,6)."
    },


    {
        question:
            "7 kişiden 3 kişilik bir ekip oluşturulacaktır. Ali kesinlikle ekipte olacaktır. Kaç farklı ekip oluşturulabilir?",

        answers: [
            "10",
            "15",
            "20",
            "35"
        ],

        correct: 2,

        explanation:
            "Ali sabit olduğundan kalan 6 kişiden 2 kişi seçilir. C(6,2) = 15."
    },


    {
        question:
            "5 erkek ve 4 kadından 3 kişilik bir ekip oluşturulacaktır. En az 1 kadın bulunması gereken kaç farklı ekip vardır?",

        answers: [
            "64",
            "70",
            "74",
            "84"
        ],

        correct: 2,

        explanation:
            "Toplam C(9,3)=84. Hiç kadın olmayan ekipler C(5,3)=10. 84−10=74."
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
            "Mükemmel! Kombinasyon konusunu çok iyi kavramışsın.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç noktayı tekrar ederek konuyu pekiştirebilirsin.";

    } else {

        resultMessage.textContent =
            "Kombinasyon formülünü ve permütasyon-kombinasyon farkını tekrar etmen faydalı olacaktır.";

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
// TEST BAŞLANGIÇTA GÖRÜNSÜN
// ==========================================

testStart.style.display =
    "block";