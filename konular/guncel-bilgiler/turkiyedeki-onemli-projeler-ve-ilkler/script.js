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
            "Türkiye'nin ilk yerli ve millî hızlı treni hangi kurum tarafından geliştirilmiştir?",

        options: [
            "TUSAŞ",
            "TÜRASAŞ",
            "ASELSAN",
            "ROKETSAN"
        ],

        answer: 1,

        explanation:
            "Türkiye'nin ilk yerli ve millî hızlı treni TÜRASAŞ tarafından geliştirilmiştir."
    },


    {
        question:
            "KAAN'ın ilk uçuş tarihi hangisidir?",

        options: [
            "25 Nisan 2023",
            "21 Şubat 2024",
            "14 Aralık 2022",
            "29 Ekim 2024"
        ],

        answer: 1,

        explanation:
            "KAAN ilk uçuşunu 21 Şubat 2024 tarihinde gerçekleştirmiştir."
    },


    {
        question:
            "Türkiye'nin ilk insansız savaş uçağı hangisidir?",

        options: [
            "HÜRJET",
            "ANKA",
            "KIZILELMA",
            "KAAN"
        ],

        answer: 2,

        explanation:
            "Baykar tarafından geliştirilen KIZILELMA Türkiye'nin ilk insansız savaş uçağıdır."
    },


    {
        question:
            "Togg'un T10X'ten sonra satışa sunduğu ikinci modeli hangisidir?",

        options: [
            "T10F",
            "T8X",
            "T10S",
            "T12F"
        ],

        answer: 0,

        explanation:
            "Togg'un ikinci modeli T10F, 2025 yılında Türkiye'de satışa sunulmuştur."
    },


    {
        question:
            "Türkiye'nin ilk nükleer güç santrali projesi hangisidir?",

        options: [
            "Sinop NGS",
            "Trakya NGS",
            "Akkuyu NGS",
            "Keban NGS"
        ],

        answer: 2,

        explanation:
            "Mersin Gülnar'daki Akkuyu NGS Türkiye'nin ilk nükleer güç santrali projesidir."
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
            "Mükemmel! Türkiye'nin önemli projeleri tamam.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Proje–kurum eşleştirmelerini bir kez daha tekrar et.";

    } else {

        message =
            "TÜRASAŞ, TUSAŞ, Baykar, Togg ve Akkuyu eşleştirmelerini tekrar çalış.";
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