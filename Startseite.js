    document.addEventListener('DOMContentLoaded', function () {
    let todayEvents = getEvents('heute');
    let otherEvents = getEvents('sonstig');

    function createEventElement(event, index, columnId) {
        if (event.user != JSON.parse(localStorage.getItem('currentUserEntries'))) {
            return;
        }

        const eventItem = document.createElement('div');
        eventItem.classList.add('event-item', 'new-event');

        const eventContent = document.createElement('div');
        eventContent.innerHTML = `
            <p><span class="titel1">Datum:</span><span class="ausgabe1">${event.date}</span></p>
            <p><span class="titel2">Uhrzeit:</span> <span class="ausgabe2">${event.time}<span></p>
            <p><span class="titel3">Ort:</span> <span class="ausgabe3">${event.location}</span></p>
            <p class="titel4">Beschreibung:</p><p>____________________________________________</p><br><p>${event.description}</p><p>____________________________________________</p>
        `;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Erledigt';
        deleteButton.addEventListener('click', function () {
            deleteEvent(index, columnId);
    
        });

        eventItem.appendChild(eventContent);
        eventItem.appendChild(deleteButton);

        if (event.priority === 'heute') {
            eventItem.classList.add('today-event');
        }

        return eventItem;
    }

    function displayEvents() {
        displayEventsInColumn(todayEvents, 'todayEvents');
        displayEventsInColumn(otherEvents, 'otherEvents');
    }

    function displayEventsInColumn(events, columnId) {
        
        
        const eventList = document.getElementById(columnId);
        eventList.innerHTML = '';

        events.slice().reverse().forEach((event, index) => {
            const eventItem = createEventElement(event, index, columnId);
            if (eventItem) {
                eventList.appendChild(eventItem);
            }
        });
    }

    function resetForm() {
        document.getElementById('eventForm').reset();
    }

    function addEvent() {
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = document.getElementById('eventTime').value;
        const eventLocation = document.getElementById('eventLocation').value;
        const eventDescription = document.getElementById('eventDescription').value;
        const eventPriority = document.getElementById('eventPriority').value;

        if (!eventDate || !eventTime || !eventLocation || !eventDescription || !eventPriority) {
            alert('Bitte füllen Sie alle Felder aus.');
            return;
        }

        const newEvent = {
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            description: eventDescription,
            priority: eventPriority,
            user: JSON.parse(localStorage.getItem('currentUserEntries'))
        };

        if (eventPriority === 'heute') {
            todayEvents.push(newEvent);
        } else if (eventPriority === 'sonstig') {
            otherEvents.push(newEvent);
        }

        saveEvents('heute', todayEvents);
        saveEvents('sonstig', otherEvents);
        displayEvents();
        resetForm();
    }

    function deleteEvent(index, columnId) {
        let events, columnName;

        if (columnId === 'todayEvents') {
            events = todayEvents;
            columnName = 'heute';
        } else if (columnId === 'otherEvents') {
            events = otherEvents;
            columnName = 'sonstig';
        }


        console.log(index);

        var deletedEvent = events.reverse().splice(index, 1)[0];

        
        saveEvents(columnName, events);
        displayEventsInColumn(events, columnId);
        storeDeletedEvent(deletedEvent);
    }

    function saveEvents(key, events) {
        localStorage.setItem(key, JSON.stringify(events));
    }

    function getEvents(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function storeDeletedEvent(deletedEvent) {
        const deletedEvents = getDeletedEvents();
        deletedEvents.push(deletedEvent);
        localStorage.setItem('deletedEvents', JSON.stringify(deletedEvents));
    }

    function getDeletedEvents() {
        return JSON.parse(localStorage.getItem('deletedEvents')) || [];
    }

    document.getElementById('goToCompletedEntriesButton').addEventListener('click', function () {
        window.location.href = 'einträge.html';
    });

    document.getElementById('goToCompletedEntriesButton1').addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    document.getElementById('addEvent').addEventListener('click', addEvent);
    displayEvents();
});

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

var storedpassword = localStorage.getItem('userPassword');
if (storedpassword) {
  document.getElementById('username-display').innerText = 'Benutzer: ' + storedpassword;
}






