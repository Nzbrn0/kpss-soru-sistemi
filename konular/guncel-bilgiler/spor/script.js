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
            "2026 FIFA Dünya Kupası'nı hangi ülke kazanmıştır?",

        options: [
            "Arjantin",
            "İspanya",
            "Fransa",
            "İngiltere"
        ],

        answer: 1,

        explanation:
            "İspanya, finalde Arjantin'i uzatmada 1-0 yenerek 2026 Dünya Kupası'nı kazandı."
    },


    {
        question:
            "2026 FIFA Dünya Kupası aşağıdaki hangi üç ülkenin ortak ev sahipliğinde düzenlenmiştir?",

        options: [
            "ABD - Kanada - Meksika",
            "İspanya - Portekiz - Fransa",
            "ABD - Brezilya - Kanada",
            "Meksika - Arjantin - ABD"
        ],

        answer: 0,

        explanation:
            "2026 FIFA Dünya Kupası ABD, Kanada ve Meksika'nın ortak ev sahipliğinde düzenlendi."
    },


    {
        question:
            "FIBA EuroBasket 2025'i Türkiye hangi sırada tamamlamıştır?",

        options: [
            "Şampiyon",
            "İkinci",
            "Üçüncü",
            "Dördüncü"
        ],

        answer: 1,

        explanation:
            "Türkiye finalde Almanya'ya 88-83 yenilerek EuroBasket 2025'i ikinci tamamladı."
    },


    {
        question:
            "2025 FIVB Kadınlar Dünya Şampiyonası'nda Türkiye'nin derecesi nedir?",

        options: [
            "Dünya şampiyonu",
            "Dünya ikincisi",
            "Dünya üçüncüsü",
            "Dünya dördüncüsü"
        ],

        answer: 1,

        explanation:
            "Filenin Sultanları tarihinde ilk kez finale çıkarak 2025 Dünya Şampiyonası'nı ikinci tamamladı."
    },


    {
        question:
            "2026 FIFA Dünya Kupası'nda Altın Top ödülünü kim kazanmıştır?",

        options: [
            "Kylian Mbappé",
            "Lionel Messi",
            "Rodri",
            "Lamine Yamal"
        ],

        answer: 2,

        explanation:
            "Turnuvanın en iyi oyuncusuna verilen Altın Top ödülünü İspanyol orta saha Rodri kazandı."
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;


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
            "Mükemmel! Güncel spor bilgileri tamam.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Dünya Kupası ve Türkiye'nin ikinciliklerini tekrar et.";

    } else {

        message =
            "Şampiyon–organizasyon–Türkiye derecesi eşleştirmelerini tekrar çalış.";
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


function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";
}