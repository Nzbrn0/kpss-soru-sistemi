const sections =
    document.querySelectorAll(".lesson-section");

const coreSections =
    document.querySelectorAll(".core-section");

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");

let openedSections = 0;

const totalSections =
    coreSections.length;


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


        const correctButton =
            [...buttons].find(btn =>
                btn.getAttribute("onclick")?.includes("true")
            );


        if (correctButton) {
            correctButton.classList.add("correct");
        }


        result.textContent =
            "✗ Yanlış cevap. Doğru seçenek yeşil ile gösterildi.";

        result.style.color =
            "#ff3048";

    }

}


/* TEST */

const questions = [

    {
        question:
            "Türkiye Devleti'nin bir Cumhuriyet olduğunu düzenleyen Anayasa maddesi hangisidir?",

        options: [
            "Madde 1",
            "Madde 2",
            "Madde 3",
            "Madde 4"
        ],

        answer: 0,

        explanation:
            "Anayasa'nın 1. maddesi Türkiye Devleti'nin bir Cumhuriyet olduğunu düzenler."
    },


    {
        question:
            "Aşağıdakilerden hangisi Anayasa'nın 2. maddesinde belirtilen Cumhuriyetin niteliklerinden biridir?",

        options: [
            "Federal devlet",
            "Sosyal hukuk devleti",
            "Mutlak monarşi",
            "Teokratik devlet"
        ],

        answer: 1,

        explanation:
            "Türkiye Cumhuriyeti demokratik, laik ve sosyal bir hukuk devletidir."
    },


    {
        question:
            "1982 Anayasası'na göre yasama yetkisi kime aittir?",

        options: [
            "Cumhurbaşkanına",
            "Anayasa Mahkemesine",
            "TBMM'ye",
            "Danıştaya"
        ],

        answer: 2,

        explanation:
            "Anayasa'nın 7. maddesine göre yasama yetkisi Türk Milleti adına TBMM'nindir ve bu yetki devredilemez."
    },


    {
        question:
            "Anayasa değişikliği teklif edilebilmesi için en az kaç milletvekilinin imzası gerekir?",

        options: [
            "100",
            "200",
            "301",
            "360"
        ],

        answer: 1,

        explanation:
            "Anayasa değişikliği TBMM üye tamsayısının en az üçte biri tarafından teklif edilebilir. 600 milletvekilinin üçte biri 200'dür."
    },


    {
        question:
            "Aşağıdaki Anayasa maddelerinden hangisindeki hükümler değiştirilemez ve değiştirilmesi teklif edilemez?",

        options: [
            "1, 2 ve 3. maddeler",
            "1, 2, 3 ve 4. maddelerin tamamı",
            "Yalnızca 1. madde",
            "İlk 10 maddenin tamamı"
        ],

        answer: 0,

        explanation:
            "Anayasa'nın 4. maddesi, 1. maddedeki devlet şekli hükmü ile 2. maddedeki Cumhuriyetin nitelikleri ve 3. madde hükümlerinin değiştirilemeyeceğini ve değiştirilmesinin teklif edilemeyeceğini belirtir."
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

    nextButton.style.display =
        "none";

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
        document.querySelectorAll(
            "#testOptions .test-option"
        );


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


    result.style.display =
        "block";


    let message = "";


    if (score === 5) {

        message =
            "Mükemmel! Anayasa Hukukuna Giriş konusunu çok iyi öğrendin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Özellikle madde numaraları ve anayasa değişikliği sayılarını tekrar et.";

    } else {

        message =
            "1-4 ve 6-11 arasındaki önemli maddeleri ve 200-360 sayılarını tekrar et.";

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