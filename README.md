# ULM Football Intelligence Command Center — UAB Week 2 Update

## What changed
- UAB is now the default game-week opponent when the Command Center opens.
- Clicking UAB loads the existing live football-only news feed from UAB Athletics plus external media.
- Added a full UAB opponent depth-chart section with Offense, Defense and Special Teams tabs.
- UAB depth chart is based on the linked Ourlads chart updated 09/03/2026 at 11:03 PM ET.
- Added a direct `OPEN OURLADS SOURCE` button for UAB.
- Mississippi State depth remains available when Mississippi State is selected.
- Schedule rail now shows `NEWS + DEPTH` for opponents that have a loaded depth chart.
- UAB news tagging now also recognizes Ryder Burton, Nate Rogers, Adrian Posse, Alex Mortensen and Todd Grantham.

## GitHub / Vercel
Replace these files in the existing repo:
- `index.html`
- `api/opponent-news.js`

Keep this existing supporting file in the repo root if you want the Mississippi State `OPEN FULL PDF` button to continue working:
- `ULM_Week_1_Mississippi_State_Depth_Chart_v2.pdf`

No new environment variables are required.
