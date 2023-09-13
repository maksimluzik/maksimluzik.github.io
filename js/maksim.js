/**
 * Created by maksim on 02/12/15, updated on 13/09/23.
 */
// Define Maksim object
var Maksim = Maksim || function (boolDebug) {
    let debug = boolDebug;

    this.isDebug = function() { return debug; }
};

Maksim.prototype.log = function(text) {
    if (this.isDebug()) {
        console.log(text);
    }
};

var M = new Maksim(false);
M.log("Welcome to maksimluzik.com debug mode!");

// Replace 'YOUR_API_KEY' with your actual Google Sheets API key
const apiKey = 'AIzaSyAm0ilG2HsLn78-hnGvwQuWX7gtdX1HiDE';

// ID of the Google Sheet document
const spreadsheetId = '145LPgIHqxSHXc2M5saohs7hCZ5ryT6_IfqbOsbMjNSI';

// Load the Google API client library and Google Sheets API
gapi.load('client', () => {
    gapi.client.init({
        apiKey: apiKey,
    }).then(() => {
        // Load the Google Sheets API
        return gapi.client.load('sheets', 'v4');
    }).then(() => {
        // Make an API request to get the values from the 'slogans' sheet
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: 'slogans',
        });
    }).then((response) => {
        const values = response.result.values;

        if (values && values.length > 0) {
            const data = [];
            const headers = values[0];

            for (let i = 1; i < values.length; i++) {
                const row = values[i];
                const slogan = row[0]; // Column A
                const author = row[1]; // Column B
                data.push({ slogan, author });
            }

            // Generate a random index within the array's bounds
            const randomIndex = Math.floor(Math.random() * data.length);

            // Get the random item from the array
            const randomLine = data[randomIndex];
            console.log("Slogan of the day:", randomLine);

            M.log(data);
            let sloganElement = document.getElementById('slogan');
            let authorElement = document.getElementById('author');
            sloganElement.textContent = JSON.stringify(randomLine.slogan, null, 2);
            authorElement.textContent = JSON.stringify("- "+randomLine.author, null, 2).replace(/"/g, '');
        } else {
            console.log('No data found.');
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
});