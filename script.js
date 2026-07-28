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

    const paragraphs = text.split("\n");

    let result = [];

    for (let paragraph of paragraphs) {

        // Leerzeilen beibehalten
        if (paragraph === "") {
            result.push("");
            continue;
        }

        // Wörter, Leerzeichen und TABs behalten
        const tokens = paragraph.match(/(\t+| +|\S+)/g) || [];

        let line = "";
        let lineLength = 0;

        for (let token of tokens) {

            // TAB entspricht 4 Zeichen
            const tokenLength =
                token.startsWith("\t")
                    ? token.length * 4
                    : token.length;

            // Passt das Token noch in die Zeile?
            if (lineLength + tokenLength <= MAX_CHARS) {

                line += token;
                lineLength += tokenLength;

            } else {

                // Ist das Token nur aus Leerzeichen/TABs,
                // wird die aktuelle Zeile beendet.
                if (/^[ \t]+$/.test(token)) {

                    result.push(line);

                    line = "";
                    lineLength = 0;

                } else {

                    // Wort kommt vollständig in die nächste Zeile.
                    if (line !== "") {
                        result.push(line);
                    }

                    line = token;
                    lineLength = tokenLength;

                }

            }

        }

        result.push(line);

    }

    return result.join("\n");

}


// =============================
// Save-Button
// =============================

document.getElementById("save").addEventListener("click", function () {

    // Den Text holen
    const originalText = editor.value;

    // Auf 90 Zeichen pro Zeile formatieren
    const formattedText = formatText(originalText);

    // Optional:
    // Der Benutzer sieht vor dem Speichern den
    // endgültig formatierten Text.
    editor.value = formattedText;

    // E-Mail versenden
    emailjs.send(
        "service_godqvsl",
        "template_b2cit9p",
        {
            message: formattedText
        }

    ).then(() => {

        alert("Text wurde gespeichert.");

    }).catch(() => {

        alert("Fehler beim Speichern.");

    });

});
