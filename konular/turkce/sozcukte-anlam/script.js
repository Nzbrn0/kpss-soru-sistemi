/* =========================
   KONU İLERLEMESİ
========================= */

const sections =
    document.querySelectorAll(".lesson-section");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");


function updateProgress() {

    let opened = 0;

    sections.forEach(section => {

        if (section.classList.contains("open")) {
            opened++;
        }

    });


    const percent =
        Math.round(
            (opened / sections.length) * 100
        );


    progressBar.style.width =
        percent + "%";


    progressText.textContent =
        "%" + percent;

}


/* =========================
   AÇILIR KUTULAR
========================= */

sections.forEach(section => {

    const button =
        section.querySelector(".section-header");


    button.addEventListener("click", () => {

        const isOpen =
            section.classList.contains("open");


        section.classList.toggle("open");


        if (!isOpen) {

            updateProgress();

        } else {

            updateProgress();

        }

    });

});


/* =========================
   MİNİ ETKİLEŞİMLİ SORULAR
========================= */

const miniQuestions =
    document.querySelectorAll(".mini-question");


miniQuestions.forEach(question => {

    const buttons =
        question.querySelectorAll(
            ".answer-button"
        );

    const result =
        question.querySelector(
            ".mini-result"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(btn => {

                    btn.disabled = true;

                });


                const answer =
                    button.dataset.answer;


                if (answer === "real") {

                    button.classList.add(
                        "correct"
                    );

                    result.textContent =
                        "✓ Doğru! Sözcük gerçek anlamıyla kullanılmıştır.";

                    result.style.color =
                        "#18d879";

                } else {

                    button.classList.add(
                        "wrong"
                    );


                    buttons.forEach(btn => {

                        if (
                            btn.dataset.answer ===
                            "real"
                        ) {

                            btn.classList.add(
                                "correct"
                            );

                        }

                    });


                    result.textContent =
                        "✗ Yanlış. Burada doğru cevap gerçek anlamdır.";

                    result.style.color =
                        "#ff3d55";

                }

            }
        );

    });

});


/* =========================
   TEST SORULARI
========================= */

const questions = [

    {
        difficulty: "KOLAY",

        question:
            '"Elindeki kitabı masaya bıraktı." cümlesinde "el" sözcüğü hangi anlamda kullanılmıştır?',

        options: [
            "Gerçek anlam",
            "Mecaz anlam",
            "Terim anlam",
            "Zıt anlam"
        ],

        correct: 0,

        explanation:
            '"El" sözcüğü insanın fiziksel organını ifade ettiği için gerçek anlamdadır.'
    },


    {
        difficulty: "KOLAY",

        question:
            '"Bu haber beni çok üzdü." cümlesinde "üzdü" sözcüğü hangi anlamda kullanılmıştır?',

        options: [
            "Gerçek anlam",
            "Mecaz anlam",
            "Terim anlam",
            "Eş anlam"
        ],

        correct: 1,

        explanation:
            '"Üzmek" burada fiziksel bir hareket değil, duygusal olarak etkilemek anlamındadır.'
    },


    {
        difficulty: "ORTA",

        question:
            'Aşağıdaki cümlelerin hangisinde "ağır" sözcüğü mecaz anlamda kullanılmıştır?',

        options: [
            "Çanta çok ağırdı.",
            "Ağır yükü tek başına taşıdı.",
            "Arkadaşına ağır sözler söyledi.",
            "Kamyon ağır bir yük taşıyordu."
        ],

        correct: 2,

        explanation:
            '"Ağır söz" ifadesinde fiziksel ağırlıktan söz edilmez. Sözcük mecaz anlam kazanmıştır.'
    },


    {
        difficulty: "ORTA",

        question:
            'Aşağıdakilerden hangisinde terim anlamlı bir sözcük kullanılmıştır?',

        options: [
            "Çocuğun yüzü güldü.",
            "Bu sözler kalbimi kırdı.",
            "Üçgenin üç kenarı vardır.",
            "Bugün hava çok sıcak."
        ],

        correct: 2,

        explanation:
            '"Kenar" sözcüğü geometri alanında özel bir kavramı karşıladığı için terim anlamlıdır.'
    },


    {
        difficulty: "ZOR",

        question:
            'Aşağıdaki cümlelerin hangisinde altı çizili sözcük diğerlerinden farklı bir anlam özelliğine sahiptir?',

        options: [
            "Bu işin **temelini** sağlam attık.",
            "Binanın **temeli** oldukça derindi.",
            "Sorunun **temelinde** başka bir neden var.",
            "Evin **temeline** su sızmış."
        ],

        correct: 1,

        explanation:
            '"Binanın temeli" ifadesinde sözcük gerçek anlamındadır. Diğer cümlelerde "temel" soyut bir anlamda kullanılmıştır.'
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


/* =========================
   TEST ELEMANLARI
========================= */

const testStart =
    document.getElementById("testStart");

const testArea =
    document.getElementById("testArea");

const testResult =
    document.getElementById("testResult");

const startTestButton =
    document.getElementById(
        "startTestButton"
    );

const questionNumber =
    document.getElementById(
        "questionNumber"
    );

const difficulty =
    document.getElementById(
        "difficulty"
    );

const questionText =
    document.getElementById(
        "questionText"
    );

const answers =
    document.getElementById(
        "answers"
    );

const answerFeedback =
    document.getElementById(
        "answerFeedback"
    );

const feedbackTitle =
    document.getElementById(
        "feedbackTitle"
    );

const feedbackText =
    document.getElementById(
        "feedbackText"
    );

const nextQuestionButton =
    document.getElementById(
        "nextQuestionButton"
    );

const scoreDisplay =
    document.getElementById(
        "scoreDisplay"
    );

const questionProgress =
    document.getElementById(
        "questionProgress"
    );

const resultScore =
    document.getElementById(
        "resultScore"
    );

const resultMessage =
    document.getElementById(
        "resultMessage"
    );

const retryButton =
    document.getElementById(
        "retryButton"
    );

const finishButton =
    document.getElementById(
        "finishButton"
    );


/* =========================
   TESTİ BAŞLAT
========================= */

startTestButton.addEventListener(
    "click",
    () => {

        testStart.style.display =
            "none";

        testArea.classList.add(
            "active"
        );

        testResult.classList.remove(
            "active"
        );


        currentQuestion = 0;

        score = 0;


        loadQuestion();


        testArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================
   SORUYU YÜKLE
========================= */

function loadQuestion() {

    answered = false;


    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        `Soru ${currentQuestion + 1} / ${questions.length}`;


    difficulty.textContent =
        question.difficulty;


    questionText.textContent =
        question.question;


    scoreDisplay.textContent =
        `${score} Puan`;


    const progress =
        ((currentQuestion + 1) /
            questions.length) * 100;


    questionProgress.style.width =
        progress + "%";


    answers.innerHTML = "";


    answerFeedback.className =
        "answer-feedback";


    feedbackTitle.textContent = "";

    feedbackText.textContent = "";


    nextQuestionButton.classList.remove(
        "show"
    );


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.className =
                "answer-option";


            button.innerHTML = `

                <span class="answer-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span>
                    ${option}
                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    checkAnswer(
                        index,
                        button
                    );

                }
            );


            answers.appendChild(
                button
            );

        }
    );

}


/* =========================
   CEVABI KONTROL ET
========================= */

function checkAnswer(
    selected,
    selectedButton
) {

    if (answered) {
        return;
    }


    answered = true;


    const question =
        questions[currentQuestion];


    const optionButtons =
        answers.querySelectorAll(
            ".answer-option"
        );


    optionButtons.forEach(
        (button, index) => {

            button.disabled = true;


            if (
                index ===
                question.correct
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selected ===
        question.correct
    ) {

        score++;

        selectedButton.classList.add(
            "correct"
        );


        answerFeedback.className =
            "answer-feedback show correct";


        feedbackTitle.textContent =
            "✓ DOĞRU CEVAP";


        feedbackText.textContent =
            question.explanation;

    } else {

        selectedButton.classList.add(
            "wrong"
        );


        answerFeedback.className =
            "answer-feedback show wrong";


        feedbackTitle.textContent =
            "✗ YANLIŞ CEVAP";


        feedbackText.textContent =
            `Doğru cevap: ${
                question.options[question.correct]
            }. ${question.explanation}`;

    }


    scoreDisplay.textContent =
        `${score} Puan`;


    nextQuestionButton.classList.add(
        "show"
    );

}


/* =========================
   SONRAKİ SORU
========================= */

nextQuestionButton.addEventListener(
    "click",
    () => {

        currentQuestion++;


        if (
            currentQuestion >=
            questions.length
        ) {

            finishTest();

            return;

        }


        loadQuestion();


        testArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================
   TESTİ BİTİR
========================= */

function finishTest() {

    testArea.classList.remove(
        "active"
    );


    testResult.classList.add(
        "active"
    );


    resultScore.textContent =
        `${score} / ${questions.length}`;


    if (score === 5) {

        resultMessage.textContent =
            "Mükemmel! Konuya tamamen hakimsin. 🔥";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Gayet iyi! Birkaç noktayı daha tekrar edebilirsin. 💪";

    } else {

        resultMessage.textContent =
            "Konuya bir kez daha göz atıp tekrar denemen faydalı olabilir. 📚";

    }


    testResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================
   TESTİ TEKRARLA
========================= */

retryButton.addEventListener(
    "click",
    () => {

        currentQuestion = 0;

        score = 0;


        testResult.classList.remove(
            "active"
        );


        testArea.classList.add(
            "active"
        );


        loadQuestion();


        testArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================
   KONU BİTTİ
========================= */

finishButton.addEventListener(
    "click",
    () => {

        window.location.href =
    "../../../index.html?return=subjects";

    }
);