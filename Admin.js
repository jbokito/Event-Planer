// Diese Funktion überprüft, ob der Benutzer angemeldet ist (Benutzername und Passwort prüfen).
function checkAdminCredentials() {
    const username = prompt("Benutzername eingeben:");
    const password = prompt("Passwort eingeben:");

    if (username === "Remo" && password === "123!") {
        return true; // Angemeldet
    } else {
        alert("Ungültige Anmeldeinformationen.");
        return false; // Nicht angemeldet
    }
}

// Diese Funktion zeigt die Benutzerdaten in einer Tabelle auf der Admin-Seite an.
function showUserData() {
    const adminContent = document.getElementById("admin-content");
    const userTable = document.getElementById("user-table");
    const tbody = userTable.querySelector("tbody");
    tbody.innerHTML = "";

    // Daten aus dem localStorage abrufen
    const storedUsers = JSON.parse(localStorage.getItem("users"));

    if (storedUsers && storedUsers.length > 0) {
        // Für jeden Benutzer eine Zeile in der Tabelle erstellen
        storedUsers.forEach((user, index) => {
            const userRow = document.createElement("tr");
            userRow.innerHTML = `<td>${user.email}</td><td>${user.password}</td><td><button onclick="deleteUser(${index})">Löschen</button></td>`;
            tbody.appendChild(userRow);
        });

        adminContent.appendChild(userTable);
    } else {
        adminContent.textContent = "Keine Benutzerdaten vorhanden.";
    }
}

// Diese Funktion löscht einen Benutzer anhand seines Index aus dem localStorage.
function deleteUser(index) {
    if (confirm("Bist du sicher, dass du diesen Benutzer löschen möchtest?")) {
        const storedUsers = JSON.parse(localStorage.getItem("users"));

        if (storedUsers && storedUsers.length > index) {
            storedUsers.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(storedUsers));
            showUserData(); // Die Tabelle neu laden, um die Änderungen anzuzeigen
        }
    }
}

// Diese Funktion löscht die Benutzerdaten aus dem localStorage.
function clearUserData() {
    if (checkclearCredentials()) {
        localStorage.removeItem("users");
        alert("Benutzerdaten wurden gelöscht.");
        showUserData(); // Die Tabelle neu laden, um die Änderungen anzuzeigen
    }
}

// Funktion zum Extrahieren und Herunterladen der Benutzerdaten in einer JSON-Datei
function extractUserData() {
    const storedUsers = JSON.parse(localStorage.getItem("users"));

    if (storedUsers && storedUsers.length > 0) {
        const userDataJSON = JSON.stringify(storedUsers, null, 2);
        const blob = new Blob([userDataJSON], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        // Erstellen eines unsichtbaren Links und Klicken darauf, um die Datei herunterzuladen
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "user_data.json";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        alert("Benutzerdaten wurden in 'user_data.json' heruntergeladen.");
    } else {
        alert("Keine Benutzerdaten vorhanden.");
    }
}

function checkclearCredentials() {
    const username = prompt("Bist du sicher? (ja/nein)");

    if (username === "ja") {
        return true; // Angemeldet
    } else {
        alert("Wurde abgebrochen.");
        return false; // Nicht angemeldet
    }
}
