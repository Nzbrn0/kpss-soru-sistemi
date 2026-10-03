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
            "Türkiye'de çay tarımı en çok hangi alanla özdeşleşmiştir?",

        options: [
            "Trakya",
            "Doğu Karadeniz",
            "İç Anadolu",
            "Güneydoğu Anadolu"
        ],

        answer: 1,

        explanation:
            "Çay yüksek nem ve yıl boyunca yağış ister. Türkiye'de özellikle Rize ve çevresindeki Doğu Karadeniz kıyılarında yetiştirilir."
    },


    {
        question:
            "Nadas uygulamasının temel amacı aşağıdakilerden hangisidir?",

        options: [
            "Toprakta su biriktirmek",
            "Toprağın yükseltisini azaltmak",
            "Don olaylarını artırmak",
            "Tarım alanlarını küçültmek"
        ],

        answer: 0,

        explanation:
            "Nadas, özellikle kurak ve yarı kurak alanlarda toprağın su biriktirmesi amacıyla bir süre ekilmeden bırakılmasıdır."
    },


    {
        question:
            "Aşağıdaki ürünlerden hangisi Türkiye'de Trakya ile özdeşleşmiştir?",

        options: [
            "Çay",
            "Muz",
            "Ayçiçeği",
            "Fındık"
        ],

        answer: 2,

        explanation:
            "Ayçiçeği üretiminde Trakya Türkiye'nin öne çıkan alanlarından biridir."
    },


    {
        question:
            "Aşağıdakilerden hangisi sulama olanaklarının gelişmesinin beklenen sonuçlarından biri değildir?",

        options: [
            "Ürün çeşitliliğinin artması",
            "Nadas alanlarının azalması",
            "Verimin artması",
            "Kuraklığın tamamen ortadan kalkması"
        ],

        answer: 3,

        explanation:
            "Sulama tarımsal kuraklığın etkisini azaltabilir ancak iklimsel kuraklığı tamamen ortadan kaldırmaz."
    },


    {
        question:
            "Birim alandan yüksek verim elde etmeyi amaçlayan modern tarım yöntemine ne ad verilir?",

        options: [
            "Ekstansif tarım",
            "Nadas",
            "İntansif tarım",
            "Kuru tarım"
        ],

        answer: 2,

        explanation:
            "İntansif tarımda modern yöntemler kullanılarak birim alandan yüksek verim alınması amaçlanır."
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


    result.style.display =
        "block";


    let message = "";


    if (score === 5) {

        message =
            "Mükemmel! Türkiye'de Tarım konusunu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Tarım ürünlerinin yetişme alanlarını bir kez daha tekrar et.";

    } else {

        message =
            "Özellikle ürün-bölge eşleştirmelerini, nadası ve sulamanın sonuçlarını tekrar et.";

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