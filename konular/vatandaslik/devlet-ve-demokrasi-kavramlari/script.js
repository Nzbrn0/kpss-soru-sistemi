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
            "Aşağıdakilerden hangisi devletin temel unsurlarından biri değildir?",

        options: [
            "Ülke",
            "Egemenlik",
            "İnsan topluluğu",
            "Siyasi parti"
        ],

        answer: 3,

        explanation:
            "Devletin klasik üç temel unsuru insan topluluğu, ülke ve egemenliktir."
    },


    {
        question:
            "1982 Anayasası'na göre egemenlik kayıtsız şartsız kime aittir?",

        options: [
            "TBMM'ye",
            "Cumhurbaşkanına",
            "Millete",
            "Mahkemelere"
        ],

        answer: 2,

        explanation:
            "Anayasa'nın 6. maddesine göre egemenlik kayıtsız şartsız Milletindir."
    },


    {
        question:
            "Türkiye'nin devlet yapısı aşağıdakilerden hangisidir?",

        options: [
            "Federal",
            "Üniter",
            "Konfederal",
            "Federe"
        ],

        answer: 1,

        explanation:
            "Türkiye üniter devlet yapısına sahiptir."
    },


    {
        question:
            "Halkın egemenliği seçtiği temsilciler aracılığıyla kullandığı demokrasi modeli hangisidir?",

        options: [
            "Doğrudan demokrasi",
            "Temsili demokrasi",
            "Mutlak monarşi",
            "Oligarşi"
        ],

        answer: 1,

        explanation:
            "Temsili demokraside halk egemenliğini seçtiği temsilciler aracılığıyla kullanır."
    },


    {
        question:
            "Aşağıdakilerden hangisi yarı doğrudan demokrasi araçlarından biridir?",

        options: [
            "Referandum",
            "Saltanat",
            "Veraset",
            "Mutlak veto"
        ],

        answer: 0,

        explanation:
            "Referandum, yarı doğrudan demokrasi araçlarının en bilinen örneklerinden biridir."
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


/* SORUYU YÜKLE */

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
            "Mükemmel! Devlet ve Demokrasi Kavramları tamam.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Demokrasi türleri ile üniter-federal devlet ayrımını bir kez daha gözden geçir.";

    } else {

        message =
            "Devletin unsurları, egemenlik ve demokrasi türlerini tekrar et.";

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