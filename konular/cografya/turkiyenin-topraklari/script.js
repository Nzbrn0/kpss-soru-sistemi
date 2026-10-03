const sections =
    document.querySelectorAll(".lesson-section");

const coreSections =
    document.querySelectorAll(".core-section");

let openedSections = 0;

const totalSections =
    coreSections.length;

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");


/* ACCORDION */

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

            return;
        }


        content.classList.add("open");
        arrow.textContent = "−";


        if (
            section.classList.contains("core-section") &&
            !section.dataset.visited
        ) {

            section.dataset.visited = "true";

            openedSections++;

            updateProgress();

        }

    });

});


/* İLERLEME */

function updateProgress() {

    const percentage =
        totalSections === 0
            ? 0
            : Math.round(
                (openedSections / totalSections) * 100
            );


    progressFill.style.width =
        percentage + "%";


    progressText.textContent =
        openedSections + " / " + totalSections;

}


/* MİNİ SORULAR */

function miniAnswer(button, isCorrect) {

    const question =
        button.closest(".mini-question");

    const buttons =
        question.querySelectorAll(".answer-button");

    const result =
        question.querySelector(".mini-result");


    buttons.forEach(btn => {
        btn.disabled = true;
    });


    if (isCorrect) {

        button.classList.add("correct");

        result.textContent =
            "✓ Doğru cevap!";

        result.style.color =
            "#00ff78";

    } else {

        button.classList.add("wrong");

        result.textContent =
            "✗ Yanlış cevap.";

        result.style.color =
            "#ff3048";

    }

}


/* TEST SORULARI */

const questions = [

    {
        question:
            "Akdeniz iklim bölgesinde yaygın olan kırmızı renkli toprak hangisidir?",

        options: [
            "Halomorfik",
            "Terra Rossa",
            "Alüvyal",
            "Podzolik"
        ],

        answer: 1,

        explanation:
            "Terra Rossa, Akdeniz iklim bölgesinde kalkerli araziler üzerinde görülen kırmızı renkli zonal topraktır."
    },


    {
        question:
            "Akarsuların taşıyıp biriktirdiği malzemelerden oluşan toprak hangisidir?",

        options: [
            "Alüvyal",
            "Lös",
            "Moren",
            "Terra Rossa"
        ],

        answer: 0,

        explanation:
            "Akarsuların taşıdığı malzemelerin birikmesiyle alüvyal topraklar oluşur."
    },


    {
        question:
            "Tuz Gölü çevresinde görülmesi beklenen toprak türü hangisidir?",

        options: [
            "Podzolik",
            "Halomorfik",
            "Terra Rossa",
            "Moren"
        ],

        answer: 1,

        explanation:
            "Tuz oranının yüksek olduğu alanlarda halomorfik topraklar gelişir."
    },


    {
        question:
            "Aşağıdakilerden hangisi erozyonu azaltmak için uygulanabilecek yöntemlerden biridir?",

        options: [
            "Eğim yönünde sürüm yapmak",
            "Bitki örtüsünü ortadan kaldırmak",
            "Eğimli alanlarda teraslama yapmak",
            "Aşırı otlatma yapmak"
        ],

        answer: 2,

        explanation:
            "Teraslama eğimin etkisini ve yüzey akışını azaltarak erozyonla mücadeleye yardımcı olur."
    },


    {
        question:
            "Rüzgârların taşıyıp biriktirdiği ince malzemelerden oluşan toprak hangisidir?",

        options: [
            "Moren",
            "Kolüvyal",
            "Alüvyal",
            "Lös"
        ],

        answer: 3,

        explanation:
            "Rüzgârların taşıyıp biriktirdiği ince malzemelerden lösler oluşur."
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;


/* TEST BAŞLAT */

function startTest() {

    currentQuestion = 0;
    score = 0;
    answered = false;


    document.getElementById("testStart")
        .style.display = "none";

    document.getElementById("testArea")
        .style.display = "block";

    document.getElementById("testResult")
        .style.display = "none";


    loadQuestion();

}


/* SORU YÜKLE */

function loadQuestion() {

    answered = false;


    const question =
        questions[currentQuestion];

    const questionCard =
        document.getElementById("questionCard");

    const options =
        document.getElementById("testOptions");

    const feedback =
        document.getElementById("answerFeedback");

    const nextButton =
        document.getElementById("nextButton");


    questionCard.innerHTML = `

        <div class="question-number">
            Soru ${currentQuestion + 1} / ${questions.length}
        </div>

        <div class="question-text">
            ${question.question}
        </div>

    `;


    options.innerHTML = "";


    question.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.className =
            "test-option";

        button.textContent =
            option;


        button.onclick = function () {

            selectAnswer(index, button);

        };


        options.appendChild(button);

    });


    feedback.textContent = "";

    nextButton.style.display = "none";

}


/* CEVAP */

function selectAnswer(index, button) {

    if (answered) {
        return;
    }


    answered = true;


    const question =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".test-option");


    buttons.forEach(btn => {
        btn.disabled = true;
    });


    if (index === question.answer) {

        button.classList.add("correct");

        score++;


        document.getElementById(
            "answerFeedback"
        ).innerHTML = `
            <span style="color:#00ff78">
                ✓ Doğru! ${question.explanation}
            </span>
        `;

    } else {

        button.classList.add("wrong");

        buttons[
            question.answer
        ].classList.add("correct");


        document.getElementById(
            "answerFeedback"
        ).innerHTML = `
            <span style="color:#ff3048">
                ✗ Yanlış. ${question.explanation}
            </span>
        `;

    }


    const nextButton =
        document.getElementById("nextButton");


    nextButton.style.display =
        "inline-block";


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.textContent =
            "Testi Bitir ✓";

    } else {

        nextButton.textContent =
            "Sonraki Soru →";

    }

}


/* SONRAKİ */

function nextQuestion() {

    if (!answered) {
        return;
    }


    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        loadQuestion();

    } else {

        finishTest();

    }

}


/* TEST SONU */

function finishTest() {

    document.getElementById("testArea")
        .style.display = "none";


    const result =
        document.getElementById("testResult");


    result.style.display = "block";


    let message = "";


    if (score === 5) {

        message =
            "Mükemmel! Türkiye'nin toprakları konusunu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Zonal, intrazonal ve azonal toprak ayrımını bir kez daha tekrar et.";

    } else {

        message =
            "Toprak türlerini ve özellikle hangi koşullarda oluştuklarını tekrar et.";

    }


    result.innerHTML = `

        <h3>Test Tamamlandı!</h3>

        <p style="margin-top:15px;">
            ${score} / ${questions.length}
            doğru yaptın.
        </p>

        <p style="margin-top:10px;">
            ${message}
        </p>

    `;

}


/* KONU BİTTİ */

function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";

}