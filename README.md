# ULM Football Intelligence Command Center — Opponent Hub

This build adds a 2026 ULM schedule rail to the Command Center.

## What changed
- Click any 2026 opponent in the left schedule rail.
- The hub switches to that opponent's football-only news feed.
- `NEWS` shows recent official + media football stories.
- `PAST BOX SCORES` shows the opponent's most recent completed 2025–26 games and links each game to its ESPN box score.
- The feed refreshes every 5 minutes while open.
- The current game-week opponent is selected automatically by date.
- The existing Mississippi State depth chart remains visible when Mississippi State is selected and hides when another opponent is selected.

## GitHub / Vercel structure
Keep the files in this structure:

```
index.html
README.md
ULM_Week_1_Mississippi_State_Depth_Chart_v2.pdf
api/
  opponent-news.js
```

The `api` folder is required. Upload the updated `index.html` and the updated `api/opponent-news.js` to the same GitHub repo. Vercel will run the API automatically.

## Live data
- News: Google News RSS, filtered to football only, with each opponent's official athletics domain included.
- Recent results / box-score links: ESPN college-football schedule data.
- ULM 2026 schedule dates: ULM Athletics published 2026 schedule.

## Opponent news relevance fix
- External media articles must identify the selected opponent in the headline, not just mention a former player or old school connection in the body/description.
- Former/alumni/transfer-history headlines are filtered out of the selected opponent feed.
- Official athletics-site football stories remain eligible.
- Clicking any future opponent in the 2026 schedule now automatically returns the workspace to NEWS and loads that opponent's football feed.
- Schedule rows now display VIEW NEWS to make scout-ahead navigation obvious.


## Football-only feed hardening
- Official athletics stories are no longer trusted merely because they come from the school domain.
- A story must have a positive football signal in its URL or football-specific title/description terms.
- URLs explicitly tagged for golf, basketball, baseball, softball, soccer, volleyball, tennis and other sports are rejected.
- Official-site Google News query now uses `inurl:football` to prioritize the football section/article slugs.
