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


/* TEST */

const questions = [

    {
        question:
            "Türkiye'de her mevsim yağış görülen temel iklim tipi hangisidir?",

        options: [
            "Akdeniz iklimi",
            "Karadeniz iklimi",
            "Karasal iklim",
            "Step iklimi"
        ],

        answer: 1,

        explanation:
            "Karadeniz ikliminde yılın bütün mevsimlerinde yağış görülür."
    },


    {
        question:
            "İç Anadolu'da ilkbaharda görülen kırkikindi yağışları hangi tür yağıştır?",

        options: [
            "Orografik",
            "Cephe",
            "Konveksiyonel",
            "Muson"
        ],

        answer: 2,

        explanation:
            "Kırkikindi yağışları ısınan havanın yükselmesiyle oluşan konveksiyonel yağışlardır."
    },


    {
        question:
            "Akdeniz ikliminin karakteristik özelliği aşağıdakilerden hangisidir?",

        options: [
            "Her mevsim düzenli yağış",
            "Yazların sıcak ve kurak olması",
            "Kışların çok sert geçmesi",
            "Yazların serin olması"
        ],

        answer: 1,

        explanation:
            "Akdeniz ikliminde yazlar sıcak ve kurak, kışlar ılık ve yağışlıdır."
    },


    {
        question:
            "İç Anadolu'nun karakteristik doğal bitki örtüsü hangisidir?",

        options: [
            "Maki",
            "Orman",
            "Bozkır",
            "Tundra"
        ],

        answer: 2,

        explanation:
            "İç Anadolu'da yağışın az olması nedeniyle bozkır bitki örtüsü yaygındır."
    },


    {
        question:
            "Türkiye'de dağların güneye bakan yamaçlarının daha fazla Güneş enerjisi alması hangi kavramla açıklanır?",

        options: [
            "Karasallık",
            "Bakı",
            "Boylam",
            "Basınç"
        ],

        answer: 1,

        explanation:
            "Türkiye Kuzey Yarım Küre'de bulunduğu için güneye bakan yamaçlar genel olarak bakı avantajına sahiptir."
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
            "Mükemmel! Türkiye'de iklim konusunu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! İklim tipleri ve yağış çeşitlerini bir kez daha tekrar et.";

    } else {

        message =
            "Karadeniz, Akdeniz ve karasal iklim ile yağış türlerini tekrar et.";

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