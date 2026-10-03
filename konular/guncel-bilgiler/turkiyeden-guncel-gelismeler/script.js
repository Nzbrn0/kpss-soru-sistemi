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
            "Türkiye'nin ilk yerli ve millî haberleşme uydusu hangisidir?",

        options: [
            "İMECE",
            "TÜRKSAT 5A",
            "TÜRKSAT 6A",
            "Göktürk-1"
        ],

        answer: 2,

        explanation:
            "TÜRKSAT 6A, Türkiye'nin ilk yerli ve millî haberleşme uydusudur."
    },


    {
        question:
            "Türkiye'nin ilk yerli atomik saatinin adı aşağıdakilerden hangisidir?",

        options: [
            "RAFS",
            "İMECE",
            "AYAP",
            "TÜRKSAT"
        ],

        answer: 0,

        explanation:
            "Rubidyum Atomik Frekans Standardı'nın kısa adı RAFS'tır."
    },


    {
        question:
            "Türkiye'nin ilk Ay Uzay Aracı'nı geliştiren kurum hangisidir?",

        options: [
            "TÜBİTAK UZAY",
            "TÜİK",
            "YÖK",
            "AFAD"
        ],

        answer: 0,

        explanation:
            "Ay Araştırma Programı kapsamında uzay aracı TÜBİTAK UZAY tarafından geliştirilmektedir."
    },


    {
        question:
            "2025 yılında UNESCO Dünya Miras Listesi'ne giren Sardes Antik Kenti ve Bin Tepeler Lidya Tümülüsleri hangi ilimizdedir?",

        options: [
            "Gaziantep",
            "Manisa",
            "Ankara",
            "Konya"
        ],

        answer: 1,

        explanation:
            "Sardes Antik Kenti ve Bin Tepeler Lidya Tümülüsleri Manisa'dadır."
    },


    {
        question:
            "Türkiye Artemis Mutabakatı'nın kaçıncı imzacısı olmuştur?",

        options: [
            "51.",
            "61.",
            "71.",
            "81."
        ],

        answer: 2,

        explanation:
            "Türkiye 2026 yılında Artemis Mutabakatı'nın 71. imzacısı olmuştur."
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
            "Mükemmel! Türkiye'deki güncel gelişmeleri çok iyi öğrendin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Özellikle kurum ve ilk olma özelliklerini tekrar et.";

    } else {

        message =
            "TÜRKSAT 6A, RAFS, Ay görevi ve UNESCO gelişmelerini tekrar et.";
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