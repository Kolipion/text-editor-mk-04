// =============================
// EmailJS
// =============================

emailjs.init({
    publicKey: "8s5AdO0IZ99pi8O8d"
});


// =============================
// Maximale Zeichen pro Zeile
// =============================

const MAX_CHARS = 90;

const editor = document.getElementById("editor");


// =============================
// Formatiert den kompletten Text
// =============================

function formatText(text){

    // Absätze behalten
    const paragraphs = text.split("\n");

    let result = [];

    for(let paragraph of paragraphs){

        // Leerzeilen behalten
        if(paragraph.trim() === ""){
            result.push("");
            continue;
        }

        const words = paragraph.split(/\s+/);

        let line = "";

        for(let word of words){

            // Falls die Zeile noch leer ist
            if(line === ""){

                line = word;
                continue;

            }

            // Wort passt noch hinein
            if((line + " " + word).length <= MAX_CHARS){

                line += " " + word;

            }

            // Wort passt nicht mehr hinein
            else{

                result.push(line);

                line = word;

            }

        }

        // letzte Zeile hinzufügen
        if(line !== ""){
            result.push(line);
        }

    }

    return result.join("\n");

}


// =============================
// Cursor möglichst erhalten
// =============================

editor.addEventListener("input", function(){

    const cursorPosition = this.selectionStart;

    const formattedText = formatText(this.value);

    this.value = formattedText;

    // Cursor wieder setzen
    this.setSelectionRange(
        Math.min(cursorPosition, this.value.length),
        Math.min(cursorPosition, this.value.length)
    );

});


// =============================
// Speichern
// =============================

document.getElementById("save").addEventListener("click", function(){

    const text = editor.value;

    emailjs.send(
        "service_godqvsl",
        "template_b2cit9p",
        {
            message: text
        }

    ).then(() => {

        alert("Text wurde gespeichert.");

    }).catch(() => {

        alert("Fehler beim Speichern.");

    });

});
