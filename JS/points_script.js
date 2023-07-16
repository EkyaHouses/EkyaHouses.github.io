document.addEventListener('DOMContentLoaded', () => {
    const scoreboardContainer = document.getElementById('scoreboard-container');
    const houseElements = scoreboardContainer.querySelectorAll('.house');

    // Replace 'points.csv' with the relative path to your CSV file on GitHub Pages
    const csvUrl = 'Data/points.csv';

    // Fetch the points CSV file
    axios.get(csvUrl)
        .then(response => {
            const pointsData = parseCSV(response.data);
            const totalPointsByHouse = calculateTotalPoints(pointsData);
            populateScoreboard(totalPointsByHouse);

            // Add event listener for each house logo to display updated points on hover
            houseElements.forEach(houseElement => {
                houseElement.addEventListener('mouseenter', () => {
                    const houseName = houseElement.getAttribute('data-house');
                    if (totalPointsByHouse.hasOwnProperty(houseName)) {
                        const totalPoints = totalPointsByHouse[houseName];
                        houseElement.querySelector('.house-details').textContent = `Total Points: ${totalPoints}`;
                    } else {
                        houseElement.querySelector('.house-details').textContent = 'Total Points: 0';
                    }
                });

                // Reset the points display when the mouse leaves the house logo
                houseElement.addEventListener('mouseleave', () => {
                    houseElement.querySelector('.house-details').textContent = 'Total Points: 0'; // Replace with the initial points value if needed
                });
            });
        })
        .catch(error => console.error('Error fetching points data:', error));

    function parseCSV(data) {
        const rows = data.split('\n');
        const pointsData = [];

        for (let i = 1; i < rows.length; i++) {
            const columns = rows[i].split(',');
            const houseName = columns[0].trim();
            const date = columns[1].trim();
            const event = columns[2].trim();
            const points = parseInt(columns[3].trim());
            pointsData.push({ houseName, date, event, points });
        }

        return pointsData;
    }

    function calculateTotalPoints(pointsData) {
        const totalPointsByHouse = {};

        pointsData.forEach(data => {
            const { houseName, points } = data;
            if (!totalPointsByHouse[houseName]) {
                totalPointsByHouse[houseName] = 0;
            }
            totalPointsByHouse[houseName] += points;
        });

        return totalPointsByHouse;
    }

    function populateScoreboard(totalPointsByHouse) {
        // Get all house elements and update their content with the total points
        houseElements.forEach(houseElement => {
            const houseName = houseElement.getAttribute('data-house');
            if (totalPointsByHouse.hasOwnProperty(houseName)) {
                const totalPoints = totalPointsByHouse[houseName];
                houseElement.querySelector('.house-details').textContent = `Total Points: ${totalPoints}`;
            } else {
                houseElement.querySelector('.house-details').textContent = 'Total Points: 0';
            }
        });
    }
});
