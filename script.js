// =============================
// EmailJS initialisieren
// =============================

emailjs.init({
    publicKey: "8s5AdO0IZ99pi8O8d"
});


// =============================
// Einstellungen
// =============================

const MAX_CHARS = 90;

const editor = document.getElementById("editor");


// =============================
// Text formatieren
// =============================

function formatText(text) {

    // Vorhandene Absätze behalten
    const paragraphs = text.split("\n");

    let result = [];

    for (let paragraph of paragraphs) {

        // Leere Zeilen behalten
        if (paragraph === "") {
            result.push("");
            continue;
        }

        // Wörter, Leerzeichen und TABs trennen
        const tokens = paragraph.match(/(\t+| +|\S+)/g) || [];

        let line = "";
        let lineLength = 0;

        for (let token of tokens) {

            // TAB = 4 Zeichen
            const tokenLength =
                token.startsWith("\t")
                    ? token.length * 4
                    : token.length;

            // Passt das Token noch hinein?
            if (lineLength + tokenLength <= MAX_CHARS) {

                line += token;
                lineLength += tokenLength;

            }

            // Zeile ist voll
            else {

                // Nur Leerzeichen/TABs werden verworfen
                if (/^[ \t]+$/.test(token)) {

                    result.push(line);

                    line = "";
                    lineLength = 0;

                }

                // Wort kommt vollständig in die nächste Zeile
                else {

                    if (line !== "") {
                        result.push(line);
                    }

                    line = token;
                    lineLength = tokenLength;

                }

            }

        }

        // Letzte Zeile speichern
        result.push(line);

    }

    return result.join("\n");

}


// =============================
// Save-Button
// =============================

document.getElementById("save").addEventListener("click", function () {

    // Originaltext aus dem Editor
    const originalText = editor.value;

    // Nur die Kopie wird formatiert
    const formattedText = formatText(originalText);

    // E-Mail verschicken
    emailjs.send(
        "service_godqvsl",
        "template_b2cit9p",
        {
            message: formattedText
        }

    ).then(() => {

        alert("Text wurde erfolgreich gespeichert.");

    }).catch(() => {

        alert("Fehler beim Speichern.");

    });

});
