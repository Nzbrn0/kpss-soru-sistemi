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
            "1982 Anayasası'na göre temel hak ve hürriyetler olağan dönemde nasıl sınırlandırılabilir?",

        options: [
            "Yalnızca kanunla",
            "Yönetmelikle",
            "Genelgeyle",
            "Her türlü idari işlemle"
        ],

        answer: 0,

        explanation:
            "Anayasa'nın 13. maddesine göre temel hak ve hürriyetler ancak kanunla sınırlandırılabilir."
    },


    {
        question:
            "Aşağıdakilerden hangisi temel hakların sınırlandırılmasında uyulması gereken ilkelerden biridir?",

        options: [
            "Sınırsız takdir yetkisi",
            "Ölçülülük",
            "Geriye yürüme",
            "Keyfilik"
        ],

        answer: 1,

        explanation:
            "Temel haklara getirilen sınırlamalar ölçülülük ilkesine aykırı olamaz."
    },


    {
        question:
            "Eğitim ve öğrenim hakkı statü hakları sınıflandırmasında hangi grupta değerlendirilir?",

        options: [
            "Negatif statü",
            "Pozitif statü",
            "Aktif statü",
            "Siyasi statü"
        ],

        answer: 1,

        explanation:
            "Eğitim ve öğrenim hakkı sosyal ve ekonomik haklar arasında, dolayısıyla pozitif statü hakları kapsamında değerlendirilir."
    },


    {
        question:
            "Aşağıdakilerden hangisi aktif statü hakkına örnektir?",

        options: [
            "Özel hayatın gizliliği",
            "Konut dokunulmazlığı",
            "Seçme ve seçilme hakkı",
            "Dinlenme hakkı"
        ],

        answer: 2,

        explanation:
            "Seçme ve seçilme hakkı bireyin devlet yönetimine katılmasını sağladığı için aktif statü hakkıdır."
    },


    {
        question:
            "Temel hak ve hürriyetlerin yabancılar için sınırlandırılmasını düzenleyen Anayasa maddesi hangisidir?",

        options: [
            "Madde 12",
            "Madde 13",
            "Madde 15",
            "Madde 16"
        ],

        answer: 3,

        explanation:
            "Anayasa'nın 16. maddesine göre temel hak ve hürriyetler yabancılar için milletlerarası hukuka uygun olarak kanunla sınırlanabilir."
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
            "Mükemmel! Temel Hak ve Hürriyetler konusunu çok iyi öğrendin.";

    } else if (score >= 3) {

        message =
            "Gayet iyi! 12-16. maddeler ile negatif, pozitif ve aktif statü ayrımını tekrar et.";

    } else {

        message =
            "Özellikle 12-16. maddeleri ve negatif-pozitif-aktif statü haklarını tekrar et.";

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