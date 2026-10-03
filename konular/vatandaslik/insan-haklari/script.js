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
            "İnsan Hakları Evrensel Beyannamesi hangi yıl kabul edilmiştir?",

        options: [
            "1945",
            "1948",
            "1950",
            "1954"
        ],

        answer: 1,

        explanation:
            "İnsan Hakları Evrensel Beyannamesi, BM Genel Kurulu tarafından 10 Aralık 1948 tarihinde kabul edilmiştir."
    },


    {
        question:
            "Aşağıdakilerden hangisi üçüncü kuşak dayanışma haklarına örnektir?",

        options: [
            "Yaşama hakkı",
            "Seçme hakkı",
            "Çevre hakkı",
            "Kişi özgürlüğü"
        ],

        answer: 2,

        explanation:
            "Çevre hakkı, barış hakkı ve kalkınma hakkı üçüncü kuşak dayanışma haklarının yaygın örneklerindendir."
    },


    {
        question:
            "Avrupa İnsan Hakları Mahkemesi aşağıdaki yapılardan hangisinin insan hakları sistemi içerisinde yer alır?",

        options: [
            "Avrupa Birliği",
            "Avrupa Konseyi",
            "NATO",
            "OECD"
        ],

        answer: 1,

        explanation:
            "AİHM, Avrupa İnsan Hakları Sözleşmesi temelindeki Avrupa Konseyi insan hakları sisteminin mahkemesidir."
    },


    {
        question:
            "Türkiye'de Anayasa Mahkemesine bireysel başvuru hangi tarihten itibaren uygulanmaktadır?",

        options: [
            "2004",
            "2010",
            "23 Eylül 2012",
            "1 Ocak 2018"
        ],

        answer: 2,

        explanation:
            "Bireysel başvuru 2010 Anayasa değişikliğiyle getirildi; başvurular 23 Eylül 2012 tarihinden itibaren alınmaya başladı."
    },


    {
        question:
            "1982 Anayasası'na göre temel hak ve hürriyetlerin olağan dönemde sınırlandırılması hangi maddede düzenlenmiştir?",

        options: [
            "Madde 10",
            "Madde 12",
            "Madde 13",
            "Madde 15"
        ],

        answer: 2,

        explanation:
            "Temel hak ve hürriyetlerin olağan dönemde sınırlandırılmasının temel esasları Anayasa'nın 13. maddesinde düzenlenmiştir."
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
            "Mükemmel! İnsan Hakları konusunu çok iyi öğrendin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! AİHS-AİHM ve 2010-2012 ayrımını tekrar et.";

    } else {

        message =
            "Hak kuşakları, AİHS-AİHM ve bireysel başvuru tarihlerini tekrar et.";
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