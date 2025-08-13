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

// Cache loaded slogans
let SLOGANS_CACHE = [];

function renderRandomSlogan() {
    if (!SLOGANS_CACHE || SLOGANS_CACHE.length === 0) {
        M.log('No slogans cached yet.');
        return;
    }
    const randomIndex = Math.floor(Math.random() * SLOGANS_CACHE.length);
    const randomLine = SLOGANS_CACHE[randomIndex];
    M.log({ picked: randomLine, index: randomIndex, total: SLOGANS_CACHE.length });

    const sloganElement = document.getElementById('slogan');
    const authorElement = document.getElementById('author');
    if (sloganElement) sloganElement.textContent = randomLine.slogan || '';
    if (authorElement) authorElement.textContent = randomLine.author ? `— ${randomLine.author}` : '';
}

function fetchSlogansFromSheet() {
    // Returns a promise that resolves with an array of {slogan, author}
    return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'slogans',
    }).then((response) => {
        const values = response.result.values;
        const data = [];
        if (values && values.length > 1) {
            for (let i = 1; i < values.length; i++) {
                const row = values[i] || [];
                const slogan = row[0] || '';
                const author = row[1] || '';
                if (slogan) data.push({ slogan, author });
            }
        }
        return data;
    });
}

function initGapiAndLoadSlogans() {
    return new Promise((resolve, reject) => {
        gapi.load('client', () => {
            gapi.client.init({ apiKey: apiKey })
                .then(() => gapi.client.load('sheets', 'v4'))
                .then(fetchSlogansFromSheet)
                .then((list) => {
                    SLOGANS_CACHE = list;
                    resolve(list);
                })
                .catch(reject);
        });
    });
}

function setRefreshing(isRefreshing) {
    const btn = document.getElementById('refresh-slogan');
    if (!btn) return;
    if (isRefreshing) btn.classList.add('spinning'); else btn.classList.remove('spinning');
}

// Bind click once DOM is ready
function bindRefreshButton() {
    const btn = document.getElementById('refresh-slogan');
    if (!btn) return;
    btn.addEventListener('click', () => {
        // If we already have data, just pick a new one; otherwise fetch
        if (SLOGANS_CACHE.length > 0) {
            setRefreshing(true);
            // Small delay for UX spin
            setTimeout(() => { renderRandomSlogan(); setRefreshing(false); }, 250);
        } else {
            setRefreshing(true);
            initGapiAndLoadSlogans()
                .then(() => renderRandomSlogan())
                .catch((e) => console.error('Error loading slogans:', e))
                .finally(() => setRefreshing(false));
        }
    });
}

// Kick off: ensure DOM bindings and initial load
window.addEventListener('DOMContentLoaded', () => {
    bindRefreshButton();
});

// Initial load of slogans, then render one
initGapiAndLoadSlogans()
    .then(() => renderRandomSlogan())
    .catch((error) => console.error('Error initializing slogans:', error));