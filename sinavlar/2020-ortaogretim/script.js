const TOTAL_PDF_PAGES = 32;

let currentPdfPage = 3;
let currentSubject = "turkce";
let currentQuestion = 1;

let currentMode =
    localStorage.getItem("kpss2020Mode") || "study";

let examFinished = false;


// ======================================================
// DERSLER
// ======================================================

const subjects = {

    turkce: {
        name: "Türkçe",
        pdfPage: 3,
        firstQuestion: 1,
        lastQuestion: 30,
        answerSource: "gy"
    },

    matematik: {
        name: "Matematik",
        pdfPage: 12,
        firstQuestion: 31,
        lastQuestion: 60,
        answerSource: "gy"
    },

    tarih: {
        name: "Tarih",
        pdfPage: 21,
        firstQuestion: 1,
        lastQuestion: 27,
        answerSource: "gk"
    },

    cografya: {
        name: "Coğrafya",
        pdfPage: 25,
        firstQuestion: 28,
        lastQuestion: 45,
        answerSource: "gk"
    },

    vatandaslik: {
        name: "Vatandaşlık",
        pdfPage: 28,
        firstQuestion: 46,
        lastQuestion: 54,
        answerSource: "gk"
    },

    guncel: {
        name: "Güncel Bilgiler",
        pdfPage: 30,
        firstQuestion: 55,
        lastQuestion: 60,
        answerSource: "gk"
    }

};


// ======================================================
// 2020 RESMÎ CEVAP ANAHTARLARI
// ======================================================

const generalAbilityAnswers = [
    "B","B","C","D","C","B","C","A","E","A",
    "A","D","C","B","B","A","E","D","A","E",
    "C","E","C","D","C","E","A","D","B","A",
    "E","D","A","D","A","B","B","E","A","D",
    "B","B","B","D","C","A","C","C","C","E",
    "E","E","D","D","C","E","A","E","C","C"
];

const generalCultureAnswers = [
    "C","A","D","E","A","E","A","E","D","B",
    "E","A","D","C","D","A","E","A","E","B",
    "E","C","C","B","B","B","A","C","E","A",
    "D","B","D","A","E","B","D","E","C","D",
    "C","A","C","A","E","A","C","B","B","C",
    "B","E","C","D","A","D","B","C","A","E"
];


// ======================================================
// KAYITLI CEVAPLAR
// ======================================================

let userAnswers = {};

try {

    userAnswers =
        JSON.parse(
            localStorage.getItem("kpss2020Answers")
        ) || {};

} catch {

    userAnswers = {};

}


function saveAnswers() {

    localStorage.setItem(
        "kpss2020Answers",
        JSON.stringify(userAnswers)
    );

}


function getStorageKey(
    subjectKey,
    questionNumber
) {

    return `${subjectKey}_${questionNumber}`;

}


// ======================================================
// DOĞRU CEVAP
// ======================================================

function getAnswerForSubjectQuestion(
    subjectKey,
    questionNumber
) {

    const subject =
        subjects[subjectKey];


    if (
        subject.answerSource === "gy"
    ) {

        return generalAbilityAnswers[
            questionNumber - 1
        ];

    }


    return generalCultureAnswers[
        questionNumber - 1
    ];

}


// ======================================================
// MOD
// ======================================================

function setMode(mode) {

    currentMode = mode;

    localStorage.setItem(
        "kpss2020Mode",
        mode
    );

    examFinished = false;

    updateModeUI();
    updateAnswerUI();
    updateQuestionGrid();

}


function updateModeUI() {

    document
        .getElementById("studyModeButton")
        .classList.toggle(
            "active",
            currentMode === "study"
        );


    document
        .getElementById("examModeButton")
        .classList.toggle(
            "active",
            currentMode === "exam"
        );


    const description =
        document.getElementById(
            "modeDescription"
        );


    if (currentMode === "study") {

        description.textContent =
            "Cevabını işaretlediğinde sonucu görürsün.";

    } else {

        description.textContent =
            "Doğru ve yanlışlar sınav bitene kadar gizlenir.";

    }

}


// ======================================================
// DERS SEÇ
// ======================================================

function selectSubject(subjectKey) {

    if (!subjects[subjectKey]) return;


    currentSubject =
        subjectKey;


    const subject =
        subjects[currentSubject];


    currentQuestion =
        subject.firstQuestion;


    currentPdfPage =
        subject.pdfPage;


    document
        .querySelectorAll(".subject-button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.subject ===
                subjectKey
            );

        });


    loadPdfPage();

    updateEverything();

}


// ======================================================
// SORU SEÇ
// ======================================================

function selectQuestion(
    questionNumber
) {

    const subject =
        subjects[currentSubject];


    if (
        questionNumber <
            subject.firstQuestion ||
        questionNumber >
            subject.lastQuestion
    ) {
        return;
    }


    currentQuestion =
        questionNumber;


    currentPdfPage =
        getPdfPageForQuestion(
            currentSubject,
            currentQuestion
        );


    loadPdfPage();

    updateEverything();

}


// ======================================================
// SONRAKİ / ÖNCEKİ
// ======================================================

function nextQuestion() {

    const subject =
        subjects[currentSubject];


    if (
        currentQuestion <
        subject.lastQuestion
    ) {

        selectQuestion(
            currentQuestion + 1
        );

    }

}


function previousQuestion() {

    const subject =
        subjects[currentSubject];


    if (
        currentQuestion >
        subject.firstQuestion
    ) {

        selectQuestion(
            currentQuestion - 1
        );

    }

}


// ======================================================
// CEVAP SEÇ
// ======================================================

function selectAnswer(answer) {

    const key =
        getStorageKey(
            currentSubject,
            currentQuestion
        );


    userAnswers[key] =
        answer;


    saveAnswers();

    updateAnswerUI();
    updateQuestionGrid();
    updateStats();

}


// ======================================================
// CEVABI SİL
// ======================================================

function clearAnswer() {

    const key =
        getStorageKey(
            currentSubject,
            currentQuestion
        );


    delete userAnswers[key];


    saveAnswers();

    updateAnswerUI();
    updateQuestionGrid();
    updateStats();

}


// ======================================================
// CEVAP ARAYÜZÜ
// ======================================================

function updateAnswerUI() {

    const key =
        getStorageKey(
            currentSubject,
            currentQuestion
        );


    const selected =
        userAnswers[key];


    const correct =
        getAnswerForSubjectQuestion(
            currentSubject,
            currentQuestion
        );


    document
        .querySelectorAll(".answer-option")
        .forEach(button => {

            button.classList.remove(
                "selected",
                "correct",
                "wrong"
            );


            if (
                button.dataset.answer ===
                selected
            ) {

                button.classList.add(
                    "selected"
                );

            }


            if (
                currentMode === "study" &&
                selected
            ) {

                if (
                    button.dataset.answer ===
                    correct
                ) {

                    button.classList.add(
                        "correct"
                    );

                }


                if (
                    button.dataset.answer ===
                        selected &&
                    selected !== correct
                ) {

                    button.classList.add(
                        "wrong"
                    );

                }

            }


            if (
                currentMode === "exam" &&
                examFinished
            ) {

                if (
                    button.dataset.answer ===
                    correct
                ) {

                    button.classList.add(
                        "correct"
                    );

                }


                if (
                    button.dataset.answer ===
                        selected &&
                    selected !== correct
                ) {

                    button.classList.add(
                        "wrong"
                    );

                }

            }

        });


    const feedback =
        document.getElementById(
            "answerFeedback"
        );


    feedback.className =
        "answer-feedback";


    if (!selected) {

        feedback.textContent = "";

        return;

    }


    if (
        currentMode === "exam" &&
        !examFinished
    ) {

        feedback.textContent =
            "Cevabın kaydedildi.";

        feedback.classList.add(
            "neutral"
        );

        return;

    }


    if (selected === correct) {

        feedback.textContent =
            "✓ Doğru cevap";

        feedback.classList.add(
            "correct"
        );

    } else {

        feedback.textContent =
            `✕ Yanlış • Doğru cevap: ${correct}`;

        feedback.classList.add(
            "wrong"
        );

    }

}


// ======================================================
// SORU GRID
// ======================================================

function updateQuestionGrid() {

    const grid =
        document.getElementById(
            "questionGrid"
        );


    grid.innerHTML = "";


    const subject =
        subjects[currentSubject];


    let answered = 0;


    for (
        let q = subject.firstQuestion;
        q <= subject.lastQuestion;
        q++
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.textContent = q;


        const key =
            getStorageKey(
                currentSubject,
                q
            );


        const selected =
            userAnswers[key];


        const correct =
            getAnswerForSubjectQuestion(
                currentSubject,
                q
            );


        if (selected) {

            answered++;

            button.classList.add(
                "answered"
            );

        }


        if (
            q === currentQuestion
        ) {

            button.classList.add(
                "current"
            );

        }


        if (
            selected &&
            (
                currentMode === "study" ||
                examFinished
            )
        ) {

            if (
                selected === correct
            ) {

                button.classList.add(
                    "correct"
                );

            } else {

                button.classList.add(
                    "wrong"
                );

            }

        }


        button.onclick =
            () => selectQuestion(q);


        grid.appendChild(
            button
        );

    }


    const total =
        subject.lastQuestion -
        subject.firstQuestion + 1;


    document.getElementById(
        "answeredCount"
    ).textContent =
        `${answered} / ${total}`;

}


// ======================================================
// BAŞLIK
// ======================================================

function updateQuestionHeader() {

    const subject =
        subjects[currentSubject];


    const total =
        subject.lastQuestion -
        subject.firstQuestion + 1;


    const position =
        currentQuestion -
        subject.firstQuestion + 1;


    document.getElementById(
        "currentSubjectLabel"
    ).textContent =
        subject.name.toUpperCase();


    document.getElementById(
        "currentQuestionLabel"
    ).textContent =
        `Soru ${currentQuestion}`;


    document.getElementById(
        "currentQuestionNumber"
    ).textContent =
        currentQuestion;


    document.getElementById(
        "subjectQuestionCounter"
    ).textContent =
        `${subject.name.toUpperCase()} • ${position} / ${total}`;

}


// ======================================================
// DERS SONUCU
// ======================================================

function calculateSubjectResult(
    subjectKey
) {

    const subject =
        subjects[subjectKey];


    let correct = 0;
    let wrong = 0;
    let empty = 0;


    for (
        let q = subject.firstQuestion;
        q <= subject.lastQuestion;
        q++
    ) {

        const key =
            getStorageKey(
                subjectKey,
                q
            );


        const selected =
            userAnswers[key];


        const correctAnswer =
            getAnswerForSubjectQuestion(
                subjectKey,
                q
            );


        if (!selected) {

            empty++;

        } else if (
            selected ===
            correctAnswer
        ) {

            correct++;

        } else {

            wrong++;

        }

    }


    const net =
        correct - wrong / 4;


    return {
        correct,
        wrong,
        empty,
        net
    };

}


// ======================================================
// İSTATİSTİKLER
// ======================================================

function updateStats() {

    const result =
        calculateSubjectResult(
            currentSubject
        );


    document.getElementById(
        "subjectCorrect"
    ).textContent =
        result.correct;


    document.getElementById(
        "subjectWrong"
    ).textContent =
        result.wrong;


    document.getElementById(
        "subjectEmpty"
    ).textContent =
        result.empty;


    document.getElementById(
        "subjectNet"
    ).textContent =
        result.net.toFixed(2);


    let totalCorrect = 0;
    let totalWrong = 0;
    let totalEmpty = 0;
    let totalNet = 0;


    Object.keys(subjects)
        .forEach(subjectKey => {

            const r =
                calculateSubjectResult(
                    subjectKey
                );


            totalCorrect +=
                r.correct;

            totalWrong +=
                r.wrong;

            totalEmpty +=
                r.empty;

            totalNet +=
                r.net;

        });


    document.getElementById(
        "totalCorrect"
    ).textContent =
        totalCorrect;


    document.getElementById(
        "totalWrong"
    ).textContent =
        totalWrong;


    document.getElementById(
        "totalEmpty"
    ).textContent =
        totalEmpty;


    document.getElementById(
        "totalNet"
    ).textContent =
        totalNet.toFixed(2);

}


// ======================================================
// İLK YANLIŞ
// ======================================================

function goToFirstWrong() {

    const subject =
        subjects[currentSubject];


    for (
        let q = subject.firstQuestion;
        q <= subject.lastQuestion;
        q++
    ) {

        const key =
            getStorageKey(
                currentSubject,
                q
            );


        const selected =
            userAnswers[key];


        if (!selected) continue;


        const correct =
            getAnswerForSubjectQuestion(
                currentSubject,
                q
            );


        if (
            selected !== correct
        ) {

            selectQuestion(q);

            return;

        }

    }


    alert(
        "Bu derste yanlış cevap bulunmuyor."
    );

}


// ======================================================
// İLK BOŞ
// ======================================================

function goToFirstEmpty() {

    const subject =
        subjects[currentSubject];


    for (
        let q = subject.firstQuestion;
        q <= subject.lastQuestion;
        q++
    ) {

        const key =
            getStorageKey(
                currentSubject,
                q
            );


        if (!userAnswers[key]) {

            selectQuestion(q);

            return;

        }

    }


    alert(
        "Bu derste boş soru bulunmuyor."
    );

}


// ======================================================
// SINAVI BİTİR
// ======================================================

function finishExam() {

    examFinished = true;

    updateAnswerUI();
    updateQuestionGrid();


    let totalCorrect = 0;
    let totalWrong = 0;
    let totalEmpty = 0;
    let totalNet = 0;


    const resultSubjects =
        document.getElementById(
            "resultSubjects"
        );


    resultSubjects.innerHTML = "";


    Object.keys(subjects)
        .forEach(subjectKey => {

            const subject =
                subjects[subjectKey];


            const result =
                calculateSubjectResult(
                    subjectKey
                );


            totalCorrect +=
                result.correct;

            totalWrong +=
                result.wrong;

            totalEmpty +=
                result.empty;

            totalNet +=
                result.net;


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "result-subject-row";


            row.innerHTML = `

                <span>
                    ${subject.name}
                </span>

                <div>

                    <small>
                        ${result.correct} D
                    </small>

                    <small>
                        ${result.wrong} Y
                    </small>

                    <strong>
                        ${result.net.toFixed(2)} Net
                    </strong>

                </div>

            `;


            resultSubjects.appendChild(
                row
            );

        });


    document.getElementById(
        "resultCorrect"
    ).textContent =
        totalCorrect;


    document.getElementById(
        "resultWrong"
    ).textContent =
        totalWrong;


    document.getElementById(
        "resultEmpty"
    ).textContent =
        totalEmpty;


    document.getElementById(
        "resultTotalNet"
    ).textContent =
        totalNet.toFixed(2);


    document.getElementById(
        "resultModal"
    ).classList.add(
        "active"
    );

}


// ======================================================
// SONUÇ KAPAT
// ======================================================

function closeResult() {

    document.getElementById(
        "resultModal"
    ).classList.remove(
        "active"
    );

}


// ======================================================
// SIFIRLA
// ======================================================

function resetAllExam() {

    const confirmReset =
        confirm(
            "2020 KPSS sınavındaki tüm cevapların silinecek. Emin misin?"
        );


    if (!confirmReset) return;


    localStorage.removeItem(
        "kpss2020Answers"
    );


    userAnswers = {};

    examFinished = false;

    currentSubject = "turkce";
    currentQuestion = 1;
    currentPdfPage = 3;


    document
        .querySelectorAll(
            ".subject-button"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.subject ===
                "turkce"
            );

        });


    loadPdfPage();

    updateEverything();

}


// ======================================================
// 2020 SORU → PDF SAYFASI
// ======================================================

function getPdfPageForQuestion(
    subjectKey,
    questionNumber
) {

    /*
        TÜRKÇE
        PDF 3-11
    */

    if (
        subjectKey === "turkce"
    ) {

        if (questionNumber <= 4)
            return 3;

        if (questionNumber <= 9)
            return 4;

        if (questionNumber <= 14)
            return 5;

        if (questionNumber <= 21)
            return 8;

        if (questionNumber <= 23)
            return 9;

        if (questionNumber <= 26)
            return 10;

        return 11;

    }


    /*
        MATEMATİK
        PDF 12-20
    */

    if (
        subjectKey === "matematik"
    ) {

        if (questionNumber <= 34)
            return 12;

        if (questionNumber <= 38)
            return 13;

        if (questionNumber <= 42)
            return 14;

        if (questionNumber <= 46)
            return 15;

        if (questionNumber <= 49)
            return 16;

        if (questionNumber <= 51)
            return 17;

        if (questionNumber <= 53)
            return 18;

        if (questionNumber <= 56)
            return 19;

        return 20;

    }


    /*
        TARİH
        GK 1-27
    */

    if (
        subjectKey === "tarih"
    ) {

        if (questionNumber <= 6)
            return 21;

        if (questionNumber <= 11)
            return 22;

        if (questionNumber <= 18)
            return 23;

        if (questionNumber <= 23)
            return 24;

        return 25;

    }


    /*
        COĞRAFYA
        GK 28-45
    */

    if (
        subjectKey === "cografya"
    ) {

        if (questionNumber <= 28)
            return 25;

        if (questionNumber <= 33)
            return 26;

        if (questionNumber <= 39)
            return 27;

        return 28;

    }


    /*
        VATANDAŞLIK
        GK 46-54
    */

    if (
        subjectKey === "vatandaslik"
    ) {

        if (questionNumber <= 46)
            return 28;

        if (questionNumber <= 53)
            return 29;

        return 30;

    }


    /*
        GÜNCEL BİLGİLER
        GK 55-60
    */

    if (
        subjectKey === "guncel"
    ) {

        return 30;

    }


    return 3;

}


// ======================================================
// PDF YÜKLE
// ======================================================

function loadPdfPage() {

    currentPdfPage =
        Math.max(
            1,
            Math.min(
                TOTAL_PDF_PAGES,
                currentPdfPage
            )
        );


    const frame =
        document.getElementById(
            "pdfFrame"
        );


    /*
        Chrome aynı PDF içinde #page değişimini
        bazen uygulamadığı için önce temizliyoruz.
    */

    frame.src =
        "about:blank";


    const targetPage =
        currentPdfPage;


    setTimeout(
        function () {

            frame.src =
                `2020-kpss.pdf#page=${targetPage}&zoom=page-width`;

        },
        40
    );


    document.getElementById(
        "pdfPageInput"
    ).value =
        currentPdfPage;


    document.getElementById(
        "pdfPageInfo"
    ).textContent =
        `/ ${TOTAL_PDF_PAGES}`;

}


// ======================================================
// PDF KONTROLLERİ
// ======================================================

function nextPdfPage() {

    if (
        currentPdfPage <
        TOTAL_PDF_PAGES
    ) {

        currentPdfPage++;

        loadPdfPage();

    }

}


function previousPdfPage() {

    if (
        currentPdfPage > 1
    ) {

        currentPdfPage--;

        loadPdfPage();

    }

}


function goToPdfPage() {

    const input =
        document.getElementById(
            "pdfPageInput"
        );


    let page =
        parseInt(
            input.value
        );


    if (
        isNaN(page)
    ) {

        page =
            currentPdfPage;

    }


    currentPdfPage =
        Math.max(
            1,
            Math.min(
                TOTAL_PDF_PAGES,
                page
            )
        );


    loadPdfPage();

}


// ======================================================
// FULLSCREEN
// ======================================================

function togglePdfFullscreen() {

    const container =
        document.getElementById(
            "pdfContainer"
        );


    if (
        !document.fullscreenElement
    ) {

        if (
            container.requestFullscreen
        ) {

            container.requestFullscreen();

        }

    } else {

        document.exitFullscreen();

    }

}


// ======================================================
// KLAVYE
// ======================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.altKey &&
            event.key === "ArrowLeft"
        ) {

            event.preventDefault();

            previousPdfPage();

        }


        if (
            event.altKey &&
            event.key === "ArrowRight"
        ) {

            event.preventDefault();

            nextPdfPage();

        }

    }
);


// ======================================================
// GÜNCELLE
// ======================================================

function updateEverything() {

    updateQuestionHeader();
    updateAnswerUI();
    updateQuestionGrid();
    updateStats();

}


// ======================================================
// BAŞLAT
// ======================================================

function initializeApp() {

    updateModeUI();

    currentSubject =
        "turkce";

    currentQuestion = 1;

    currentPdfPage = 3;


    loadPdfPage();

    updateEverything();

}


initializeApp();