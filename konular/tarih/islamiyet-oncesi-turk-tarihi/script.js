/* =========================================
   İSLAMİYET ÖNCESİ TÜRK TARİHİ
   ETKİLEŞİMLER
========================================= */


/* =========================================
   BÖLÜM / AKORDİYON
========================================= */

const sections = document.querySelectorAll(".lesson-section");

let openedSections = 0;
const totalSections = sections.length;


/* =========================================
   İLERLEME ÇUBUĞU
========================================= */

function updateProgress() {

    const progress =
        Math.round(
            (openedSections / totalSections) * 70
        );

    document.getElementById("progressFill").style.width =
        progress + "%";

    document.getElementById("progressText").textContent =
        "%" + progress;
}


/* =========================================
   AKORDİYON SİSTEMİ
========================================= */

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


            /*
                Bölüm ilk kez açıldığında
                ilerlemeye katkı sağlar.
            */

            if (!section.dataset.visited) {

                section.dataset.visited = "true";

                openedSections++;

                updateProgress();
            }
        }

    });

});


/* =========================================
   MİNİ SORULAR
========================================= */

const miniQuestions =
    document.querySelectorAll(".mini-question");


miniQuestions.forEach(question => {

    const buttons =
        question.querySelectorAll(".answer-button");

    const result =
        question.querySelector(".mini-result");


    buttons.forEach(button => {

        button.addEventListener("click", function () {

            /*
                Aynı soruda tekrar tekrar
                puanlama yapılmasını engelle.
            */

            if (question.dataset.answered === "true") {
                return;
            }

            question.dataset.answered = "true";


            const isCorrect =
                button.dataset.answer === "correct";


            /*
                Tüm butonları kilitle
            */

            buttons.forEach(btn => {
                btn.style.pointerEvents = "none";
            });


            if (isCorrect) {

                button.classList.add("correct");

                result.textContent =
                    "✓ Doğru!";

                result.style.color =
                    "#00ff91";

            } else {

                button.classList.add("wrong");

                result.textContent =
                    "✗ Yanlış! Doğru cevap: " +
                    question.querySelector(
                        '[data-answer="correct"]'
                    ).textContent;

                result.style.color =
                    "#ff5c5c";


                /*
                    Doğru cevabı da göster
                */

                question
                    .querySelector(
                        '[data-answer="correct"]'
                    )
                    .classList.add("correct");
            }

        });

    });

});


/* =========================================
   TEST SORULARI
========================================= */

const testQuestions = [

    {
        question:
            "Türk adını devlet adı olarak kullanan ilk Türk devleti hangisidir?",

        options: [
            "Asya Hun Devleti",
            "Göktürk Devleti",
            "Uygur Devleti",
            "Hazar Devleti"
        ],

        correct: 1,

        explanation:
            "Göktürkler, Türk adını devlet adı olarak kullanan ilk Türk devleti olarak kabul edilir."
    },


    {
        question:
            "Onlu askerî sistem aşağıdaki hükümdarlardan hangisiyle ilişkilendirilir?",

        options: [
            "Mete Han",
            "Bumin Kağan",
            "Bilge Kağan",
            "Kutluk Kağan"
        ],

        correct: 0,

        explanation:
            "Mete Han, orduda onlu teşkilatlanma sisteminin geliştirilmesiyle ilişkilendirilir."
    },


    {
        question:
            "Yerleşik yaşamın gelişmesiyle öne çıkan Türk devleti hangisidir?",

        options: [
            "Asya Hun",
            "Göktürk",
            "Uygur",
            "Avar"
        ],

        correct: 2,

        explanation:
            "Uygurlar yerleşik yaşam, şehirleşme, tarım ve ticaret alanlarındaki gelişmeleriyle öne çıkar."
    },


    {
        question:
            "Aşağıdakilerden hangisi Orhun Yazıtları arasında yer almaz?",

        options: [
            "Kül Tigin Yazıtı",
            "Bilge Kağan Yazıtı",
            "Tonyukuk Yazıtı",
            "Divânu Lügati't-Türk"
        ],

        correct: 3,

        explanation:
            "Divânu Lügati't-Türk, Kaşgarlı Mahmud tarafından 11. yüzyılda yazılmıştır. Orhun Yazıtları arasında değildir."
    },


    {
        question:
            "Türklerde hükümdara devleti yönetme yetkisinin Tanrı tarafından verildiğine inanılmasını ifade eden kavram hangisidir?",

        options: [
            "Töre",
            "Kurultay",
            "Kut",
            "İkili teşkilat"
        ],

        correct: 2,

        explanation:
            "Kut anlayışına göre hükümdarın devleti yönetme yetkisinin Tanrı tarafından verildiğine inanılırdı."
    }

];


/* =========================================
   TEST DEĞİŞKENLERİ
========================================= */

let currentQuestion = 0;
let testScore = 0;
let questionAnswered = false;


/* =========================================
   TEST ELEMENTLERİ
========================================= */

const startTestButton =
    document.getElementById("startTestButton");

const testStart =
    document.querySelector(".test-start");

const testArea =
    document.getElementById("testArea");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const testOptions =
    document.getElementById("testOptions");

const answerFeedback =
    document.getElementById("answerFeedback");

const nextQuestionButton =
    document.getElementById("nextQuestionButton");

const testResult =
    document.getElementById("testResult");

const score =
    document.getElementById("score");

const scoreMessage =
    document.getElementById("scoreMessage");


/* =========================================
   TESTİ BAŞLAT
========================================= */

startTestButton.addEventListener("click", function () {

    currentQuestion = 0;

    testScore = 0;

    questionAnswered = false;


    testStart.style.display = "none";

    testArea.classList.add("active");

    testResult.classList.remove("active");


    loadQuestion();

});


/* =========================================
   SORUYU YÜKLE
========================================= */

function loadQuestion() {

    const question =
        testQuestions[currentQuestion];


    questionAnswered = false;


    questionNumber.textContent =
        `Soru ${currentQuestion + 1} / ${testQuestions.length}`;


    questionText.textContent =
        question.question;


    testOptions.innerHTML = "";

    answerFeedback.textContent = "";

    nextQuestionButton.style.display = "none";


    question.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.className = "test-option";

        button.textContent =
            option;


        button.addEventListener(
            "click",
            function () {

                answerQuestion(
                    button,
                    index
                );

            }
        );


        testOptions.appendChild(button);

    });

}


/* =========================================
   CEVAPLA
========================================= */

function answerQuestion(button, selectedIndex) {

    if (questionAnswered) {
        return;
    }


    questionAnswered = true;


    const question =
        testQuestions[currentQuestion];


    const allOptions =
        testOptions.querySelectorAll(
            ".test-option"
        );


    /*
        Doğru cevabı göster
    */

    allOptions[
        question.correct
    ].classList.add("correct");


    if (selectedIndex === question.correct) {

        testScore++;

        button.classList.add("correct");


        answerFeedback.innerHTML =
            "✓ <strong>Doğru!</strong> " +
            question.explanation;

        answerFeedback.style.color =
            "#00ff91";

    } else {

        button.classList.add("wrong");


        answerFeedback.innerHTML =
            "✗ <strong>Yanlış.</strong> " +
            question.explanation;

        answerFeedback.style.color =
            "#ff7373";
    }


    /*
        Tüm seçenekleri kilitle
    */

    allOptions.forEach(option => {
        option.style.pointerEvents = "none";
    });


    nextQuestionButton.style.display =
        "inline-block";


    if (
        currentQuestion ===
        testQuestions.length - 1
    ) {

        nextQuestionButton.textContent =
            "TESTİ BİTİR →";

    } else {

        nextQuestionButton.textContent =
            "SONRAKİ SORU →";
    }

}


/* =========================================
   SONRAKİ SORU
========================================= */

nextQuestionButton.addEventListener(
    "click",
    function () {

        currentQuestion++;


        if (
            currentQuestion >=
            testQuestions.length
        ) {

            finishTest();

            return;
        }


        loadQuestion();


        /*
            Yeni soruya geçerken
            sayfanın test alanına
            hafifçe kaymasını sağla.
        */

        testArea.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


/* =========================================
   TESTİ BİTİR
========================================= */

function finishTest() {

    testArea.classList.remove("active");

    testResult.classList.add("active");


    score.textContent =
        `${testScore} / ${testQuestions.length}`;


    if (testScore === 5) {

        scoreMessage.textContent =
            "🔥 Mükemmel! Konuyu çok iyi öğrenmişsin.";

    } else if (testScore >= 3) {

        scoreMessage.textContent =
            "✓ Gayet iyi! Birkaç noktayı daha tekrar edebilirsin.";

    } else {

        scoreMessage.textContent =
            "📚 Konuyu bir kez daha gözden geçirmen faydalı olur.";

    }


    testResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================
   KONU BİTTİ
========================================= */

const finishButton =
    document.getElementById("finishButton");


finishButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "../../../index.html?return=subjects";

    }
);


/* =========================================
   BAŞLANGIÇ
========================================= */

updateProgress();
