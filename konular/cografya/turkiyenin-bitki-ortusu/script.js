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

        } else {

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

        }

    });

});


/* İLERLEME */

function updateProgress() {

    const percentage =
        (openedSections / totalSections) * 100;


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
            "İç Anadolu'nun karakteristik doğal bitki örtüsü hangisidir?",

        options: [
            "Maki",
            "Bozkır",
            "Çayır",
            "Psödomaki"
        ],

        answer: 1,

        explanation:
            "İç Anadolu'da yağışın az olması nedeniyle bozkır bitki örtüsü yaygındır."
    },


    {
        question:
            "Akdeniz ikliminin karakteristik çalı topluluğu hangisidir?",

        options: [
            "Çayır",
            "Bozkır",
            "Maki",
            "Tundra"
        ],

        answer: 2,

        explanation:
            "Maki, Akdeniz iklim koşullarına uyum sağlamış çalı topluluğudur."
    },


    {
        question:
            "Erzurum-Kars çevresinde yaygın olan doğal bitki örtüsü hangisidir?",

        options: [
            "Maki",
            "Çayır",
            "Bozkır",
            "Psödomaki"
        ],

        answer: 1,

        explanation:
            "Yüksek, serin ve yaz yağışlarının görülebildiği Erzurum-Kars çevresinde çayırlar yaygındır."
    },


    {
        question:
            "Nemli bölgelerde ormanların tahrip edilmesiyle oluşan çalı topluluğuna ne ad verilir?",

        options: [
            "Bozkır",
            "Garig",
            "Psödomaki",
            "Çayır"
        ],

        answer: 2,

        explanation:
            "Nemli bölgelerde ormanların tahrip edildiği alanlarda gelişen çalı topluluklarına psödomaki denir."
    },


    {
        question:
            "Aşağıdakilerden hangisi bozkır bitki örtüsünün özelliklerinden biridir?",

        options: [
            "Yıl boyunca yeşil kalması",
            "Yalnızca kıyılarda görülmesi",
            "İlkbaharda yeşerip yazın sararması",
            "Çok yüksek yağış istemesi"
        ],

        answer: 2,

        explanation:
            "Bozkırlar ilkbahar yağışlarıyla yeşerir ve yaz kuraklığıyla sararır."
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;


/* TESTİ BAŞLAT */

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


/* CEVAP SEÇ */

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


    result.style.display = "block";


    let message = "";


    if (score === 5) {

        message =
            "Mükemmel! Türkiye'nin bitki örtüsünü çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Maki, psödomaki, bozkır ve çayır ayrımını bir kez daha tekrar et.";

    } else {

        message =
            "Bitki topluluklarının özelliklerini ve görüldükleri bölgeleri tekrar et.";

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