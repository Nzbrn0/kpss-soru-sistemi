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
            "Aşağıdaki turizm merkezi ve il eşleştirmelerinden hangisi doğrudur?",

        options: [
            "Palandöken - Erzurum",
            "Uludağ - Kayseri",
            "Erciyes - Bursa",
            "Kartalkaya - Kars"
        ],

        answer: 0,

        explanation:
            "Palandöken Erzurum'dadır. Uludağ Bursa, Erciyes Kayseri, Kartalkaya ise Bolu'dadır."
    },


    {
        question:
            "Türkiye'de deniz turizminin özellikle Ege ve Akdeniz kıyılarında gelişmesinde aşağıdakilerden hangisi etkilidir?",

        options: [
            "Yazların sıcak ve güneşli olması",
            "Kışların çok uzun olması",
            "Kar örtüsünün uzun süre kalması",
            "Yükseltinin çok fazla olması"
        ],

        answer: 0,

        explanation:
            "Ege ve Akdeniz kıyılarında sıcak ve güneşli yaz koşulları deniz turizminin gelişmesini destekler."
    },


    {
        question:
            "Türkiye'de termal turizmin gelişmiş olmasında aşağıdakilerden hangisi daha doğrudan etkilidir?",

        options: [
            "Fay hatlarının yaygın olması",
            "Kıyı uzunluğunun fazla olması",
            "Akarsuların kısa olması",
            "Ormanların geniş yer kaplaması"
        ],

        answer: 0,

        explanation:
            "Türkiye'nin tektonik açıdan hareketli ve kırıklı yapısı sıcak su kaynaklarının yaygın olmasına katkı sağlar."
    },


    {
        question:
            "Aşağıdaki turizm merkezlerinden hangisi Şanlıurfa'dadır?",

        options: [
            "Efes",
            "Göbeklitepe",
            "Sümela",
            "Troya"
        ],

        answer: 1,

        explanation:
            "Göbeklitepe Şanlıurfa'dadır. Efes İzmir, Sümela Trabzon ve Troya Çanakkale'dedir."
    },


    {
        question:
            "Aşağıdakilerden hangisi turizmin Türkiye ekonomisine sağladığı katkılardan biridir?",

        options: [
            "Döviz gelirlerini artırması",
            "İstihdamı azaltması",
            "Ulaşım faaliyetlerini azaltması",
            "Hizmet sektörünü küçültmesi"
        ],

        answer: 0,

        explanation:
            "Turizm döviz geliri sağlar, istihdam oluşturur ve hizmet sektörünün gelişmesine katkıda bulunur."
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

    nextButton.style.display =
        "none";

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
            "Mükemmel! Türkiye'de Turizm konusunu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Özellikle turizm merkezi-il eşleştirmelerini bir kez daha tekrar et.";

    } else {

        message =
            "Deniz, kış, termal, kültür ve inanç turizmi merkezlerini tekrar et.";

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