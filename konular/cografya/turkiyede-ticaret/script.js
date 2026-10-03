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


/* TEST SORULARI */

const questions = [

    {
        question:
            "Bir ülkenin başka ülkelere mal veya hizmet satmasına ne ad verilir?",

        options: [
            "İthalat",
            "İhracat",
            "Transit ticaret",
            "İç ticaret"
        ],

        answer: 1,

        explanation:
            "İhracat dış satım anlamına gelir. Bir ülkenin başka ülkelere mal veya hizmet satmasıdır."
    },


    {
        question:
            "Bir ülkenin ihracatı 180 milyar, ithalatı 230 milyar ise dış ticaret hacmi kaç milyardır?",

        options: [
            "50",
            "180",
            "230",
            "410"
        ],

        answer: 3,

        explanation:
            "Dış ticaret hacmi ihracat ile ithalatın toplamıdır. 180 + 230 = 410 milyardır."
    },


    {
        question:
            "İthalatın ihracattan fazla olması durumunda aşağıdakilerden hangisi oluşur?",

        options: [
            "Dış ticaret fazlası",
            "Dış ticaret açığı",
            "Transit ticaret",
            "İç ticaret fazlası"
        ],

        answer: 1,

        explanation:
            "İthalat ihracattan fazla olduğunda dış ticaret dengesi negatif olur ve dış ticaret açığı meydana gelir."
    },


    {
        question:
            "Türkiye'nin transit ticaret açısından avantajlı olmasında aşağıdakilerden hangisi daha doğrudan etkilidir?",

        options: [
            "Matematik konumu",
            "Özel konumu",
            "Ortalama yükseltisi",
            "Toprak çeşitliliği"
        ],

        answer: 1,

        explanation:
            "Türkiye'nin Avrupa ile Asya arasında ve önemli ulaşım güzergâhları üzerinde bulunması özel konumunun sonucudur."
    },


    {
        question:
            "Aşağıdaki sınır kapısı ve ülke eşleştirmelerinden hangisi doğrudur?",

        options: [
            "Kapıkule - Bulgaristan",
            "Sarp - İran",
            "Gürbulak - Irak",
            "Habur - Gürcistan"
        ],

        answer: 0,

        explanation:
            "Kapıkule Sınır Kapısı Bulgaristan sınırındadır. Sarp Gürcistan, Gürbulak İran, Habur ise Irak bağlantılıdır."
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


/* CEVAP KONTROL */

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


/* SONRAKİ SORU */

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
            "Mükemmel! Türkiye'de Ticaret konusunu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! İhracat-ithalat ve dış ticaret hacmi-denge ayrımını bir kez daha tekrar et.";

    } else {

        message =
            "Özellikle ihracat, ithalat, dış ticaret dengesi, transit ticaret ve sınır kapılarını tekrar et.";

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