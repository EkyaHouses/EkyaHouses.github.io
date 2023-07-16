// JavaScript to fetch and populate the events from the CSV file
window.addEventListener('DOMContentLoaded', () => {
    const eventsTableBody = document.querySelector('#events-table tbody');

    // Replace 'events.csv' with the actual path to your CSV file
    fetch("Data/events.csv")
        .then(response => response.text())
        .then(data => {
            const events = parseCSV(data);
            populateEventsTable(events);
        })
        .catch(error => console.error('Error fetching events:', error));

    function parseCSV(data) {
        const rows = data.split('\n');
        const events = [];

        for (let i = 1; i < rows.length; i++) {
            const columns = rows[i].split(',');
            const eventName = columns[0].trim();
            const date = columns[1].trim();
            const linkOrContact = columns[2].trim();
            events.push({ eventName, date, linkOrContact });
        }

        return events;
    }

    function populateEventsTable(events) {
        let tableHTML = '';

        events.forEach(event => {
            tableHTML += `
                <tr>
                    <td>${event.eventName}</td>
                    <td>${event.date}</td>
                    <td>${event.linkOrContact}</td>
                </tr>
            `;
        });

        eventsTableBody.innerHTML = tableHTML;
    }
});
