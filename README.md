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
