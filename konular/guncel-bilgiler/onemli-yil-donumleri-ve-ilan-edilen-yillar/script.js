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
            "2025 yılı Birleşmiş Milletler tarafından aşağıdakilerden hangisinin uluslararası yılı ilan edilmiştir?",

        options: [
            "Kadın Çiftçi",
            "Kuantum Bilimi ve Teknolojisi",
            "Meralar ve Çobanlar",
            "Gönüllüler"
        ],

        answer: 1,

        explanation:
            "2025, Uluslararası Kuantum Bilimi ve Teknolojisi Yılı olarak ilan edilen yıllardan biridir."
    },


    {
        question:
            "2025 yılı aşağıdakilerden hangisinin Uluslararası Yılı olarak ilan edilmiştir?",

        options: [
            "Kooperatifler",
            "Kadın Çiftçi",
            "Meralar ve Çobanlar",
            "Sürdürülebilir Kalkınma için Gönüllüler"
        ],

        answer: 0,

        explanation:
            "Birleşmiş Milletler 2025'i Uluslararası Kooperatifler Yılı ilan etmiştir."
    },


    {
        question:
            "Dünya Buzullar Günü hangi tarihte kutlanmaktadır?",

        options: [
            "21 Mart",
            "22 Nisan",
            "5 Haziran",
            "24 Ekim"
        ],

        answer: 0,

        explanation:
            "21 Mart, 2025'ten itibaren Dünya Buzullar Günü olarak belirlenmiştir."
    },


    {
        question:
            "Uluslararası Kadın Çiftçi Yılı hangi yıldır?",

        options: [
            "2024",
            "2025",
            "2026",
            "2027"
        ],

        answer: 2,

        explanation:
            "Birleşmiş Milletler 2026'yı Uluslararası Kadın Çiftçi Yılı ilan etmiştir."
    },


    {
        question:
            "2026 Uluslararası Meralar ve Çobanlar Yılı'nın öncü BM kuruluşu hangisidir?",

        options: [
            "UNESCO",
            "WHO",
            "FAO",
            "ILO"
        ],

        answer: 2,

        explanation:
            "2026 Uluslararası Meralar ve Çobanlar Yılı'nın uygulanmasında FAO öncü BM kuruluşudur."
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
    nextButton.style.display = "none";
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
            "Mükemmel! İlan edilen yıllar tamam.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! 2025 ve 2026 eşleştirmelerini bir kez daha gözden geçir.";

    } else {

        message =
            "2025 ve 2026 uluslararası yıllarını tekrar çalış.";
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