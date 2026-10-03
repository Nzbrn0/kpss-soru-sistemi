const sections = document.querySelectorAll(".lesson-section");

let openedSections = 0;

const totalSections = 8;

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


            if (!section.dataset.visited) {

                section.dataset.visited = "true";

                if (openedSections < totalSections) {
                    openedSections++;
                }

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
            "Türkiye hangi paraleller arasında bulunmaktadır?",

        options: [
            "26° - 45° Kuzey",
            "36° - 42° Kuzey",
            "36° - 42° Güney",
            "26° - 45° Güney"
        ],

        answer: 1,

        explanation:
            "Türkiye 36°-42° Kuzey paralelleri arasında bulunur."
    },


    {
        question:
            "Türkiye'nin en doğusu ile en batısı arasında kaç dakikalık yerel saat farkı vardır?",

        options: [
            "19 dakika",
            "60 dakika",
            "76 dakika",
            "90 dakika"
        ],

        answer: 2,

        explanation:
            "45° - 26° = 19°. Her meridyen 4 dakika olduğundan 19 × 4 = 76 dakikadır."
    },


    {
        question:
            "Aşağıdakilerden hangisi Türkiye'nin özel konumunun sonucudur?",

        options: [
            "Kuzey Yarım Küre'de bulunması",
            "Doğu ile batı arasında yerel saat farkı olması",
            "İstanbul ve Çanakkale Boğazlarına sahip olması",
            "Güneş ışınlarını dik açıyla almaması"
        ],

        answer: 2,

        explanation:
            "Boğazlara sahip olmak Türkiye'nin özel konumuyla ilgilidir."
    },


    {
        question:
            "Ardışık iki meridyen arasında kaç dakikalık yerel saat farkı vardır?",

        options: [
            "2 dakika",
            "4 dakika",
            "15 dakika",
            "60 dakika"
        ],

        answer: 1,

        explanation:
            "Ardışık iki meridyen arasında 4 dakikalık yerel saat farkı vardır."
    },


    {
        question:
            "Türkiye'de doğuya doğru gidildikçe yerel saat nasıl değişir?",

        options: [
            "Geri kalır",
            "Değişmez",
            "İleri gider",
            "Önce ilerler sonra geriler"
        ],

        answer: 2,

        explanation:
            "Dünya batıdan doğuya döndüğü için doğuda bulunan yerlerin yerel saati daha ileridir."
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


/* SORU */

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


/* TEST SONUCU */

function finishTest() {

    document.getElementById("testArea")
        .style.display = "none";


    const result =
        document.getElementById("testResult");


    result.style.display = "block";


    let message = "";


    if (score === 5) {

        message =
            "Mükemmel! Türkiye'nin coğrafi konumunu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Özellikle koordinatları ve yerel saati bir kez daha tekrar et.";

    } else {

        message =
            "Matematik konum, özel konum ve yerel saat bölümlerini tekrar et.";

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