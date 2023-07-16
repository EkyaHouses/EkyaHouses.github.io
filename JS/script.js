document.addEventListener('DOMContentLoaded', () => {
    const eventsTableBody = document.querySelector('#events-table tbody');

    // Replace 'events.csv' with the relative path to your CSV file on GitHub Pages
    const csvUrl = 'Data/events.csv';

    fetch(csvUrl)
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

    function createLinkOrText(linkOrContact) {
        // Regular expression to check if the value is a valid URL
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        // If it's a valid URL, create a hyperlink with "Click here" text
        if (urlRegex.test(linkOrContact)) {
            return `<a href="${linkOrContact}" target="_blank">Click here</a>`;
        }

        // If it's not a URL, leave it as plain text
        return linkOrContact;
    }

    function populateEventsTable(events) {
        let tableHTML = '';

        events.forEach(event => {
            tableHTML += `
                <tr>
                    <td>${event.eventName}</td>
                    <td>${event.date}</td>
                    <td>${createLinkOrText(event.linkOrContact)}</td>
                </tr>
            `;
        });

        eventsTableBody.innerHTML = tableHTML;
    }
});
