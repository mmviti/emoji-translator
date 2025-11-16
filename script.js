let dictionaries = {};

async function loadDictionaries() {
    const langs = ["common", "it", "en"];
    for (const lang of langs) {
        dictionaries[lang] = await fetch(`dictionaries/${lang}.json`).then(r => r.json());
    }
}
loadDictionaries();

function translate(text, dict) {
    let words = text.split(/(\s+)/);
    return words.map(w => dict[w.toLowerCase()] || w).join("");
}

function translateToEmoji() {
    let txt = document.getElementById("inputText").value;
    let out = translate(txt, dictionaries.common);
    document.getElementById("output").innerText = out;
}

function translateToText() {
    let txt = document.getElementById("inputText").value;
    let reversed = Object.fromEntries(Object.entries(dictionaries.common).map(a => [a[1], a[0]]));
    let words = txt.split(/(\s+)/);
    let out = words.map(w => reversed[w] || w).join("");
    document.getElementById("output").innerText = out;
}
