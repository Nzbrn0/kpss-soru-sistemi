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


/* TEST SORULARI */

const questions = [

    {
        question:
            "Türkiye'nin yüz ölçümü bakımından en büyük coğrafi bölgesi hangisidir?",

        options: [
            "İç Anadolu",
            "Doğu Anadolu",
            "Karadeniz",
            "Akdeniz"
        ],

        answer: 1,

        explanation:
            "Türkiye'nin yüz ölçümü bakımından en büyük coğrafi bölgesi Doğu Anadolu Bölgesi'dir."
    },


    {
        question:
            "Dağların kıyıya dik uzanması nedeniyle kıyı ile iç kesimler arasındaki ulaşımın daha kolay olduğu bölgemiz hangisidir?",

        options: [
            "Karadeniz",
            "Akdeniz",
            "Ege",
            "Doğu Anadolu"
        ],

        answer: 2,

        explanation:
            "Ege Bölgesi'nde dağların kıyıya dik uzanması kıyı ile iç kesimler arasındaki ulaşımı kolaylaştırır."
    },


    {
        question:
            "Çay, fındık, orman ve heyelan özellikleriyle öne çıkan coğrafi bölgemiz hangisidir?",

        options: [
            "Marmara",
            "Karadeniz",
            "İç Anadolu",
            "Güneydoğu Anadolu"
        ],

        answer: 1,

        explanation:
            "Karadeniz Bölgesi bol yağış, geniş ormanlar, çay-fındık üretimi ve heyelan olaylarıyla öne çıkar."
    },


    {
        question:
            "GAP'ın doğrudan ilişkili olduğu coğrafi bölgemiz hangisidir?",

        options: [
            "Ege",
            "Akdeniz",
            "Güneydoğu Anadolu",
            "Marmara"
        ],

        answer: 2,

        explanation:
            "Güneydoğu Anadolu Projesi, Güneydoğu Anadolu Bölgesi'nin kalkınmasına yönelik çok yönlü bir bölgesel gelişme projesidir."
    },


    {
        question:
            "Aşağıdaki bölge ve özellik eşleştirmelerinden hangisi yanlıştır?",

        options: [
            "Marmara - Sanayi faaliyetleri yoğun",
            "İç Anadolu - Bozkır yaygın",
            "Doğu Anadolu - Ortalama yükselti fazla",
            "Ege - Dağlar kıyıya paralel"
        ],

        answer: 3,

        explanation:
            "Ege Bölgesi'nde dağlar kıyıya paralel değil, genel olarak kıyıya dik uzanır."
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
            "Mükemmel! Bölgeler Coğrafyası tamam. Coğrafya konularını bitirdin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Bölgelerin ayırt edici özelliklerini bir kez daha gözden geçir.";

    } else {

        message =
            "7 bölgenin tarım, iklim, yer şekilleri ve ekonomik özelliklerini tekrar et.";

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


/* COĞRAFYA BİTTİ */

function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";

}