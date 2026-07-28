// ===================================
// EmailJS initialisieren
// ===================================

emailjs.init({
    publicKey: "8s5AdO0IZ99pi8O8d"
});


// ===================================
// Einstellungen
// ===================================

const MAX_CHARS = 90;
const MAX_MESSAGE_LENGTH = 5000;

const editor = document.getElementById("editor");


// ===================================
// Text auf 90 Zeichen formatieren
// ===================================

function formatText(text) {

    const paragraphs = text.split("\n");

    let result = [];

    for (let paragraph of paragraphs) {

        if (paragraph === "") {
            result.push("");
            continue;
        }

        const tokens =
            paragraph.match(/(\t+| +|\S+)/g) || [];

        let line = "";
        let lineLength = 0;

        for (let token of tokens) {

            const tokenLength =
                token.startsWith("\t")
                ? token.length * 4
                : token.length;

            if (lineLength + tokenLength <= MAX_CHARS) {

                line += token;
                lineLength += tokenLength;

            } else {

                // Leerzeichen am Zeilenanfang vermeiden
                if (/^[ \t]+$/.test(token)) {

                    if (line !== "") {
                        result.push(line);
                    }

                    line = "";
                    lineLength = 0;

                } else {

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


// ===================================
// Text in mehrere Teile aufteilen
// ===================================

function splitByLines(
    text,
    maxLength = MAX_MESSAGE_LENGTH
) {

    const lines = text.split("\n");

    let parts = [];
    let currentPart = "";

    for (let line of lines) {

        if (
            currentPart.length +
            line.length + 1 <= maxLength
        ) {

            currentPart += line + "\n";

        } else {

            parts.push(currentPart);

            currentPart = line + "\n";

        }

    }

    if (currentPart !== "") {
        parts.push(currentPart);
    }

    return parts;

}


// ===================================
// Save-Button
// ===================================

document.getElementById("save")
.addEventListener("click", function () {

    // Originaltext holen
    const originalText = editor.value;

    // Formatieren
    const formattedText =
        formatText(originalText);

    // Aufteilen
    const parts =
        splitByLines(formattedText);


    // Maximal 10 Teile
    const templateParams = {

        message1: parts[0] || "",
        message2: parts[1] || "",
        message3: parts[2] || "",
        message4: parts[3] || "",
        message5: parts[4] || "",
        message6: parts[5] || "",
        message7: parts[6] || "",
        message8: parts[7] || "",
        message9: parts[8] || "",
        message10: parts[9] || ""

    };


    // E-Mail verschicken
    emailjs.send(

        "service_godqvsl",
        "template_b2cit9p",
        templateParams

    )

    .then(() => {

        alert(
            "Text wurde erfolgreich gespeichert."
        );

    })

    .catch((error) => {

        console.log(error);

        alert(

            "Fehler:\n\n" +

            "Status: " +
            error.status +

            "\n\n" +

            error.text

        );

    });

});
