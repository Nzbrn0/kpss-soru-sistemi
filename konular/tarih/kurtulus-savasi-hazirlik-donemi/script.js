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
            "Mustafa Kemal hangi tarihte Samsun'a çıkmıştır?",

        answers: [
            "19 Mayıs 1919",
            "22 Haziran 1919",
            "23 Temmuz 1919",
            "4 Eylül 1919"
        ],

        correct: 0,

        explanation:
            "Mustafa Kemal 19 Mayıs 1919'da Samsun'a çıkmıştır."
    },

    {
        question:
            "Millî Mücadele'nin gerekçesi, amacı ve yöntemi hangi belgede açıklanmıştır?",

        answers: [
            "Havza Genelgesi",
            "Amasya Genelgesi",
            "Erzurum Kongresi",
            "Misak-ı Milli"
        ],

        correct: 1,

        explanation:
            "Amasya Genelgesi, Millî Mücadele'nin gerekçesini, amacını ve yöntemini ortaya koymuştur."
    },

    {
        question:
            "Millî cemiyetler hangi kongrede tek çatı altında birleştirilmiştir?",

        answers: [
            "Erzurum Kongresi",
            "Sivas Kongresi",
            "Amasya Görüşmeleri",
            "Balıkesir Kongresi"
        ],

        correct: 1,

        explanation:
            "Sivas Kongresi'nde millî cemiyetler Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyeti adı altında birleştirilmiştir."
    },

    {
        question:
            "Misak-ı Milli hangi meclis tarafından kabul edilmiştir?",

        answers: [
            "TBMM",
            "Temsil Heyeti",
            "Son Osmanlı Mebusan Meclisi",
            "Meclis-i Ayan"
        ],

        correct: 2,

        explanation:
            "Misak-ı Milli, Son Osmanlı Mebusan Meclisi tarafından 28 Ocak 1920'de kabul edilmiştir."
    },

    {
        question:
            "İstanbul'un resmen işgal edildiği tarih hangisidir?",

        answers: [
            "15 Mayıs 1919",
            "27 Aralık 1919",
            "16 Mart 1920",
            "23 Nisan 1920"
        ],

        correct: 2,

        explanation:
            "İtilaf Devletleri İstanbul'u 16 Mart 1920'de resmen işgal etmiş ve Mebusan Meclisi dağıtılmıştır."
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
            "🔥 Mükemmel! Konunun temel noktalarını çok iyi biliyorsun.";

    } else if (score >= 3) {

        resultMessage.textContent =
            "✓ Gayet iyi. Birkaç noktayı tekrar edersen konu daha da sağlamlaşır.";

    } else {

        resultMessage.textContent =
            "📚 Temel tarih sıralamasını bir kez daha tekrar etmen faydalı olur.";

    }

}


function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";

}