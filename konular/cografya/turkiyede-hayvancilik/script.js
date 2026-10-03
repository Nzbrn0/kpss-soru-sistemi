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
            "Erzurum-Kars çevresinde büyükbaş hayvancılığın gelişmesinde aşağıdakilerden hangisi daha etkilidir?",

        options: [
            "Bozkırların geniş yer kaplaması",
            "Çayırların geniş yer kaplaması",
            "Maki bitki örtüsünün yaygın olması",
            "Kışların ılık geçmesi"
        ],

        answer: 1,

        explanation:
            "Erzurum-Kars çevresinde yaz yağışlarının etkisiyle gelişen geniş çayırlar büyükbaş hayvancılık için uygun doğal ortam oluşturur."
    },


    {
        question:
            "Türkiye'de bozkır bitki örtüsüyle en fazla ilişkilendirilen hayvancılık faaliyeti hangisidir?",

        options: [
            "Koyun yetiştiriciliği",
            "Sığır yetiştiriciliği",
            "İpek böcekçiliği",
            "Balıkçılık"
        ],

        answer: 0,

        explanation:
            "Koyun kurak ve yarı kurak alanlardaki kısa boylu bozkır bitkilerine uyum sağlayabildiği için İç Anadolu gibi alanlarda yaygındır."
    },


    {
        question:
            "Aşağıdaki hayvanlardan hangisi Ankara ve çevresiyle özdeşleşmiştir?",

        options: [
            "Kıl keçisi",
            "Tiftik keçisi",
            "Sığır",
            "Manda"
        ],

        answer: 1,

        explanation:
            "Tiftik keçisi Ankara keçisi olarak da bilinir ve Ankara çevresiyle özdeşleşmiştir."
    },


    {
        question:
            "Türkiye'de kümes hayvancılığının büyük şehirlerin çevresinde gelişmesinin temel nedeni aşağıdakilerden hangisidir?",

        options: [
            "Mera alanlarının geniş olması",
            "Yükseltinin fazla olması",
            "Tüketici pazarına yakınlık",
            "Yağış miktarının fazla olması"
        ],

        answer: 2,

        explanation:
            "Kümes hayvancılığında büyük tüketim merkezlerine yakınlık, ulaşım ve yem temini önemli faktörlerdir."
    },


    {
        question:
            "İpek böcekçiliğinin yapılabilmesi için aşağıdaki bitkilerden hangisinin yetişmesi önemlidir?",

        options: [
            "Dut",
            "Çay",
            "Pamuk",
            "Ayçiçeği"
        ],

        answer: 0,

        explanation:
            "İpek böceğinin temel besin kaynağı dut yaprağıdır. Bu nedenle dut yetiştiriciliği ile ipek böcekçiliği yakından ilişkilidir."
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


/* CEVAP KONTROL */

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
            "Mükemmel! Türkiye'de Hayvancılık konusunu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Hayvan türleri ile doğal bitki örtüsü ve bölgeler arasındaki eşleştirmeleri bir kez daha tekrar et.";

    } else {

        message =
            "Özellikle büyükbaş-küçükbaş ayrımını, hayvancılık türlerini ve bölge eşleştirmelerini tekrar et.";

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