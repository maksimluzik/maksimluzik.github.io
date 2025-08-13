# maksimluzik.github.io

Personal website of Maksim Luzik. Static site hosted on GitHub Pages with a responsive layout and dynamic slogans fetched from Google Sheets.

Live: https://www.maksimluzik.com/

## Features
- Responsive header and navbar (logo + name on the left, hamburger on the right for mobile)
- Clean mobile experience (proper spacing, no extra empty space in the expanded menu)
- Slogan box with a refresh button that picks a random quote from Google Sheets
- Consistent 404 page styled like the homepage
- SEO/Open Graph tags and Google Tag Manager

## Tech stack
- Static HTML/CSS/JS
- Bootstrap 3, jQuery 2.1.3
- Font Awesome (local) for icons
- Google API Client + Google Sheets API (read-only)

## Local development
Prerequisite: Node.js (for a tiny local server)

1) Install a local static server (one-time):
	- npm install -g http-server
2) Start the site from the project root:
	- http-server
3) Open http://localhost:8080

Notes
- The site uses absolute paths (/css, /js, /images), so serve from the repo root.
- The Google Sheets API calls are client-side and work locally over http.

## Dynamic slogans
- Source: Google Sheet defined in `js/maksim.js`
  - spreadsheetId: configured in the file
  - range: `slogans`
  - Expected format: first row is headers; Column A = slogan, Column B = author
- At load, the app fetches all rows and displays a random one; clicking the refresh icon picks another at random from the cached list.

To point to a different sheet
1) Update `spreadsheetId` in `js/maksim.js`
2) Ensure the sheet/tab is named `slogans` with the format above (or update the `range` accordingly)
3) If you rotate the API key, update `apiKey` in the same file (keep it restricted)

## Color palette
- color1: `#212A3F`
- color2: `#434F5B`
- color3: `#F2F2F2`
- color4: `#8AB839`
- color5: `#2E2E2E`

## Deployment
- Pushing to `master` publishes via GitHub Pages for this repo
- Custom domain is configured via `CNAME`
