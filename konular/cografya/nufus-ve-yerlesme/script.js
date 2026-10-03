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


/* TEST SORULARI */

const questions = [

    {
        question:
            "Toplam nüfusun toplam yüz ölçümüne bölünmesiyle hangi nüfus yoğunluğu hesaplanır?",

        options: [
            "Fizyolojik nüfus yoğunluğu",
            "Tarımsal nüfus yoğunluğu",
            "Aritmetik nüfus yoğunluğu",
            "Ekonomik nüfus yoğunluğu"
        ],

        answer: 2,

        explanation:
            "Aritmetik nüfus yoğunluğu, toplam nüfusun toplam yüz ölçümüne bölünmesiyle hesaplanır."
    },


    {
        question:
            "Toplam nüfusun tarım alanlarının yüz ölçümüne bölünmesiyle hangi nüfus yoğunluğu hesaplanır?",

        options: [
            "Aritmetik",
            "Fizyolojik",
            "Tarımsal",
            "Kentsel"
        ],

        answer: 1,

        explanation:
            "Fizyolojik nüfus yoğunluğu, toplam nüfusun tarım alanlarına bölünmesiyle hesaplanır."
    },


    {
        question:
            "Türkiye'de dağınık kırsal yerleşmenin yaygın olduğu alan aşağıdakilerden hangisidir?",

        options: [
            "Konya çevresi",
            "Doğu Karadeniz",
            "Güneydoğu Anadolu",
            "Tuz Gölü çevresi"
        ],

        answer: 1,

        explanation:
            "Doğu Karadeniz'de engebeli arazi, bol su kaynakları ve parçalı tarım alanları dağınık yerleşmeyi destekler."
    },


    {
        question:
            "Aşağıdakilerden hangisi nüfusun dağılışını etkileyen beşerî faktörlerden biridir?",

        options: [
            "Yükselti",
            "İklim",
            "Sanayi",
            "Yer şekilleri"
        ],

        answer: 2,

        explanation:
            "Sanayi beşerî bir faktördür ve iş olanakları oluşturarak nüfusun belirli alanlarda yoğunlaşmasını sağlayabilir."
    },


    {
        question:
            "Aşağıdakilerden hangisi kırsal alanlardan kentlere göçü artırabilecek faktörlerden biridir?",

        options: [
            "Kentlerde iş olanaklarının artması",
            "Kırsal alanlarda iş olanaklarının artması",
            "Kırsal nüfusun tamamen ortadan kalkması",
            "Yer şekillerinin düzleşmesi"
        ],

        answer: 0,

        explanation:
            "Kentlerde sanayi ve hizmet sektörlerinin gelişmesiyle iş olanaklarının artması kırsaldan kente göçü teşvik edebilir."
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
            "Mükemmel! Nüfus ve Yerleşme konusunu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Özellikle nüfus yoğunluğu türleri ile yerleşme tiplerini bir kez daha tekrar et.";

    } else {

        message =
            "Nüfus yoğunluğu formüllerini, göçleri ve yerleşme tiplerini tekrar et.";

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