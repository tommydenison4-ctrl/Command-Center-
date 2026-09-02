# ULM Football Intelligence Command Center — Opponent News v3

This version fixes the over-filtering problem in the football-only news feed.

## What changed
- Official opponent stories are now pulled from each school's Football archive page when available.
- Because the archive itself is football-filtered, legitimate headlines no longer need to contain words such as "football", "QB", or "touchdown" to appear.
- Explicit non-football sports (golf, basketball, baseball, softball, soccer, volleyball, tennis, etc.) are still rejected.
- External media remains strict: it must be football-related and identify the selected opponent in the headline.
- Google News remains a fallback/secondary source so the feed is not dependent on one source.
- Schedule sidebar, future-opponent switching, and past box scores remain unchanged.

## GitHub / Vercel
Replace both of these in the existing repo:
- `index.html`
- `api/opponent-news.js`

Keep `opponent-news.js` inside the `api` folder.


- Increased the mobile 'Opponent Intelligence' heading size in the schedule rail for better readability.

- Increased the mobile Opponent Intelligence heading substantially to 26px and adjusted its header spacing for better visual prominence.

- Added player-card-style news detail view: READ NOTES opens a focused intelligence card without changing the carousel layout.
- Added BACK TO NEWS navigation that restores the user's previous carousel position.
- Added OPEN STORY as a separate action on every card and inside the detail view.
- Added compact intelligence tags inferred from each story, with support for API-provided summaries/tags/quotes later.

V8 news intelligence notes:
- READ NOTES now attempts to read the actual published article server-side.
- Builds a concise extractive football summary from the article text instead of simply repeating the RSS description.
- Extracts a direct quote when one is clearly present in the accessible story text.
- Adds football intelligence tags based on the article content.
- Cleans HTML entities such as &nbsp; from feed text.
- Falls back gracefully when a publisher blocks article access.

- News notes v9: suppresses Google News boilerplate, shows structured football intelligence lines only when enough source text exists, and labels short/video items instead of fabricating notes.

- v10 fixes over-aggressive no-notes classification.
- Added a readability fallback for article pages and Google News redirect links so READ NOTES can be built from actual story text more often.
- Official athletics stories no longer become SHORT / VIDEO ITEM just because the normal server fetch cannot parse the page.
- Stories with genuinely inaccessible/thin text now show OPEN STORY ONLY rather than being mislabeled as video.
