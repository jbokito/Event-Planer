let users = [];

// Beim Laden der Seite prüfen, ob Benutzerdaten im localStorage gespeichert sind
if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
}

function register() {
    const regEmailInput = document.getElementById("reg-email");
    const regPasswordInput = document.getElementById("reg-password");
    const registrationError = document.getElementById("registration-error");

    const regEmail = regEmailInput.value;
    const regPassword = regPasswordInput.value;

    // Überprüfen, ob die E-Mail-Adresse gültig ist
    if (!isValidEmail(regEmail)) {
        registrationError.textContent = "Bitte geben Sie eine gültige E-Mail-Adresse ein!";
        regEmailInput.classList.add("error-border");
        return;
    } else {
        regEmailInput.classList.remove("error-border");
        registrationError.textContent = "";
    }

    // Überprüfen, ob die E-Mail-Adresse bereits existiert
    const existingUser = users.find(user => user.email === regEmail);
    if (existingUser) {
        registrationError.textContent = "E-Mail-Adresse bereits registriert. Bitte verwenden Sie eine andere.";
        regEmailInput.classList.add("error-border");
        return;
    } else {
        regEmailInput.classList.remove("error-border");
        registrationError.textContent = "";
    }

    // Überprüfen, ob das Passwort die maximale Länge von 12 Zeichen nicht überschreitet
    if (regPassword.length > 12) {
        registrationError.textContent = "Das Passwort darf maximal 12 Zeichen lang sein.";
        regPasswordInput.classList.add("error-border");
        return;
    } else {
        regPasswordInput.classList.remove("error-border");
        registrationError.textContent = "";
    }

    if (regEmail.length > 25) {
        registrationError.textContent = "Die E-mail Adresse darf maximal 25 Zeichen lang sein.";
        regEmailInput.classList.add("error-border");
        return;
    } else {
        regPasswordInput.classList.remove("error-border");
        registrationError.textContent = "";
    }

    // Hinzufügen des neuen Benutzers
    const newUser = { email: regEmail, password: regPassword };
    users.push(newUser);

    // Daten im localStorage speichern, wobei die E-Mail-Adresse als Schlüssel verwendet wird
    localStorage.setItem(newUser.email, JSON.stringify([]));
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrierung erfolgreich! Sie können sich jetzt anmelden.");
    switchForm("login-form");
}
function login() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginError = document.getElementById("login-error");

    const email = emailInput.value;
    const password = passwordInput.value;

    // Überprüfen, ob die E-Mail-Adresse gültig ist
    if (!isValidEmail(email)) {
        loginError.textContent = "Bitte geben Sie eine gültige E-Mail-Adresse ein!";
        emailInput.classList.add("error-border");
        return;
    } else {
        emailInput.classList.remove("error-border");
        loginError.textContent = "";
    }

    // Überprüfen, ob die E-Mail-Adresse existiert und das richtige Passwort hat
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        loginError.textContent = "";
        // Veranstaltungen für den Benutzer laden, wobei die E-Mail-Adresse als Schlüssel verwendet wird
  
        window.localStorage.setItem('currentUserEntries', JSON.stringify(user.email));
        window.location.href = "Startseite.html"; // Hier die Weiterleitung anpassen
    } else {
        loginError.textContent = "Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.";
    }

      // Benutzerinformationen abrufen oder setzen
  var userEmail = document.getElementById('email').value;
  
  // E-Mail-Adresse im localStorage speichern
  localStorage.setItem('userEmail', userEmail);

  // E-Mail-Adresse oben rechts auf der Seite anzeigen
  document.getElementById('username-display').innerText = 'E-Mail: ' + userEmail;
}

// Prüfen, ob bereits eine E-Mail im localStorage gespeichert ist
var storedEmail = localStorage.getItem('userEmail');
if (storedEmail) {
  document.getElementById('username-display').innerText = 'Benutzer: ' + storedEmail;
}


function addEvent() {
    alert("DELETE??? Oder noch in Gebrauch?");
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventLocation = document.getElementById('eventLocation').value;
    const eventDescription = document.getElementById('eventDescription').value;
    const eventPriority = document.getElementById('eventPriority').value;

    const userEntries = JSON.parse(localStorage.getItem('currentUserEntries')) || [];
    const newEvent = {
        date: eventDate,
        time: eventTime,
        location: eventLocation,
        description: eventDescription
    };

    userEntries.push(newEvent);

    // Veranstaltungen für den Benutzer speichern, wobei die E-Mail-Adresse als Schlüssel verwendet wird
    localStorage.setItem('currentUserEntries', JSON.stringify(userEntries));
    localStorage.setItem(user.email, JSON.stringify(userEntries));
    displayEvents();
    resetForm();
}

// Restlicher Code bleibt unverändert






// Rest des Codes bleibt unverändert...


function isValidEmail(email) {
    // Einfache Validierung der E-Mail-Adresse mit einem regulären Ausdruck
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

function toggleForm() {
    const registrationForm = document.getElementById("registration-form");
    const loginForm = document.getElementById("login-form");

    if (registrationForm.style.display === "none") {
        switchForm("registration-form");
    } else {
        switchForm("login-form");
    }
}

function switchForm(formToShow) {
    const registrationForm = document.getElementById("registration-form");
    const loginForm = document.getElementById("login-form");

    if (formToShow === "registration-form") {
        registrationForm.style.display = "block";
        loginForm.style.display = "none";
    } else {
        registrationForm.style.display = "none";
        loginForm.style.display = "block";
    }
}



// Registrierung bei Drücken der Enter-Taste
document.getElementById("reg-password").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        register();
    }
});

// Anmeldung bei Drücken der Enter-Taste
document.getElementById("password").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        login();
    }
});


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

function adminLogin() {
    if (checkAdminCredentials()) {

        window.location.href = "Admin.html";

    }
}