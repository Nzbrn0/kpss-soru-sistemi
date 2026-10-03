/* =========================================================
OSMANLI TARİHİ
KPSS KONU ANLATIMI
========================================================= */

/* =========================================================
ACCORDION
========================================================= */

const sections = document.querySelectorAll(".lesson-section");

let openedSections = 0;

const totalSections = sections.length;

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

            openedSections++;

            updateProgress();

        }

    }

});


});

/* =========================================================
PROGRESS
========================================================= */

function updateProgress() {


const progress =
    Math.round(
        (openedSections / totalSections) * 70
    );


document.getElementById("progressFill")
    .style.width = `${progress}%`;


document.getElementById("progressText")
    .textContent = `%${progress}`;


}

/* =========================================================
MINI SORULAR
========================================================= */

function checkMini(button, correct) {


const question =
    button.closest(".mini-question");

const buttons =
    question.querySelectorAll(".answer-button");

const result =
    question.querySelector(".mini-result");


if (question.dataset.answered === "true") {
    return;
}


question.dataset.answered = "true";


buttons.forEach(btn => {

    btn.disabled = true;

    const isCorrect =
        btn.dataset.correct === "true";


    if (isCorrect) {

        btn.classList.add("correct");

    }

});


if (correct) {

    button.classList.add("correct");

    result.innerHTML =
        "✓ Doğru! Güzel gidiyorsun.";

    result.style.color = "#00dc78";

} else {

    button.classList.add("wrong");

    result.innerHTML =
        "✗ Yanlış. Doğru cevap yeşil renkte gösterildi.";

    result.style.color = "#ff6877";

}


}

/* =========================================================
TEST
========================================================= */

const questions = [


{
    question:
        "Osmanlı Devleti'nin kurucusu aşağıdakilerden hangisidir?",

    options: [
        "Orhan Bey",
        "Osman Bey",
        "I. Murat",
        "Yıldırım Bayezid"
    ],

    correct: 1,

    explanation:
        "Osman Bey, Osmanlı Beyliği'nin kurucusudur."
},


{
    question:
        "Osmanlı Devleti'nin Rumeli'ye geçişinde önemli rol oynayan gelişme aşağıdakilerden hangisidir?",

    options: [
        "İstanbul'un Fethi",
        "Çimpe Kalesi'nin alınması",
        "Ankara Savaşı",
        "Niğbolu Savaşı"
    ],

    correct: 1,

    explanation:
        "Orhan Bey döneminde Çimpe Kalesi'nin alınması Osmanlı'nın Rumeli'deki ilerleyişinde önemli bir başlangıç olmuştur."
},


{
    question:
        "1402 Ankara Savaşı'nın ardından başlayan dönem hangisidir?",

    options: [
        "Lale Devri",
        "Fetret Devri",
        "Tanzimat Dönemi",
        "Meşrutiyet Dönemi"
    ],

    correct: 1,

    explanation:
        "1402 Ankara Savaşı sonrasında Yıldırım Bayezid'in oğulları arasında taht mücadeleleri başlamış ve Fetret Devri yaşanmıştır."
},


{
    question:
        "1071 Malazgirt Savaşı'nın Osmanlı Devleti ile doğrudan ilişkisi var mıdır?",

    options: [
        "Evet, savaşı Osmanlı kazanmıştır.",
        "Evet, Fatih döneminde yapılmıştır.",
        "Hayır, Büyük Selçuklu döneminde gerçekleşmiştir.",
        "Evet, Orhan Bey döneminde gerçekleşmiştir."
    ],

    correct: 2,

    explanation:
        "1071 Malazgirt Savaşı Osmanlı Devleti'nden önce, Büyük Selçuklu hükümdarı Alp Arslan döneminde gerçekleşmiştir."
},


{
    question:
        "İstanbul hangi padişah döneminde fethedilmiştir?",

    options: [
        "II. Murat",
        "Yıldırım Bayezid",
        "I. Murat",
        "Fatih Sultan Mehmet"
    ],

    correct: 3,

    explanation:
        "İstanbul, 1453 yılında Fatih Sultan Mehmet tarafından fethedilmiştir."
}


];

let currentQuestion = 0;

let score = 0;

let questionAnswered = false;

/* =========================================================
TEST BAŞLAT
========================================================= */

function startTest() {


currentQuestion = 0;

score = 0;

questionAnswered = false;


document.getElementById("testStart")
    .style.display = "none";


document.getElementById("testArea")
    .style.display = "block";


document.getElementById("testResult")
    .style.display = "none";


showQuestion();


}

/* =========================================================
SORU GÖSTER
========================================================= */

function showQuestion() {


questionAnswered = false;


const question =
    questions[currentQuestion];


document.getElementById("questionNumber")
    .textContent =
    `${currentQuestion + 1} / ${questions.length}`;


document.getElementById("questionText")
    .textContent =
    question.question;


const optionsContainer =
    document.getElementById("testOptions");


optionsContainer.innerHTML = "";


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


    optionsContainer.appendChild(button);

});


document.getElementById("answerFeedback")
    .style.display = "none";


document.getElementById("answerFeedback")
    .textContent = "";


document.getElementById("nextQuestionButton")
    .style.display = "none";


}

/* =========================================================
CEVAP
========================================================= */

function selectAnswer(selectedIndex, selectedButton) {


if (questionAnswered) {
    return;
}


questionAnswered = true;


const question =
    questions[currentQuestion];


const optionButtons =
    document.querySelectorAll(".test-option");


optionButtons.forEach((button, index) => {

    button.disabled = true;


    if (index === question.correct) {

        button.classList.add("correct");

    }

});


const feedback =
    document.getElementById("answerFeedback");


if (selectedIndex === question.correct) {

    score++;

    selectedButton.classList.add("correct");


    feedback.innerHTML =
        `<strong style="color:#00dc78">✓ Doğru!</strong><br>
        ${question.explanation}`;

} else {

    selectedButton.classList.add("wrong");


    feedback.innerHTML =
        `<strong style="color:#ff6877">✗ Yanlış!</strong><br>
        ${question.explanation}`;

}


feedback.style.display = "block";


const nextButton =
    document.getElementById("nextQuestionButton");


nextButton.style.display = "block";


if (currentQuestion === questions.length - 1) {

    nextButton.textContent =
        "TESTİ BİTİR ✓";

} else {

    nextButton.textContent =
        "SONRAKİ SORU →";

}


}

/* =========================================================
SONRAKİ SORU
========================================================= */

function nextQuestion() {


currentQuestion++;


if (currentQuestion >= questions.length) {

    finishTest();

    return;

}


showQuestion();


}

/* =========================================================
TEST SONUCU
========================================================= */

function finishTest() {


document.getElementById("testArea")
    .style.display = "none";


document.getElementById("testResult")
    .style.display = "block";


document.getElementById("scoreNumber")
    .textContent = score;


const resultTitle =
    document.getElementById("resultTitle");


const resultMessage =
    document.getElementById("resultMessage");


if (score === 5) {

    resultTitle.textContent =
        "🔥 Mükemmel!";

    resultMessage.textContent =
        "Osmanlı Tarihi konusunun temel noktalarını çok iyi biliyorsun.";

} else if (score >= 3) {

    resultTitle.textContent =
        "✓ Gayet İyi!";

    resultMessage.textContent =
        "Temelin iyi. Karıştırdığın padişah ve savaşları tekrar et.";

} else {

    resultTitle.textContent =
        "📚 Tekrar Zamanı";

    resultMessage.textContent =
        "Özellikle KPSS'de Bil ve Karıştırma bölümlerini tekrar et.";

}


document.getElementById("progressFill")
    .style.width = "100%";


document.getElementById("progressText")
    .textContent = "%100";
}

/* =========================================================
KONU BİTTİ
========================================================= */

function finishLesson() {


window.location.href =
    "../../../index.html?return=subjects";

}
