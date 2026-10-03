const TOTAL_PDF_PAGES = 29;

const PDF_FILE = "2016-kpss.pdf";
let pdfDocument = null, pdfRenderTask = null, pdfLoadPromise = null;
if (window.pdfjsLib) pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
function ensurePdfLoaded() {
 if (pdfDocument) return Promise.resolve(pdfDocument);
 if (!pdfLoadPromise) pdfLoadPromise = pdfjsLib.getDocument(PDF_FILE).promise.then(pdf => (pdfDocument=pdf));
 return pdfLoadPromise;
}
async function renderPdfPage() {
 const loading=document.getElementById("pdfLoading"), canvas=document.getElementById("pdfCanvas"), container=document.getElementById("pdfContainer");
 try {
  if(loading){loading.style.display="block";loading.textContent="PDF yükleniyor...";}
  const pdf=await ensurePdfLoaded(), page=await pdf.getPage(currentPdfPage);
  if(pdfRenderTask){try{pdfRenderTask.cancel();}catch(_){}}
  const base=page.getViewport({scale:1}), available=Math.max(280,container.clientWidth-20), cssScale=available/base.width, ratio=Math.min(window.devicePixelRatio||1,2);
  const viewport=page.getViewport({scale:cssScale*ratio});
  canvas.width=Math.floor(viewport.width);canvas.height=Math.floor(viewport.height);canvas.style.width=Math.floor(viewport.width/ratio)+"px";canvas.style.height=Math.floor(viewport.height/ratio)+"px";
  const ctx=canvas.getContext("2d",{alpha:false});ctx.fillStyle="white";ctx.fillRect(0,0,canvas.width,canvas.height);
  pdfRenderTask=page.render({canvasContext:ctx,viewport});await pdfRenderTask.promise;if(loading)loading.style.display="none";container.scrollTop=0;
 } catch(err) {if(err&&err.name==="RenderingCancelledException")return;console.error(err);if(loading)loading.textContent="PDF açılamadı. Sayfayı yenileyip tekrar dene.";}
}


let currentPdfPage = 3;
let currentSubject = "turkce";
let currentQuestion = 1;

let currentMode =
    localStorage.getItem("kpss2016Mode") || "study";

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
        pdfPage: 11,
        firstQuestion: 31,
        lastQuestion: 60,
        answerSource: "gy"
    },

    tarih: {
        name: "Tarih",
        pdfPage: 18,
        firstQuestion: 1,
        lastQuestion: 27,
        answerSource: "gk"
    },

    cografya: {
        name: "Coğrafya",
        pdfPage: 22,
        firstQuestion: 28,
        lastQuestion: 45,
        answerSource: "gk"
    },

    vatandaslik: {
        name: "Vatandaşlık",
        pdfPage: 25,
        firstQuestion: 46,
        lastQuestion: 54,
        answerSource: "gk"
    },

    guncel: {
        name: "Güncel Bilgiler",
        pdfPage: 26,
        firstQuestion: 55,
        lastQuestion: 60,
        answerSource: "gk"
    }

};


// ======================================================
// RESMÎ 2016 CEVAP ANAHTARI
// ======================================================

const generalAbilityAnswers = [

    "A", "E", "C", "A", "D",
    "C", "D", "E", "E", "D",

    "E", "D", "C", "D", "C",
    "A", "B", "C", "A", "B",

    "A", "A", "D", "E", "C",
    "E", "D", "C", "E", "A",

    "D", "D", "B", "D", "B",
    "A", "A", "B", "D", "B",

    "C", "C", "D", "D", "C",
    "C", "C", "E", "D", "A",

    "C", "A", "D", "A", "D",
    "D", "C", "B", "C", "C"

];


const generalCultureAnswers = [

    "D", "A", "E", "B", "E",
    "C", "D", "E", "B", "C",

    "A", "C", "A", "B", "D",
    "C", "E", "E", "D", "A",

    "B", "A", "A", "D", "A",
    "C", "B", "A", "A", "C",

    "B", "D", "E", "B", "D",
    "C", "A", "C", "A", "E",

    "B", "D", "D", "B", "E",
    "D", "B", "E", "A", "B",

    "C", "C", "E", "D", "E",
    "C", "A", "D", "B", "E"

];


// ======================================================
// CEVAPLARI YÜKLE
// ======================================================

let userAnswers = {};

try {

    userAnswers =
        JSON.parse(
            localStorage.getItem("kpss2016Answers")
        ) || {};

} catch (error) {

    userAnswers = {};

}


// ======================================================
// CEVAP KAYDI
// ======================================================

function saveAnswers() {

    localStorage.setItem(
        "kpss2016Answers",
        JSON.stringify(userAnswers)
    );

}


function getStorageKey(subjectKey, questionNumber) {

    return `${subjectKey}_${questionNumber}`;

}


// ======================================================
// DOĞRU CEVABI BUL
// ======================================================

function getAnswerForSubjectQuestion(
    subjectKey,
    questionNumber
) {

    const subject = subjects[subjectKey];

    if (subject.answerSource === "gy") {

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
        "kpss2016Mode",
        mode
    );

    examFinished = false;

    updateModeUI();
    updateAnswerUI();
    updateQuestionGrid();

}


function updateModeUI() {

    const study =
        document.getElementById("studyModeButton");

    const exam =
        document.getElementById("examModeButton");

    const description =
        document.getElementById("modeDescription");


    study.classList.toggle(
        "active",
        currentMode === "study"
    );

    exam.classList.toggle(
        "active",
        currentMode === "exam"
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

    currentSubject = subjectKey;

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
                button.dataset.subject === subjectKey
            );

        });


    loadPdfPage();

    updateEverything();

}


// ======================================================
// SORU SEÇ
// ======================================================

function selectQuestion(questionNumber) {

    const subject =
        subjects[currentSubject];

    if (
        questionNumber < subject.firstQuestion ||
        questionNumber > subject.lastQuestion
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
// SONRAKİ SORU
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


// ======================================================
// ÖNCEKİ SORU
// ======================================================

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

    userAnswers[key] = answer;

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
                button.dataset.answer === selected
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
                    button.dataset.answer === correct
                ) {

                    button.classList.add(
                        "correct"
                    );

                }

                if (
                    button.dataset.answer === selected &&
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
                    button.dataset.answer === correct
                ) {

                    button.classList.add(
                        "correct"
                    );

                }

                if (
                    button.dataset.answer === selected &&
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
            document.createElement("button");

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


        if (q === currentQuestion) {

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

            if (selected === correct) {

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


        grid.appendChild(button);

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
// SORU BAŞLIĞI
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

function calculateSubjectResult(subjectKey) {

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
            selected === correctAnswer
        ) {

            correct++;

        } else {

            wrong++;

        }

    }


    const net =
        correct - (wrong / 4);


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

            totalCorrect += r.correct;
            totalWrong += r.wrong;
            totalEmpty += r.empty;
            totalNet += r.net;

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


        if (selected !== correct) {

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


            totalCorrect += result.correct;
            totalWrong += result.wrong;
            totalEmpty += result.empty;
            totalNet += result.net;


            const row =
                document.createElement("div");

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
// TÜM SINAVI SIFIRLA
// ======================================================

function resetAllExam() {

    const confirmReset =
        confirm(
            "2016 KPSS sınavındaki tüm cevapların silinecek. Emin misin?"
        );


    if (!confirmReset) return;


    localStorage.removeItem(
        "kpss2016Answers"
    );


    userAnswers = {};

    examFinished = false;


    currentSubject = "turkce";
    currentQuestion = 1;
    currentPdfPage = 3;


    document
        .querySelectorAll(".subject-button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.subject === "turkce"
            );

        });


    loadPdfPage();

    updateEverything();

}


// ======================================================
// PDF SAYFA EŞLEŞTİRME
// ======================================================

function getPdfPageForQuestion(
    subjectKey,
    questionNumber
) {

    /*
        PDF'nin fiziksel sayfalarına göre
        soru -> sayfa eşleştirmesi.
    */


    // TÜRKÇE
    if (subjectKey === "turkce") {

        if (questionNumber <= 4) return 3;
        if (questionNumber <= 9) return 4;
        if (questionNumber <= 15) return 5;
        if (questionNumber <= 19) return 6;
        if (questionNumber <= 21) return 7;
        if (questionNumber <= 23) return 8;
        return 9;

    }


    // MATEMATİK
    if (subjectKey === "matematik") {

        if (questionNumber <= 35) return 11;
        if (questionNumber <= 39) return 12;
        if (questionNumber <= 43) return 13;
        if (questionNumber <= 49) return 14;
        if (questionNumber <= 53) return 15;
        if (questionNumber <= 56) return 16;

        return 17;

    }


    // TARİH
    if (subjectKey === "tarih") {

        if (questionNumber <= 7) return 18;
        if (questionNumber <= 13) return 19;
        if (questionNumber <= 19) return 20;
        if (questionNumber <= 26) return 21;

        return 22;

    }


    // COĞRAFYA
    if (subjectKey === "cografya") {

        if (questionNumber <= 33) return 22;
        if (questionNumber <= 37) return 23;
        if (questionNumber <= 43) return 24;

        return 25;

    }


    // VATANDAŞLIK
    if (subjectKey === "vatandaslik") {

        if (questionNumber <= 50) return 25;

        return 26;

    }


    // GÜNCEL
    if (subjectKey === "guncel") {

        if (questionNumber <= 57) return 26;

        return 27;

    }


    return 3;

}


// ======================================================
// PDF YÜKLE
// ======================================================

function loadPdfPage() {
 currentPdfPage=Math.max(1,Math.min(TOTAL_PDF_PAGES,currentPdfPage));
 const input=document.getElementById("pdfPageInput"), info=document.getElementById("pdfPageInfo");
 if(input) input.value=currentPdfPage;
 if(info) info.textContent=`Sayfa ${currentPdfPage} / ${TOTAL_PDF_PAGES}`;
 renderPdfPage();
}


// ======================================================
// PDF SONRAKİ SAYFA
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


// ======================================================
// PDF ÖNCEKİ SAYFA
// ======================================================

function previousPdfPage() {

    if (
        currentPdfPage > 1
    ) {

        currentPdfPage--;

        loadPdfPage();

    }

}


// ======================================================
// PDF SAYFAYA GİT
// ======================================================

function goToPdfPage() {

    const input =
        document.getElementById(
            "pdfPageInput"
        );


    let page =
        parseInt(input.value);


    if (isNaN(page)) {

        page = currentPdfPage;

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
// TAM EKRAN
// ======================================================

function togglePdfFullscreen() {

    const container =
        document.getElementById(
            "pdfContainer"
        );


    if (!document.fullscreenElement) {

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
    function (event) {

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
// HER ŞEYİ GÜNCELLE
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
let pdfResizeTimer;window.addEventListener("resize",()=>{clearTimeout(pdfResizeTimer);pdfResizeTimer=setTimeout(renderPdfPage,180);});
