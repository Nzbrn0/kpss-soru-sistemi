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


/* 10 SORULUK FİNAL TESTİ */

const questions = [

    {
        question:
            "1982 Anayasası'na göre yasama yetkisi kime aittir?",

        options: [
            "Cumhurbaşkanı",
            "TBMM",
            "Anayasa Mahkemesi",
            "Danıştay"
        ],

        answer: 1,

        explanation:
            "Anayasa'nın 7. maddesine göre yasama yetkisi Türk Milleti adına TBMM'nindir."
    },


    {
        question:
            "TBMM kaç milletvekilinden oluşur?",

        options: [
            "450",
            "500",
            "550",
            "600"
        ],

        answer: 3,

        explanation:
            "TBMM 600 milletvekilinden oluşur."
    },


    {
        question:
            "Cumhurbaşkanının görev süresi kaç yıldır?",

        options: [
            "4",
            "5",
            "6",
            "7"
        ],

        answer: 1,

        explanation:
            "Cumhurbaşkanının görev süresi 5 yıldır."
    },


    {
        question:
            "İdari yargının yüksek mahkemesi aşağıdakilerden hangisidir?",

        options: [
            "Yargıtay",
            "Danıştay",
            "Sayıştay",
            "Uyuşmazlık Mahkemesi"
        ],

        answer: 1,

        explanation:
            "Danıştay, idari yargı kararlarının Anayasa ve kanunların öngördüğü çerçevede son inceleme merciidir."
    },


    {
        question:
            "Anayasa Mahkemesi kaç üyeden oluşur?",

        options: [
            "11",
            "13",
            "15",
            "17"
        ],

        answer: 2,

        explanation:
            "Anayasa Mahkemesi 15 üyeden oluşur."
    },


    {
        question:
            "İllerin idaresi hangi esasa dayanır?",

        options: [
            "İdari vesayet",
            "Yetki genişliği",
            "Hiyerarşi",
            "Kuvvetler birliği"
        ],

        answer: 1,

        explanation:
            "Anayasa'nın 126. maddesine göre illerin idaresi yetki genişliği esasına dayanır."
    },


    {
        question:
            "Aynı kamu tüzel kişiliği içerisindeki üst-ast ilişkisine ne ad verilir?",

        options: [
            "İdari vesayet",
            "Hiyerarşi",
            "Yetki genişliği",
            "Yerinden yönetim"
        ],

        answer: 1,

        explanation:
            "Aynı kamu tüzel kişiliği içerisindeki üst-ast ilişkisi hiyerarşidir."
    },


    {
        question:
            "Türkiye NATO'ya hangi yıl katılmıştır?",

        options: [
            "1945",
            "1949",
            "1952",
            "1960"
        ],

        answer: 2,

        explanation:
            "Türkiye NATO'ya 1952 yılında katılmıştır."
    },


    {
        question:
            "Avrupa İnsan Hakları Mahkemesi hangi sistem içerisinde yer alır?",

        options: [
            "Avrupa Birliği",
            "Avrupa Konseyi",
            "NATO",
            "OECD"
        ],

        answer: 1,

        explanation:
            "AİHM, Avrupa İnsan Hakları Sözleşmesi temelindeki Avrupa Konseyi insan hakları sisteminde yer alır."
    },


    {
        question:
            "Türkiye'de Anayasa Mahkemesine bireysel başvurular hangi tarihten itibaren alınmaya başlanmıştır?",

        options: [
            "2004",
            "2010",
            "23 Eylül 2012",
            "2017"
        ],

        answer: 2,

        explanation:
            "AYM'ye bireysel başvurular 23 Eylül 2012 tarihinden itibaren alınmaya başlanmıştır."
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
            "Final Testini Bitir ✓";

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


    if (score === 10) {

        message =
            "Mükemmel! Vatandaşlık bölümünü çok sağlam bitirdin.";

    } else if (score >= 8) {

        message =
            "Çok iyi! Birkaç küçük ayrımı tekrar etmen yeterli.";

    } else if (score >= 6) {

        message =
            "İyi gidiyorsun. Sayılar ve kurum ayrımlarını bir kez daha tekrar et.";

    } else {

        message =
            "Genel tekrar kartlarını tekrar incele ve testi yeniden çöz.";
    }


    result.innerHTML = `

        <h3>🏆 Vatandaşlık Final Testi Tamamlandı!</h3>

        <p style="margin-top:15px; font-size:22px;">
            <strong>${score} / ${questions.length}</strong>
        </p>

        <p style="margin-top:10px;">
            ${message}
        </p>

        <button
            class="next-question-button"
            style="margin-top:20px;"
            onclick="restartTest()"
        >
            Testi Tekrar Çöz
        </button>

    `;
}


/* TESTİ TEKRARLA */

function restartTest() {

    document.getElementById("testResult")
        .style.display = "none";

    document.getElementById("testStart")
        .style.display = "block";
}


/* VATANDAŞLIK BİTTİ */

function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";
}