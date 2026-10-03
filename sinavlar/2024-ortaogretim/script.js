const TOTAL_PDF_PAGES = 28;

const PDF_FILE = "2024-kpss.pdf";
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


const answerKeys = {
    gy: ["B","C","E","E","B","A","E","B","D","B","B","D","A","A","C","A","D","E","A","C","B","E","E","D","B","D","E","A","C","B","E","A","C","B","B","C","E","E","B","A","E","B","D","A","E","C","D","D","B","B","A","D","B","D","E","C","C","A","D","D"],
    gk: ["E","A","B","D","D","A","D","D","C","C","A","A","B","C","A","B","E","C","D","C","B","E","B","C","E","A","A","E","B","B","A","C","C","D","A","D","C","D","A","E","E","D","B","C","E","B","C","A","E","C","B","E","D","A","B","D","E","C","E","A"]
};

const subjects = [
    {key:"turkce",name:"Türkçe",test:"gy",start:1,end:30,startPage:1},
    {key:"matematik",name:"Matematik",test:"gy",start:31,end:60,startPage:10},
    {key:"tarih",name:"Tarih",test:"gk",start:1,end:27,startPage:18},
    {key:"cografya",name:"Coğrafya",test:"gk",start:28,end:45,startPage:23},
    {key:"vatandaslik",name:"Vatandaşlık",test:"gk",start:46,end:54,startPage:26},
    {key:"guncel",name:"Güncel Bilgiler",test:"gk",start:55,end:60,startPage:28}
];

const pageMaps = {
    turkce:[[1,5,1],[6,9,2],[10,13,3],[14,16,4],[17,19,5],[20,21,6],[22,23,7],[24,26,8],[27,30,9]],
    matematik:[[31,35,10],[36,39,11],[40,43,12],[44,47,13],[48,51,14],[52,53,15],[54,56,16],[57,60,17]],
    tarih:[[1,5,18],[6,10,19],[11,16,20],[17,21,21],[22,27,22]],
    cografya:[[28,32,23],[33,36,24],[37,40,25],[41,45,26]],
    vatandaslik:[[46,46,26],[47,53,27],[54,54,28]],
    guncel:[[55,60,28]]
};

let currentSubjectKey=localStorage.getItem("kpss2024Subject")||"turkce";
let currentQuestion=Number(localStorage.getItem("kpss2024Question"))||1;
let currentPdfPage=1;
let mode=localStorage.getItem("kpss2024Mode")||"study";
let answers=JSON.parse(localStorage.getItem("kpss2024Answers")||"{}");

function getSubject(key=currentSubjectKey){return subjects.find(s=>s.key===key)}
function answerId(test,q){return `${test}-${q}`}
function getCorrectAnswer(subject,q){return answerKeys[subject.test][q-1]}
function getPdfPage(subjectKey,q){const f=pageMaps[subjectKey].find(([a,b])=>q>=a&&q<=b);return f?f[2]:getSubject(subjectKey).startPage}

function init(){createSubjectList();createAnswerOptions();setMode(mode,false);const s=getSubject();if(currentQuestion<s.start||currentQuestion>s.end)currentQuestion=s.start;selectQuestion(currentQuestion);updateAllStats()}
function createSubjectList(){const list=document.getElementById("subjectList");list.innerHTML="";subjects.forEach(s=>{const b=document.createElement("button");b.className="subject-button";b.dataset.key=s.key;b.innerHTML=`<span>${s.name}</span><small>${s.test==="gy"?"Genel Yetenek":"Genel Kültür"} • ${s.start}-${s.end}</small>`;b.onclick=()=>selectSubject(s.key);list.appendChild(b)})}
function selectSubject(key){currentSubjectKey=key;currentQuestion=getSubject().start;localStorage.setItem("kpss2024Subject",key);selectQuestion(currentQuestion)}
function createAnswerOptions(){const w=document.getElementById("answerOptions");["A","B","C","D","E"].forEach(l=>{const b=document.createElement("button");b.className="answer-option";b.textContent=l;b.onclick=()=>chooseAnswer(l);w.appendChild(b)})}

function selectQuestion(q){const s=getSubject();currentQuestion=Math.max(s.start,Math.min(s.end,Number(q)));localStorage.setItem("kpss2024Question",currentQuestion);localStorage.setItem("kpss2024Subject",currentSubjectKey);document.querySelectorAll(".subject-button").forEach(b=>b.classList.toggle("active",b.dataset.key===currentSubjectKey));const test=s.test==="gy"?"GENEL YETENEK":"GENEL KÜLTÜR";document.getElementById("currentSubjectLabel").textContent=test;document.getElementById("currentSubjectName").textContent=s.name;document.getElementById("questionTestLabel").textContent=test;document.getElementById("questionSubjectLabel").textContent=s.name;document.getElementById("questionNumber").textContent=currentQuestion;document.getElementById("gridRange").textContent=`${s.start}–${s.end}`;currentPdfPage=getPdfPage(currentSubjectKey,currentQuestion);loadPdfPage();renderQuestionGrid();renderCurrentAnswer();renderSubjectStats()}

function chooseAnswer(letter){const s=getSubject();answers[answerId(s.test,currentQuestion)]=letter;save();renderCurrentAnswer();renderQuestionGrid();updateAllStats()}
function clearCurrentAnswer(){const s=getSubject();delete answers[answerId(s.test,currentQuestion)];save();renderCurrentAnswer();renderQuestionGrid();updateAllStats()}
function save(){localStorage.setItem("kpss2024Answers",JSON.stringify(answers))}

function renderCurrentAnswer(){const s=getSubject(),selected=answers[answerId(s.test,currentQuestion)],correct=getCorrectAnswer(s,currentQuestion),buttons=[...document.querySelectorAll(".answer-option")],f=document.getElementById("answerFeedback");buttons.forEach(b=>{b.className="answer-option";if(b.textContent===selected)b.classList.add("selected");if(mode==="study"&&selected){if(b.textContent===correct)b.classList.add("correct");if(b.textContent===selected&&selected!==correct)b.classList.add("wrong")}});f.className="answer-feedback";f.textContent="";if(mode==="study"&&selected){if(selected===correct){f.classList.add("good");f.textContent=`Doğru cevap: ${correct}`}else{f.classList.add("bad");f.textContent=`Yanlış. Doğru cevap: ${correct}`}}else if(mode==="exam"&&selected)f.textContent=`Cevabın kaydedildi: ${selected}`}
function setMode(m,rerender=true){mode=m;localStorage.setItem("kpss2024Mode",mode);document.getElementById("studyModeButton").classList.toggle("active",mode==="study");document.getElementById("examModeButton").classList.toggle("active",mode==="exam");if(rerender){renderCurrentAnswer();renderQuestionGrid()}}
function changeQuestion(d){const s=getSubject(),n=currentQuestion+d;if(n>=s.start&&n<=s.end)return selectQuestion(n);const i=subjects.findIndex(x=>x.key===currentSubjectKey),ns=subjects[i+(d>0?1:-1)];if(ns){currentSubjectKey=ns.key;selectQuestion(d>0?ns.start:ns.end)}}

function renderQuestionGrid(){const s=getSubject(),g=document.getElementById("questionGrid");g.innerHTML="";for(let q=s.start;q<=s.end;q++){const b=document.createElement("button"),sel=answers[answerId(s.test,q)];b.textContent=q;if(q===currentQuestion)b.classList.add("current");if(sel)b.classList.add("answered");if(mode==="study"&&sel)b.classList.add(sel===getCorrectAnswer(s,q)?"correct":"wrong");b.onclick=()=>selectQuestion(q);g.appendChild(b)}}

function loadPdfPage() {
 currentPdfPage=Math.max(1,Math.min(TOTAL_PDF_PAGES,currentPdfPage));
 const input=document.getElementById("pdfPageInput"), info=document.getElementById("pdfPageInfo");
 if(input) input.value=currentPdfPage;
 if(info) info.textContent=`Sayfa ${currentPdfPage} / ${TOTAL_PDF_PAGES}`;
 renderPdfPage();
}
function changePdfPage(d){currentPdfPage+=d;loadPdfPage()}
function goToPdfPage(v){currentPdfPage=Number(v)||1;loadPdfPage()}
function togglePdfFullscreen(){const e=document.getElementById("pdfContainer");if(!document.fullscreenElement)e.requestFullscreen?.();else document.exitFullscreen?.()}

function getSubjectStats(s){let correct=0,wrong=0,empty=0;for(let q=s.start;q<=s.end;q++){const a=answers[answerId(s.test,q)];if(!a)empty++;else if(a===getCorrectAnswer(s,q))correct++;else wrong++}return{correct,wrong,empty,net:correct-wrong/4}}
function renderSubjectStats(){const s=getSubjectStats(getSubject());document.getElementById("subjectStats").innerHTML=`Bu bölüm: <b>${s.correct} doğru</b> • <b>${s.wrong} yanlış</b> • <b>${s.empty} boş</b> • <b>${s.net.toFixed(2)} net</b>`}
function updateAllStats(){let c=0,w=0,e=0;subjects.forEach(s=>{const x=getSubjectStats(s);c+=x.correct;w+=x.wrong;e+=x.empty});document.getElementById("totalCorrect").textContent=c;document.getElementById("totalWrong").textContent=w;document.getElementById("totalEmpty").textContent=e;document.getElementById("totalNet").textContent=(c-w/4).toFixed(2);renderSubjectStats()}

function goFirstWrong(){for(const s of subjects)for(let q=s.start;q<=s.end;q++){const a=answers[answerId(s.test,q)];if(a&&a!==getCorrectAnswer(s,q)){currentSubjectKey=s.key;selectQuestion(q);return}}alert("Yanlış cevap bulunmuyor.")}
function goFirstEmpty(){for(const s of subjects)for(let q=s.start;q<=s.end;q++)if(!answers[answerId(s.test,q)]){currentSubjectKey=s.key;selectQuestion(q);return}alert("Boş soru bulunmuyor.")}

function finishExam(){let html="",c=0,w=0,e=0,n=0;subjects.forEach(s=>{const x=getSubjectStats(s);c+=x.correct;w+=x.wrong;e+=x.empty;n+=x.net;html+=`<div class="result-subject-row"><span>${s.name}</span><b>${x.correct} D</b><b>${x.wrong} Y</b><b>${x.empty} B</b><b>${x.net.toFixed(2)}</b></div>`});document.getElementById("modalNet").textContent=n.toFixed(2);document.getElementById("resultSubjects").innerHTML=html;document.getElementById("resultSummary").innerHTML=`Toplam: <b>${c} doğru</b> • <b>${w} yanlış</b> • <b>${e} boş</b>`;document.getElementById("resultModal").classList.add("show")}
function closeResult(){document.getElementById("resultModal").classList.remove("show")}
function resetExam(){if(!confirm("2024 sınavındaki bütün işaretlemeler silinsin mi?"))return;answers={};localStorage.removeItem("kpss2024Answers");renderCurrentAnswer();renderQuestionGrid();updateAllStats()}
init();

let pdfResizeTimer;window.addEventListener("resize",()=>{clearTimeout(pdfResizeTimer);pdfResizeTimer=setTimeout(renderPdfPage,180);});
