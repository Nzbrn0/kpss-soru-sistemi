/* =========================================================
   İLK TÜRK-İSLAM DEVLETLERİ
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

    /*
        İlerleme maksimum %70.
        Test tamamlandığında %100 olacak.
    */

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
   MİNİ SORULAR
========================================================= */

function checkMini(button, correct) {

    const question =
        button.closest(".mini-question");

    const buttons =
        question.querySelectorAll(".answer-button");

    const result =
        question.querySelector(".mini-result");


    /* Aynı soruya tekrar cevap verilmesini engelle */

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
            "✗ Yanlış. Yeşil renkte gösterilen seçenek doğru cevaptır.";

        result.style.color = "#ff6877";

    }

}


/* =========================================================
   TEST SORULARI
========================================================= */

const questions = [

    {
        question:
            "İlk Müslüman Türk devleti olarak kabul edilen devlet hangisidir?",

        options: [
            "Gazneliler",
            "Karahanlılar",
            "Büyük Selçuklu",
            "Harzemşahlar"
        ],

        correct: 1,

        explanation:
            "Karahanlılar, Türklerin İslamiyet'i kabulünden sonra kurulan ilk Müslüman Türk devleti olarak kabul edilir."
    },


    {
        question:
            "1071 Malazgirt Savaşı'nda Büyük Selçuklu hükümdarı kimdir?",

        options: [
            "Tuğrul Bey",
            "Melikşah",
            "Alp Arslan",
            "Sencer"
        ],

        correct: 2,

        explanation:
            "1071 Malazgirt Savaşı'nda Büyük Selçuklu Devleti'nin hükümdarı Alp Arslan'dır."
    },


    {
        question:
            "Kutadgu Bilig adlı eserin yazarı aşağıdakilerden hangisidir?",

        options: [
            "Kaşgarlı Mahmud",
            "Yusuf Has Hacip",
            "Nizamülmülk",
            "Edip Ahmet Yükneki"
        ],

        correct: 1,

        explanation:
            "Kutadgu Bilig, Yusuf Has Hacip tarafından yazılmıştır. Eser devlet yönetimi ve ideal yönetici anlayışı hakkında bilgiler verir."
    },


    {
        question:
            "Divânu Lügati't-Türk adlı eserin yazarı kimdir?",

        options: [
            "Yusuf Has Hacip",
            "Nizamülmülk",
            "Kaşgarlı Mahmud",
            "Biruni"
        ],

        correct: 2,

        explanation:
            "Divânu Lügati't-Türk, Kaşgarlı Mahmud tarafından yazılmıştır. Türk dili ve kültürü açısından önemli bir eserdir."
    },


    {
        question:
            "Aşağıdakilerden hangisi Nizamülmülk ile doğrudan ilişkilidir?",

        options: [
            "Kutadgu Bilig",
            "Divânu Lügati't-Türk",
            "Siyasetname",
            "Atabetü'l-Hakayık"
        ],

        correct: 2,

        explanation:
            "Nizamülmülk'ün önemli eseri Siyasetname'dir. Ayrıca Nizamiye Medreselerinin kurulmasında önemli rol oynamıştır."
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
   SORUYU GÖSTER
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
   CEVAP SEÇ
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
   TESTİ BİTİR
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
            "İlk Türk-İslam Devletleri konusunu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        resultTitle.textContent =
            "✓ Gayet İyi!";


        resultMessage.textContent =
            "Temelin iyi. Karıştırdığın noktaları bir kez daha gözden geçir.";

    } else {

        resultTitle.textContent =
            "📚 Tekrar Zamanı";


        resultMessage.textContent =
            "Özellikle KPSS'de Bil ve Karıştırma bölümlerini tekrar et.";

    }


    /*
        Test tamamlandıktan sonra ilerleme %100.
    */

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