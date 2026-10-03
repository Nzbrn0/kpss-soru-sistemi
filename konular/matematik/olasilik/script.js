// ==========================================
// OLASILIK - KPSS
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
            "Bir zar atıldığında çift sayı gelme olasılığı kaçtır?",

        answers: [
            "1 / 6",
            "1 / 3",
            "1 / 2",
            "2 / 3"
        ],

        correct: 2,

        explanation:
            "Çift sayılar 2, 4 ve 6'dır. 3 / 6 = 1 / 2."
    },


    {
        question:
            "Bir zar atıldığında 5 gelmeme olasılığı kaçtır?",

        answers: [
            "1 / 6",
            "1 / 3",
            "2 / 3",
            "5 / 6"
        ],

        correct: 3,

        explanation:
            "5 gelme olasılığı 1/6 olduğundan, gelmeme olasılığı 1−1/6 = 5/6."
    },


    {
        question:
            "Bir madeni para iki kez atılıyor. İki atışta da yazı gelme olasılığı kaçtır?",

        answers: [
            "1 / 2",
            "1 / 3",
            "1 / 4",
            "1 / 8"
        ],

        correct: 2,

        explanation:
            "Atışlar bağımsızdır. 1/2 × 1/2 = 1/4."
    },


    {
        question:
            "Bir torbada 3 kırmızı ve 2 mavi top vardır. Geri koymadan iki top çekiliyor. İkisinin de kırmızı olma olasılığı kaçtır?",

        answers: [
            "1 / 5",
            "3 / 10",
            "2 / 5",
            "1 / 2"
        ],

        correct: 1,

        explanation:
            "İlk kırmızı 3/5, ikinci kırmızı 2/4. Çarpılır: 3/5 × 2/4 = 3/10."
    },


    {
        question:
            "Bir zar atıldığında 1 veya 6 gelme olasılığı kaçtır?",

        answers: [
            "1 / 6",
            "1 / 3",
            "1 / 2",
            "2 / 3"
        ],

        correct: 1,

        explanation:
            "İstenen iki sonuç vardır: 1 ve 6. Bu nedenle 2/6 = 1/3."
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
            "Mükemmel! Olasılık konusunu çok iyi kavramışsın.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç noktayı tekrar ederek konuyu pekiştirebilirsin.";

    } else {

        resultMessage.textContent =
            "Olasılık formüllerini ve temel mantığı tekrar etmen faydalı olacaktır.";

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