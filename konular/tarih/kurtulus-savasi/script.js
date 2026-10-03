const sections = document.querySelectorAll(".lesson-section");

let openedSections = 0;
const totalSections = 8;

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");


sections.forEach(section => {

    const header = section.querySelector(".section-header");
    const content = section.querySelector(".section-content");
    const arrow = section.querySelector(".section-arrow");

    header.addEventListener("click", function () {

        const isOpen = content.classList.contains("open");

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


function updateProgress() {

    const percentage =
        (openedSections / totalSections) * 100;

    progressFill.style.width =
        percentage + "%";

    progressText.textContent =
        openedSections + " / " + totalSections;
}


function miniAnswer(button, correct) {

    const question =
        button.closest(".mini-question");

    const buttons =
        question.querySelectorAll(".answer-button");

    const result =
        question.querySelector(".mini-result");

    buttons.forEach(btn => {
        btn.disabled = true;
    });


    if (correct) {

        button.classList.add("correct");

        result.textContent =
            "✓ Doğru!";

        result.style.color =
            "#00dc78";

    } else {

        button.classList.add("wrong");

        result.textContent =
            "✗ Yanlış! Doğru cevap diğer seçenektir.";

        result.style.color =
            "#ff5060";

        buttons.forEach(btn => {

            if (btn !== button) {
                btn.classList.add("correct");
            }

        });
    }
}


/* TEST */

const questions = [

    {
        question:
            "Kurtuluş Savaşı'nda düzenli ordunun ilk başarısı hangisidir?",

        answers: [
            "Sakarya Meydan Muharebesi",
            "I. İnönü Savaşı",
            "Büyük Taarruz",
            "II. İnönü Savaşı"
        ],

        correct: 1,

        explanation:
            "Düzenli ordunun Batı Cephesi'ndeki ilk başarısı I. İnönü Savaşı'dır."
    },

    {
        question:
            "Doğu Cephesi'nde hangi devlete karşı mücadele edilmiştir?",

        answers: [
            "Yunanistan",
            "Fransa",
            "Ermenistan",
            "İtalya"
        ],

        correct: 2,

        explanation:
            "Doğu Cephesi'nde Ermenistan'a karşı mücadele edilmiş ve Gümrü Antlaşması imzalanmıştır."
    },

    {
        question:
            "Sakarya Meydan Muharebesi'nin tarihi hangisidir?",

        answers: [
            "6-10 Ocak 1921",
            "23 Mart-1 Nisan 1921",
            "23 Ağustos-13 Eylül 1921",
            "26 Ağustos-9 Eylül 1922"
        ],

        correct: 2,

        explanation:
            "Sakarya Meydan Muharebesi 23 Ağustos-13 Eylül 1921 tarihleri arasında gerçekleşmiştir."
    },

    {
        question:
            "Büyük Taarruz hangi tarihte başlamıştır?",

        answers: [
            "30 Ağustos 1922",
            "26 Ağustos 1922",
            "9 Eylül 1922",
            "11 Ekim 1922"
        ],

        correct: 1,

        explanation:
            "Büyük Taarruz 26 Ağustos 1922'de başlamıştır."
    },

    {
        question:
            "Kurtuluş Savaşı'nın askerî aşamasını sona erdiren gelişme hangisidir?",

        answers: [
            "Lozan Antlaşması",
            "Gümrü Antlaşması",
            "Ankara Antlaşması",
            "Mudanya Ateşkes Antlaşması"
        ],

        correct: 3,

        explanation:
            "Mudanya Ateşkes Antlaşması ile Kurtuluş Savaşı'nın askerî aşaması sona ermiştir."
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;


function startTest() {

    currentQuestion = 0;
    score = 0;

    document.getElementById("testStart").style.display =
        "none";

    document.getElementById("testArea").style.display =
        "block";

    document.getElementById("testResult").style.display =
        "none";

    loadQuestion();
}


function loadQuestion() {

    answered = false;

    const question =
        questions[currentQuestion];

    document.getElementById("questionNumber")
        .textContent =
        "SORU " +
        (currentQuestion + 1) +
        " / " +
        questions.length;

    document.getElementById("questionText")
        .textContent =
        question.question;

    const container =
        document.getElementById("answerContainer");

    container.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className =
            "test-answer";

        button.textContent =
            answer;

        button.onclick = function () {

            selectAnswer(index, button);

        };

        container.appendChild(button);
    });


    const feedback =
        document.getElementById("answerFeedback");

    feedback.style.display =
        "none";

    feedback.textContent =
        "";

    document.getElementById("nextButton")
        .style.display =
        "none";
}


function selectAnswer(index, button) {

    if (answered) {
        return;
    }

    answered = true;

    const question =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".test-answer");

    buttons.forEach(btn => {
        btn.disabled = true;
    });


    if (index === question.correct) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

        buttons[question.correct]
            .classList.add("correct");
    }


    const feedback =
        document.getElementById("answerFeedback");

    feedback.style.display =
        "block";

    feedback.textContent =
        question.explanation;


    document.getElementById("nextButton")
        .style.display =
        "inline-block";
}


function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        finishTest();
    }
}


function finishTest() {

    document.getElementById("testArea")
        .style.display =
        "none";

    document.getElementById("testResult")
        .style.display =
        "block";

    document.getElementById("scoreText")
        .textContent =
        score + " / " + questions.length;


    const resultMessage =
        document.getElementById("resultMessage");


    if (score === 5) {

        resultMessage.textContent =
            "🔥 Mükemmel! Kurtuluş Savaşı'nın temel aşamalarını çok iyi biliyorsun.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "✓ Gayet iyi. Savaşların sırasını bir kez daha tekrar edersen daha sağlam olur.";

    } else {

        resultMessage.textContent =
            "📚 Cepheleri, savaşları ve tarih sıralamasını tekrar etmen faydalı olur.";
    }
}


function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";
}