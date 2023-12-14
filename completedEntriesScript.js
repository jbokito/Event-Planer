document.addEventListener('DOMContentLoaded', function () {
    let deletedEvents = getDeletedEvents();

    function createDeletedEventElement(event, index) {
       
       
       
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
        deleteButton.textContent = 'Löschen';
        // Verwendung der Funktion mit dem Event-Objekt und dem Index
        deleteButton.addEventListener('click', function () {
            deleteCompletedEvent(index);
        });

        eventItem.appendChild(eventContent);
        eventItem.appendChild(deleteButton);

        if (event.priority === 'heute') {
            eventItem.classList.add('today-event');
        }

        return eventItem;
    }

    function displayCompletedEvents() {
        
        const completedEventList = document.getElementById('completedEventList');
        completedEventList.innerHTML = '';

        deletedEvents.forEach((event, index) => {
           if (event.user == JSON.parse(localStorage.getItem('currentUserEntries'))) {
                const eventItem = createDeletedEventElement(event, index);
                completedEventList.appendChild(eventItem);
            }

        });
    }

    // Aktualisierte Funktion zum Löschen des spezifischen Events
    function deleteCompletedEvent(index) {
        const deletedEvent = deletedEvents[index];
        deletedEvents.splice(index, 1);
        saveDeletedEvents();
        displayCompletedEvents();
    }

    function saveDeletedEvents() {
        localStorage.setItem('deletedEvents', JSON.stringify(deletedEvents));
    }

    function getDeletedEvents() {
        return JSON.parse(localStorage.getItem('deletedEvents')) || [];
    }

    function deleteAllCompletedEvents() {
        const currentUser = JSON.parse(localStorage.getItem('currentUserEntries'));
    
        // Nur die Events des aktuellen Benutzers löschen
        deletedEvents = deletedEvents.filter(event => event.user !== currentUser);
    
        saveDeletedEvents();
        displayCompletedEvents();
    }

    document.getElementById('goToIndexButton').addEventListener('click', function () {
        window.location.href = 'Startseite.html';
    });

    document.getElementById('deleteAllButton').addEventListener('click', deleteAllCompletedEvents);

    // Aktualisierung: Löschen des spezifischen Events bei Klick auf den "Löschen"-Button
    displayCompletedEvents();
});
