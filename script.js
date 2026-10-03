let currentMode = "topic";
let currentSubject = null;


/* =========================
   ANA SAYFA → MENÜ
========================= */

function startApp() {

    document.getElementById("home").classList.remove("active");

    document.getElementById("menu").classList.add("active");

}

function goBack() {

    document.getElementById("subjects")
        .classList.remove("active");

    document.getElementById("menu")
        .classList.add("active");
}


/* =========================
   KONU / SORU SEÇİMİ
========================= */

function showSubjects(type) {

    currentMode = type;

    // SORU ÇÖZÜMÜ
    // Artık derslere değil sınavlara gider.

    if (type === "question") {

        window.location.href =
            "sinavlar/index.html";

        return;
    }


    // KONU ANLATIMI
    // Eski sistem aynen devam eder.

    document.getElementById("menu")
        .classList.remove("active");

    document.getElementById("subjects")
        .classList.add("active");

    document.getElementById(
        "subjectTitle"
    ).textContent =
        "Konu Anlatımı";

    createSubjectList();
}


/* =========================
   DERSLERİ OLUŞTUR
========================= */
function createSubjectList() {

    const subjectList =
        document.getElementById("subjectList");

    subjectList.innerHTML = "";

    const subjects =
        Object.entries(kpssSubjects);


    subjects.forEach((item, index) => {

        const key = item[0];
        const subject = item[1];

        const button =
            document.createElement("button");

        button.className =
            "subject-button";

        button.innerHTML = `
            <span>
                ${String(index + 1).padStart(2, "0")}
            </span>

            ${subject.name}

            <b>→</b>
        `;


        button.onclick = function () {

            /*
                SORU ÇÖZÜMÜ MODU
            */

            if (currentMode === "question") {

                window.location.href =
                    `sorular/index.html?ders=${key}`;

                return;
            }


            /*
                KONU ANLATIMI MODU
            */

            openSubject(key);
        };


        subjectList.appendChild(button);
    });
}




/* =========================
   DERSİ AÇ
========================= */

function openSubject(subjectKey) {

    currentSubject = subjectKey;


    document.getElementById("subjects")
        .classList.remove("active");


    document.getElementById("topics")
        .classList.add("active");


    const subject =
        kpssSubjects[subjectKey];


    document.getElementById("topicTitle")
        .textContent = subject.name;


    createTopicList();

}


/* =========================
   KONULARI OLUŞTUR
========================= */

function createTopicList() {

    const topicList =
        document.getElementById("topicList");


    topicList.innerHTML = "";


    const topics =
        kpssSubjects[currentSubject].topics;


    topics.forEach((topic, index) => {

        const button =
            document.createElement("button");


        button.className = "subject-button";


        button.innerHTML = `

            <span>
                ${String(index + 1).padStart(2, "0")}
            </span>

            ${topic}

            <b>→</b>

        `;


        button.onclick = function () {

            openTopic(topic);

        };


        topicList.appendChild(button);

    });

}


/* =========================
   KONUYA TIKLANDI
========================= */

function openTopic(topic) {

    if (currentSubject === "turkce") {

        const turkceTopics = {

            "Sözcükte Anlam":
                "konular/turkce/sozcukte-anlam/index.html",

            "Cümlede Anlam":
                "konular/turkce/cumlede-anlam/index.html",

            "Paragraf":
                "konular/turkce/paragraf/index.html",

            "Ses Bilgisi":
                "konular/turkce/ses-bilgisi/index.html",

            "Yazım Kuralları":
                "konular/turkce/yazim-kurallari/index.html",

            "Noktalama İşaretleri":
                "konular/turkce/noktalama-isaretleri/index.html",

            "Sözcük Türleri":
                "konular/turkce/sozcuk-turleri/index.html",

            "Fiiller":
                "konular/turkce/fiiller/index.html",

            "Cümlenin Ögeleri":
                "konular/turkce/cumlenin-ogeleri/index.html",

            "Cümle Türleri":
                "konular/turkce/cumle-turleri/index.html",

            "Anlatım Bozuklukları":
                "konular/turkce/anlatim-bozukluklari/index.html",

            "Sözel Mantık":
                "konular/turkce/sozel-mantik/index.html"

        };


        if (turkceTopics[topic]) {

            window.location.href =
                turkceTopics[topic];

            return;

        }

    }

if (currentSubject === "matematik") {

    const matematikTopics = {

    "Temel Kavramlar":
        "konular/matematik/temel-kavramlar/index.html",

    "Sayı Basamakları":
        "konular/matematik/sayi-basamaklari/index.html",

    "Bölme ve Bölünebilme":
        "konular/matematik/bolme-ve-bolunebilme/index.html",

    "EBOB - EKOK":
        "konular/matematik/ebob-ekok/index.html",

    "Asal Sayılar":
        "konular/matematik/asal-sayilar/index.html",

    "Rasyonel Sayılar":
    "konular/matematik/rasyonel-sayilar/index.html",

"Basit Eşitsizlikler":
    "konular/matematik/basit-esitsizlikler/index.html",

"Mutlak Değer":
    "konular/matematik/mutlak-deger/index.html",

    "Üslü Sayılar":
    "konular/matematik/uslu-sayilar/index.html",

    "Köklü Sayılar":
    "konular/matematik/koklu-sayilar/index.html",

    "Oran - Orantı":
    "konular/matematik/oran-oranti/index.html",

    "Denklem Çözme":
    "konular/matematik/denklem-cozme/index.html",

    "Problemler":
    "konular/matematik/problemler/index.html",

    "Kümeler":
    "konular/matematik/kumeler/index.html",

    "Fonksiyonlar":
    "konular/matematik/fonksiyonlar/index.html",

    "Permütasyon":
    "konular/matematik/permutasyon/index.html",

    "Kombinasyon":
    "konular/matematik/kombinasyon/index.html",

    "Olasılık":
    "konular/matematik/olasilik/index.html",

    "Veri - İstatistik":
    "konular/matematik/veri-istatistik/index.html",

    "Geometri":
    "konular/matematik/geometri/index.html",

};

    if (matematikTopics[topic]) {

        window.location.href =
            matematikTopics[topic];

        return;
    }
}

if (currentSubject === "tarih") {

    const tarihTopics = {

        "İslamiyet Öncesi Türk Tarihi":
            "konular/tarih/islamiyet-oncesi-turk-tarihi/index.html",
        
        "İlk Türk-İslam Devletleri":
            "konular/tarih/ilk-turk-islam-devletleri/index.html",

        "Osmanlı Tarihi":
                "konular/tarih/osmanli-tarihi/index.html",

        "Osmanlı Kültür ve Medeniyeti":
            "konular/tarih/osmanli-kultur-ve-medeniyeti/index.html",

        "Osmanlı Devleti'nde Yenileşme Hareketleri":
            "konular/tarih/osmanli-yenilesme-hareketleri/index.html",

        "XX. Yüzyılda Osmanlı Devleti":
            "konular/tarih/yirminci-yuzyilda-osmanli/index.html",

        "Kurtuluş Savaşı Hazırlık Dönemi":
                "konular/tarih/kurtulus-savasi-hazirlik-donemi/index.html",

        "I. TBMM Dönemi":
                "konular/tarih/i-tbmm-donemi/index.html",

        "Kurtuluş Savaşı":
                "konular/tarih/kurtulus-savasi/index.html",

        "Atatürk Dönemi İç Politika":
            "konular/tarih/ataturk-donemi-ic-politika/index.html",

        "Atatürk Dönemi Dış Politika":
    "konular/tarih/ataturk-donemi-dis-politika/index.html",
        
        "Atatürk İlkeleri ve İnkılapları":
    "konular/tarih/ataturk-ilkeleri-ve-inkilaplari/index.html",

    "Çağdaş Türk ve Dünya Tarihi":
    "konular/tarih/cagdas-turk-ve-dunya-tarihi/index.html",


    };

    if (tarihTopics[topic]) {

        window.location.href =
            tarihTopics[topic];

        return;
    }
}

if (currentSubject === "cografya") {

    const cografyaTopics = {

        "Türkiye'nin Coğrafi Konumu":
            "konular/cografya/turkiyenin-cografi-konumu/index.html",

        "Türkiye'nin Yer Şekilleri":
            "konular/cografya/turkiyenin-yer-sekilleri/index.html",

        "Türkiye'de İklim":
            "konular/cografya/turkiyede-iklim/index.html",

        "Türkiye'nin Bitki Örtüsü":
            "konular/cografya/turkiyenin-bitki-ortusu/index.html",

        "Türkiye'nin Su Kaynakları":
            "konular/cografya/turkiyenin-su-kaynaklari/index.html",

        "Türkiye'nin Toprakları":
            "konular/cografya/turkiyenin-topraklari/index.html",

        "Nüfus ve Yerleşme":
            "konular/cografya/nufus-ve-yerlesme/index.html",

        "Türkiye'de Tarım":
            "konular/cografya/turkiyede-tarim/index.html",

        "Türkiye'de Hayvancılık":
            "konular/cografya/turkiyede-hayvancilik/index.html",

        "Türkiye'de Madenler ve Enerji Kaynakları":
    "konular/cografya/turkiyede-madenler-ve-enerji/index.html",
         
        "Türkiye'de Sanayi":
    "konular/cografya/turkiyede-sanayi/index.html",
        
         "Türkiye'de Ulaşım":
    "konular/cografya/turkiyede-ulasim/index.html",

        "Türkiye'de Ticaret":
    "konular/cografya/turkiyede-ticaret/index.html",

         "Türkiye'de Turizm":
    "konular/cografya/turkiyede-turizm/index.html",

        "Bölgeler Coğrafyası":
    "konular/cografya/bolgeler-cografyasi/index.html"

    };


    if (cografyaTopics[topic]) {

        window.location.href =
            cografyaTopics[topic];

        return;

    }

}

if (currentSubject === "vatandaslik") {

    const vatandaslikTopics = {

        "Hukukun Temel Kavramları":
            "konular/vatandaslik/hukukun-temel-kavramlari/index.html",

        "Devlet ve Demokrasi Kavramları":
            "konular/vatandaslik/devlet-ve-demokrasi-kavramlari/index.html",

        "Anayasa Hukukuna Giriş":
            "konular/vatandaslik/anayasa-hukukuna-giris/index.html",

        "Temel Hak ve Hürriyetler":
            "konular/vatandaslik/temel-hak-ve-hurriyetler/index.html",

        "Yasama":
            "konular/vatandaslik/yasama-tbmm/index.html",

        "Yürütme":
            "konular/vatandaslik/yurutme-cumhurbaskani/index.html",

        "Yargı":
            "konular/vatandaslik/yargi/index.html",

        "İdare Hukuku":
            "konular/vatandaslik/idare-hukuku/index.html",

        "Türkiye'nin İdari Yapısı":
            "konular/vatandaslik/turkiyenin-idari-yapisi/index.html",

        "Uluslararası Kuruluşlar":
            "konular/vatandaslik/uluslararasi-kuruluslar/index.html",

        "İnsan Hakları":
            "konular/vatandaslik/insan-haklari/index.html",

        "Vatandaşlık Genel Tekrar":
            "konular/vatandaslik/vatandaslik-genel-tekrar/index.html"
    };


    if (vatandaslikTopics[topic]) {

        window.location.href =
            vatandaslikTopics[topic];

        return;
    }
}

/* =========================================
   GÜNCEL BİLGİLER
   ========================================= */

if (currentSubject === "guncel") {

    const guncelTopics = {

        "Türkiye'den Güncel Gelişmeler":
            "konular/guncel-bilgiler/turkiyeden-guncel-gelismeler/index.html",

        "Dünyadan Güncel Gelişmeler":
            "konular/guncel-bilgiler/dunyadan-guncel-gelismeler/index.html",

        "Uluslararası Kuruluşlar ve Zirveler":
            "konular/guncel-bilgiler/uluslararasi-kuruluslar-ve-zirveler/index.html",

        "Bilim, Teknoloji ve Uzay":
            "konular/guncel-bilgiler/bilim-teknoloji-ve-uzay/index.html",

        "Kültür, Sanat ve Edebiyat":
            "konular/guncel-bilgiler/kultur-sanat-ve-edebiyat/index.html",

        "Spor":
            "konular/guncel-bilgiler/spor/index.html",

        "Önemli Ödüller ve Nobel Ödülleri":
            "konular/guncel-bilgiler/onemli-oduller-ve-nobel-odulleri/index.html",

        "Önemli Yıl Dönümleri ve İlan Edilen Yıllar":
            "konular/guncel-bilgiler/onemli-yil-donumleri-ve-ilan-edilen-yillar/index.html",

        "Türkiye'deki Önemli Projeler ve İlkler":
            "konular/guncel-bilgiler/turkiyedeki-onemli-projeler-ve-ilkler/index.html",

        "Güncel Bilgiler Genel Tekrar":
            "konular/guncel-bilgiler/guncel-bilgiler-genel-tekrar/index.html"
    };


    if (guncelTopics[topic]) {

        window.location.href =
            guncelTopics[topic];

        return;
    }
}




    alert(
        `"${topic}" konusu henüz hazırlanmadı.`
    );

}

/* =========================
   KONULARDAN → DERSLERE
========================= */

function goBackToSubjects() {

    document.getElementById("topics")
        .classList.remove("active");


    document.getElementById("subjects")
        .classList.add("active");

}


/* =========================
   DERSLERDEN → ANA MENÜ
========================= */

/* =========================
   KONU BİTTİ → DERSLERE DÖN
========================= */

const urlParams =
    new URLSearchParams(window.location.search);

if (
    urlParams.get("return") === "subjects"
) {

    document
        .getElementById("home")
        .classList.remove("active");

    document
        .getElementById("menu")
        .classList.remove("active");

    document
        .getElementById("topics")
        .classList.remove("active");

    document
        .getElementById("subjects")
        .classList.add("active");

    currentMode = "topic";

    document
        .getElementById("subjectTitle")
        .textContent = "Konu Anlatımı";

    createSubjectList();

}