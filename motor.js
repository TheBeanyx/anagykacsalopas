function typeWriter(text, elementId) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.textContent = "";
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 10);
        }
    }
    type();
}

function generateCode() {
    const prompt = document.getElementById('prompt').value;
    const lang = document.getElementById('language').value;
    if(!prompt) return alert("Írj valamit!");

    const result = `// Auto-generated ${lang}\n// Task: ${prompt}\n\nfunction init() {\n  console.log("Success");\n}`;
    document.getElementById('result-container').classList.remove('hidden');
    typeWriter(result, 'output');
}

function correctCode() {
    const code = document.getElementById('codeInput').value;
    const output = document.getElementById('output');
    document.getElementById('result-container').classList.remove('hidden');

    // Okosabb ellenőrzés: Kulcsszavak keresése
    const keywords = ["function", "var", "let", "const", "if", "while", "html", "body", "div", "print", "import"];
    const hasKeywords = keywords.some(word => code.toLowerCase().includes(word));
    
    let message = "";

    if (code.length < 5 || !hasKeywords) {
        message = "⚠️ HIBA: Ez nem tűnik kódnak, csak értelmetlen szövegnek. Kérlek, valódi kódot másolj be!";
    } else {
        message = "✅ ELEMZÉS: A kód szerkezete megfelelő.\n\n" + code;
    }

    typeWriter(message, 'output');
}

function download() {
    const content = document.getElementById('output').textContent;
    const blob = new Blob([content], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "ai_output.txt";
    a.click();
}