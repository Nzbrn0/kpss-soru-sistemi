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


/* HIZLI KONTROL */

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
            "✗ Yanlış. Doğru cevap yeşil ile gösterildi.";

        result.style.color =
            "#ff3048";
    }

}


/* 10 SORULUK FINAL TEST */

const questions = [

    {
        question:
            "Türkiye'nin ilk yerli ve millî haberleşme uydusu hangisidir?",

        options: [
            "İMECE",
            "TÜRKSAT 5A",
            "TÜRKSAT 6A",
            "Göktürk-2"
        ],

        answer: 2,

        explanation:
            "TÜRKSAT 6A, Türkiye'nin ilk yerli ve millî haberleşme uydusudur."
    },


    {
        question:
            "2026 yılında insanlı Ay çevresi uçuşunu gerçekleştiren NASA görevi hangisidir?",

        options: [
            "Artemis I",
            "Artemis II",
            "Artemis III",
            "Apollo 18"
        ],

        answer: 1,

        explanation:
            "Artemis II, 1-10 Nisan 2026 arasında dört astronotla Ay çevresi uçuşu gerçekleştirdi."
    },


    {
        question:
            "2026 Dünya Kitap Başkenti hangisidir?",

        options: [
            "Rio de Janeiro",
            "Medellín",
            "Rabat",
            "Strasbourg"
        ],

        answer: 2,

        explanation:
            "UNESCO'nun 2026 Dünya Kitap Başkenti Fas'ın başkenti Rabat'tır."
    },


    {
        question:
            "2025 Nobel Edebiyat Ödülü'nü kim kazanmıştır?",

        options: [
            "Maria Corina Machado",
            "László Krasznahorkai",
            "Banu Mushtaq",
            "Yáng Shuāng-zǐ"
        ],

        answer: 1,

        explanation:
            "2025 Nobel Edebiyat Ödülü Macar yazar László Krasznahorkai'ye verilmiştir."
    },


    {
        question:
            "2026 International Booker Prize kazanan eser hangisidir?",

        options: [
            "Heart Lamp",
            "Taiwan Travelogue",
            "Fjord",
            "Hamnet"
        ],

        answer: 1,

        explanation:
            "2026 International Booker Prize, Yáng Shuāng-zǐ'nin Taiwan Travelogue adlı eserine verilmiştir."
    },


    {
        question:
            "2026 FIFA Dünya Kupası ilk kez kaç takımla düzenlenmiştir?",

        options: [
            "32",
            "36",
            "40",
            "48"
        ],

        answer: 3,

        explanation:
            "2026 FIFA Dünya Kupası, turnuva tarihinde ilk kez 48 takımla düzenlenmiştir."
    },


    {
        question:
            "EuroBasket 2025'te Türkiye'nin derecesi nedir?",

        options: [
            "Şampiyon",
            "İkinci",
            "Üçüncü",
            "Dördüncü"
        ],

        answer: 1,

        explanation:
            "Türkiye finalde Almanya'ya yenilerek EuroBasket 2025'i ikinci tamamladı."
    },


    {
        question:
            "2026 Uluslararası Kadın Çiftçi Yılı hangi kuruluş tarafından ilan edilmiştir?",

        options: [
            "NATO",
            "Avrupa Birliği",
            "Birleşmiş Milletler",
            "OECD"
        ],

        answer: 2,

        explanation:
            "2026, Birleşmiş Milletler tarafından Uluslararası Kadın Çiftçi Yılı ilan edilmiştir."
    },


    {
        question:
            "Türkiye'nin ilk yerli ve millî hızlı trenini hangi kurum geliştirmiştir?",

        options: [
            "TUSAŞ",
            "TÜRASAŞ",
            "Baykar",
            "ASELSAN"
        ],

        answer: 1,

        explanation:
            "Türkiye'nin ilk yerli ve millî hızlı treni TÜRASAŞ tarafından geliştirilmiştir."
    },


    {
        question:
            "Bayraktar KIZILELMA hangi şirket tarafından geliştirilmiştir?",

        options: [
            "TUSAŞ",
            "ROKETSAN",
            "ASELSAN",
            "Baykar"
        ],

        answer: 3,

        explanation:
            "Bayraktar KIZILELMA, Baykar tarafından geliştirilen insansız savaş uçağıdır."
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
            Final Sorusu ${currentQuestion + 1} / ${questions.length}
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
            "Finali Bitir ✓";

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


    if (score === 10) {

        message =
            "Mükemmel! Güncel Bilgiler bölümünü tamamen bitirdin. 🔥";

    } else if (score >= 8) {

        message =
            "Çok iyi! Güncel Bilgiler konusunda oldukça hazırsın.";

    } else if (score >= 6) {

        message =
            "İyi gidiyorsun. Yanlış yaptığın başlıkları kısa bir tekrar et.";

    } else if (score >= 4) {

        message =
            "Temel bilgiler var ama birkaç konuyu yeniden gözden geçir.";

    } else {

        message =
            "Önce 60 Saniyede Güncel Bilgiler bölümünü tekrar edip testi yeniden çöz.";
    }


    result.innerHTML = `

        <h3>🏆 Güncel Bilgiler Finali Tamamlandı!</h3>

        <p style="margin-top:15px; font-size:24px;">
            <strong>${score} / ${questions.length}</strong>
        </p>

        <p style="margin-top:10px;">
            ${message}
        </p>

    `;
}


/* DERSİ BİTİR */

function finishLesson() {

    window.location.href =
        "../../../index.html?return=subjects";
}