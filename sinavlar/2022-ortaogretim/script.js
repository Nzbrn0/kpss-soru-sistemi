const TOTAL_PDF_PAGES = 32;

const answerKeys = {
    gy: ["A","D","E","D","E","B","C","A","C","C","B","B","B","E","C","E","A","A","D","B","E","A","B","A","E","D","D","C","A","A","B","C","C","C","B","E","B","A","B","C","D","A","B","B","C","D","A","E","A","E","C","A","D","D","E","C","D","C","E","D"],
    gk: ["E","A","A","B","A","D","C","E","B","D","A","C","E","C","C","A","A","E","C","C","D","B","B","D","D","B","C","D","B","E","E","D","A","D","A","E","D","B","C","C","E","A","B","E","C","B","A","E","C","C","A","B","D","A","E","D","E","B","C","B"]
};

const subjects = [
    {key:"turkce", name:"Türkçe", test:"gy", start:1, end:30, startPage:1},
    {key:"matematik", name:"Matematik", test:"gy", start:31, end:60, startPage:12},
    {key:"tarih", name:"Tarih", test:"gk", start:1, end:27, startPage:19},
    {key:"cografya", name:"Coğrafya", test:"gk", start:28, end:45, startPage:25},
    {key:"vatandaslik", name:"Vatandaşlık", test:"gk", start:46, end:55, startPage:30},
    {key:"guncel", name:"Güncel Bilgiler", test:"gk", start:56, end:60, startPage:32}
];

// 32 sayfalık, görsellerden oluşturulan PDF'ye göre kesin sayfa eşlemesi.
const pageMaps = {
    turkce: [
        [1,4,1],[5,8,2],[9,11,3],[12,13,4],[14,15,5],[16,17,6],
        [18,19,7],[20,21,8],[22,23,9],[24,26,10],[27,30,11]
    ],
    matematik: [
        [31,36,12],[37,40,13],[41,44,14],[45,48,15],[49,53,16],
        [54,56,17],[57,60,18]
    ],
    tarih: [
        [1,3,19],[4,7,20],[8,11,21],[12,15,22],[16,19,23],
        [20,24,24],[25,27,25]
    ],
    cografya: [
        [28,28,25],[29,32,26],[33,37,27],[38,41,28],[42,45,29]
    ],
    vatandaslik: [
        [46,50,30],[51,55,31]
    ],
    guncel: [
        [56,60,32]
    ]
};

let currentSubjectKey = localStorage.getItem("kpss2022Subject") || "turkce";
let currentQuestion = Number(localStorage.getItem("kpss2022Question")) || 1;
let currentPdfPage = 1;
let mode = localStorage.getItem("kpss2022Mode") || "study";
let answers = JSON.parse(localStorage.getItem("kpss2022Answers") || "{}");

function getSubject(key=currentSubjectKey) {
    return subjects.find(s => s.key === key);
}

function answerId(test, question) {
    return `${test}-${question}`;
}

function getCorrectAnswer(subject, question) {
    return answerKeys[subject.test][question - 1];
}

function getPdfPage(subjectKey, questionNumber) {
    const ranges = pageMaps[subjectKey];
    const found = ranges.find(([a,b]) => questionNumber >= a && questionNumber <= b);
    return found ? found[2] : getSubject(subjectKey).startPage;
}

function init() {
    createSubjectList();
    createAnswerOptions();
    setMode(mode, false);

    const subject = getSubject();
    if (currentQuestion < subject.start || currentQuestion > subject.end) {
        currentQuestion = subject.start;
    }

    selectQuestion(currentQuestion, false);
    updateAllStats();
}

function createSubjectList() {
    const list = document.getElementById("subjectList");
    list.innerHTML = "";

    subjects.forEach(subject => {
        const button = document.createElement("button");
        button.className = "subject-button";
        button.dataset.key = subject.key;
        button.innerHTML = `
            <span>${subject.name}</span>
            <small>${subject.test === "gy" ? "Genel Yetenek" : "Genel Kültür"} • ${subject.start}-${subject.end}</small>
        `;
        button.onclick = () => selectSubject(subject.key);
        list.appendChild(button);
    });
}

function selectSubject(key) {
    currentSubjectKey = key;
    const subject = getSubject();
    currentQuestion = subject.start;
    localStorage.setItem("kpss2022Subject", currentSubjectKey);
    selectQuestion(currentQuestion);
}

function createAnswerOptions() {
    const wrap = document.getElementById("answerOptions");
    wrap.innerHTML = "";
    ["A","B","C","D","E"].forEach(letter => {
        const button = document.createElement("button");
        button.className = "answer-option";
        button.textContent = letter;
        button.onclick = () => chooseAnswer(letter);
        wrap.appendChild(button);
    });
}

function selectQuestion(question, loadPdf=true) {
    const subject = getSubject();
    currentQuestion = Math.max(subject.start, Math.min(subject.end, Number(question)));

    localStorage.setItem("kpss2022Question", currentQuestion);
    localStorage.setItem("kpss2022Subject", currentSubjectKey);

    document.querySelectorAll(".subject-button").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.key === currentSubjectKey);
    });

    document.getElementById("currentSubjectLabel").textContent =
        subject.test === "gy" ? "GENEL YETENEK" : "GENEL KÜLTÜR";
    document.getElementById("currentSubjectName").textContent = subject.name;
    document.getElementById("questionTestLabel").textContent =
        subject.test === "gy" ? "GENEL YETENEK" : "GENEL KÜLTÜR";
    document.getElementById("questionSubjectLabel").textContent = subject.name;
    document.getElementById("questionNumber").textContent = currentQuestion;
    document.getElementById("gridRange").textContent = `${subject.start}–${subject.end}`;

    if (loadPdf) {
        currentPdfPage = getPdfPage(currentSubjectKey, currentQuestion);
        loadPdfPage();
    } else {
        currentPdfPage = getPdfPage(currentSubjectKey, currentQuestion);
        loadPdfPage();
    }

    renderQuestionGrid();
    renderCurrentAnswer();
    renderSubjectStats();
}

function chooseAnswer(letter) {
    const subject = getSubject();
    answers[answerId(subject.test, currentQuestion)] = letter;
    localStorage.setItem("kpss2022Answers", JSON.stringify(answers));
    renderCurrentAnswer();
    renderQuestionGrid();
    updateAllStats();
}

function clearCurrentAnswer() {
    const subject = getSubject();
    delete answers[answerId(subject.test, currentQuestion)];
    localStorage.setItem("kpss2022Answers", JSON.stringify(answers));
    renderCurrentAnswer();
    renderQuestionGrid();
    updateAllStats();
}

function renderCurrentAnswer() {
    const subject = getSubject();
    const selected = answers[answerId(subject.test, currentQuestion)];
    const correct = getCorrectAnswer(subject, currentQuestion);
    const buttons = [...document.querySelectorAll(".answer-option")];
    const feedback = document.getElementById("answerFeedback");

    buttons.forEach(btn => {
        btn.className = "answer-option";
        if (btn.textContent === selected) btn.classList.add("selected");

        if (mode === "study" && selected) {
            if (btn.textContent === correct) btn.classList.add("correct");
            if (btn.textContent === selected && selected !== correct) btn.classList.add("wrong");
        }
    });

    feedback.className = "answer-feedback";
    feedback.textContent = "";

    if (mode === "study" && selected) {
        if (selected === correct) {
            feedback.classList.add("good");
            feedback.textContent = `Doğru cevap: ${correct}`;
        } else {
            feedback.classList.add("bad");
            feedback.textContent = `Yanlış. Doğru cevap: ${correct}`;
        }
    } else if (mode === "exam" && selected) {
        feedback.textContent = `Cevabın kaydedildi: ${selected}`;
    }
}

function setMode(newMode, rerender=true) {
    mode = newMode;
    localStorage.setItem("kpss2022Mode", mode);
    document.getElementById("studyModeButton").classList.toggle("active", mode === "study");
    document.getElementById("examModeButton").classList.toggle("active", mode === "exam");
    if (rerender) {
        renderCurrentAnswer();
        renderQuestionGrid();
    }
}

function changeQuestion(delta) {
    const subject = getSubject();
    const next = currentQuestion + delta;
    if (next >= subject.start && next <= subject.end) {
        selectQuestion(next);
        return;
    }

    const index = subjects.findIndex(s => s.key === currentSubjectKey);
    const nextSubject = subjects[index + (delta > 0 ? 1 : -1)];
    if (nextSubject) {
        currentSubjectKey = nextSubject.key;
        currentQuestion = delta > 0 ? nextSubject.start : nextSubject.end;
        selectQuestion(currentQuestion);
    }
}

function renderQuestionGrid() {
    const subject = getSubject();
    const grid = document.getElementById("questionGrid");
    grid.innerHTML = "";

    for (let q = subject.start; q <= subject.end; q++) {
        const button = document.createElement("button");
        button.textContent = q;

        const selected = answers[answerId(subject.test, q)];
        if (q === currentQuestion) button.classList.add("current");
        if (selected) button.classList.add("answered");

        if (mode === "study" && selected) {
            button.classList.add(selected === getCorrectAnswer(subject, q) ? "correct" : "wrong");
        }

        button.onclick = () => selectQuestion(q);
        grid.appendChild(button);
    }
}

function loadPdfPage() {
    currentPdfPage = Math.max(1, Math.min(TOTAL_PDF_PAGES, currentPdfPage));

    const frame = document.getElementById("pdfFrame");
    frame.src = "about:blank";

    const targetPage = currentPdfPage;
    setTimeout(function () {
        frame.src = `2022-kpss.pdf#page=${targetPage}&zoom=page-width`;
    }, 40);

    document.getElementById("pdfPageInput").value = currentPdfPage;
    document.getElementById("pdfPageInfo").textContent =
        `Sayfa ${currentPdfPage} / ${TOTAL_PDF_PAGES}`;
}

function changePdfPage(delta) {
    currentPdfPage += delta;
    loadPdfPage();
}

function goToPdfPage(value) {
    currentPdfPage = Number(value) || 1;
    loadPdfPage();
}

function togglePdfFullscreen() {
    const el = document.getElementById("pdfContainer");
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
}

function getSubjectStats(subject) {
    let correct = 0, wrong = 0, empty = 0;

    for (let q = subject.start; q <= subject.end; q++) {
        const selected = answers[answerId(subject.test, q)];
        if (!selected) empty++;
        else if (selected === getCorrectAnswer(subject, q)) correct++;
        else wrong++;
    }

    return {correct, wrong, empty, net: correct - wrong / 4};
}

function renderSubjectStats() {
    const s = getSubjectStats(getSubject());
    document.getElementById("subjectStats").innerHTML =
        `Bu bölüm: <b>${s.correct} doğru</b> • <b>${s.wrong} yanlış</b> • ` +
        `<b>${s.empty} boş</b> • <b>${s.net.toFixed(2)} net</b>`;
}

function updateAllStats() {
    let correct=0, wrong=0, empty=0;

    subjects.forEach(subject => {
        const s = getSubjectStats(subject);
        correct += s.correct;
        wrong += s.wrong;
        empty += s.empty;
    });

    document.getElementById("totalCorrect").textContent = correct;
    document.getElementById("totalWrong").textContent = wrong;
    document.getElementById("totalEmpty").textContent = empty;
    document.getElementById("totalNet").textContent = (correct - wrong / 4).toFixed(2);
    renderSubjectStats();
}

function goFirstWrong() {
    for (const subject of subjects) {
        for (let q=subject.start; q<=subject.end; q++) {
            const selected = answers[answerId(subject.test, q)];
            if (selected && selected !== getCorrectAnswer(subject, q)) {
                currentSubjectKey = subject.key;
                selectQuestion(q);
                return;
            }
        }
    }
    alert("Yanlış cevap bulunmuyor.");
}

function goFirstEmpty() {
    for (const subject of subjects) {
        for (let q=subject.start; q<=subject.end; q++) {
            if (!answers[answerId(subject.test, q)]) {
                currentSubjectKey = subject.key;
                selectQuestion(q);
                return;
            }
        }
    }
    alert("Boş soru bulunmuyor.");
}

function finishExam() {
    let html = "";
    let totalCorrect=0, totalWrong=0, totalEmpty=0, totalNet=0;

    subjects.forEach(subject => {
        const s = getSubjectStats(subject);
        totalCorrect += s.correct;
        totalWrong += s.wrong;
        totalEmpty += s.empty;
        totalNet += s.net;

        html += `
            <div class="result-subject-row">
                <span>${subject.name}</span>
                <b>${s.correct} D</b>
                <b>${s.wrong} Y</b>
                <b>${s.empty} B</b>
                <b>${s.net.toFixed(2)}</b>
            </div>`;
    });

    document.getElementById("modalNet").textContent = totalNet.toFixed(2);
    document.getElementById("resultSubjects").innerHTML = html;
    document.getElementById("resultSummary").innerHTML =
        `Toplam: <b>${totalCorrect} doğru</b> • <b>${totalWrong} yanlış</b> • ` +
        `<b>${totalEmpty} boş</b>`;
    document.getElementById("resultModal").classList.add("show");
}

function closeResult() {
    document.getElementById("resultModal").classList.remove("show");
}

function resetExam() {
    if (!confirm("2022 sınavındaki bütün işaretlemeler silinsin mi?")) return;
    answers = {};
    localStorage.removeItem("kpss2022Answers");
    renderCurrentAnswer();
    renderQuestionGrid();
    updateAllStats();
}

init();
