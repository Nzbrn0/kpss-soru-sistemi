const sections = document.querySelectorAll(".lesson-section");

let openedSections = 0;

const totalSections = 8;

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");


/* AKORDEON */

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
            "Türkiye hangi yıl NATO'ya üye olmuştur?",

        options: [
            "1945",
            "1949",
            "1952",
            "1955"
        ],

        answer: 2,

        explanation:
            "Türkiye 1952 yılında NATO'ya üye olmuştur."
    },


    {
        question:
            "Demokrat Parti hangi yıl iktidara gelmiştir?",

        options: [
            "1946",
            "1950",
            "1952",
            "1960"
        ],

        answer: 1,

        explanation:
            "14 Mayıs 1950 seçimleri sonucunda Demokrat Parti iktidara gelmiştir."
    },


    {
        question:
            "Berlin Duvarı hangi yıl yıkılmıştır?",

        options: [
            "1974",
            "1980",
            "1989",
            "1991"
        ],

        answer: 2,

        explanation:
            "Berlin Duvarı 9 Kasım 1989 tarihinde yıkılmıştır."
    },


    {
        question:
            "SSCB hangi yıl dağılmıştır?",

        options: [
            "1983",
            "1989",
            "1990",
            "1991"
        ],

        answer: 3,

        explanation:
            "Sovyetler Birliği 1991 yılında dağılmıştır."
    },


    {
        question:
            "Kıbrıs Barış Harekâtı hangi yıl gerçekleştirilmiştir?",

        options: [
            "1960",
            "1968",
            "1974",
            "1983"
        ],

        answer: 2,

        explanation:
            "Türkiye Kıbrıs Barış Harekâtı'nı 1974 yılında gerçekleştirmiştir."
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


/* SORUYU YÜKLE */

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

            selectAnswer(
                index,
                button
            );

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
        ).innerHTML =
            `<span style="color:#00ff78">
                ✓ Doğru! ${question.explanation}
            </span>`;

    } else {

        button.classList.add("wrong");


        buttons[
            question.answer
        ].classList.add("correct");


        document.getElementById(
            "answerFeedback"
        ).innerHTML =
            `<span style="color:#ff3048">
                ✗ Yanlış. ${question.explanation}
            </span>`;

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

    }

}


/* SONRAKİ SORU */

function nextQuestion() {

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


/* TEST BİTİŞ */

function finishTest() {

    document.getElementById("testArea")
        .style.display = "none";


    const result =
        document.getElementById("testResult");


    result.style.display = "block";


    let message = "";


    if (score === 5) {

        message =
            "Mükemmel! Konuyu çok iyi öğrenmişsin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! Birkaç noktayı tekrar etmen yeterli.";

    } else {

        message =
            "Temel noktaları tekrar ederek konuyu pekiştir.";

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