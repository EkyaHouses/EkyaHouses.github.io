document.addEventListener('DOMContentLoaded', () => {
    // ... Existing code ...

    const modal = document.getElementById('myModal');
    const modalHouseName = document.getElementById('modalHouseName');
    const modalEventsTable = document.getElementById('modalEventsTable').getElementsByTagName('tbody')[0];

    houseElements.forEach(houseElement => {
        houseElement.addEventListener('click', () => {
            const houseName = houseElement.getAttribute('data-house');
            const houseEvents = getEventsByHouse(houseName, pointsData);
            showEventsPopup(houseName, houseEvents);
        });
    });

    function showEventsPopup(houseName, houseEvents) {
        modalHouseName.textContent = houseName;
        modalEventsTable.innerHTML = '';

        houseEvents.forEach(eventData => {
            const { event, date, points } = eventData;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${event}</td>
                <td>${date}</td>
                <td>${points}</td>
            `;
            modalEventsTable.appendChild(row);
        });

        modal.style.display = 'block';
    }

    // Close the modal when the user clicks on the 'x' button or outside the modal
    const modalCloseBtn = document.querySelector('.close');
    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    modalCloseBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});
