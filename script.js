// EmailJS initialisieren
emailjs.init({
    publicKey: "8s5AdO0IZ99pi8O8d"
});

// Maximale Zeichenzahl pro E-Mail
const MAX_CHARS = 40000;


// Text möglichst an Leerzeichen aufteilen
function splitText(text, maxChars) {

    const parts = [];

    while (text.length > maxChars) {

        let position = text.lastIndexOf(" ", maxChars);

        // Falls kein Leerzeichen gefunden wird
        if (position === -1) {
            position = maxChars;
        }

        parts.push(text.slice(0, position));

        text = text.slice(position).trim();

    }

    // Rest hinzufügen
    if (text.length > 0) {
        parts.push(text);
    }

    return parts;
}


// Mehrere E-Mails versenden
async function sendLargeText(text) {

    const parts = splitText(text, MAX_CHARS);

    for (let i = 0; i < parts.length; i++) {

        await emailjs.send(
            "service_godqvsl",
            "template_b2cit9p",
            {
                message: parts[i],
                part: i + 1,
                total_parts: parts.length
            }
        );

    }

}


// Beim Klick auf den Save-Button
document.getElementById("save").addEventListener("click", async function () {

    const text = document.getElementById("editor").value;

    // Prüfen, ob Text vorhanden ist
    if (text.trim() === "") {
        alert("Bitte zuerst einen Text eingeben.");
        return;
    }

    // Button während des Speicherns deaktivieren
    const button = document.getElementById("save");
    button.disabled = true;
    button.textContent = "Speichert...";

    try {

        await sendLargeText(text);

        alert("Der Text wurde erfolgreich gespeichert.");

    } catch (error) {

        console.error(error);
        alert("Fehler beim Speichern des Textes.");

    } finally {

        button.disabled = false;
        button.textContent = "Save";

    }

});
