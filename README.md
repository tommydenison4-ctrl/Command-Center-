# ULM Football Intelligence Command Center — Mississippi State Football News

This build keeps the existing ULM command center and Week 1 Mississippi State depth chart, and adds a live Mississippi State FOOTBALL-only news wire.

News feed behavior:
- Mississippi State only
- Football only
- Official HailState football coverage plus outside media
- Excludes baseball, basketball, softball, soccer, volleyball and other sports
- Server-side Google News RSS aggregation through `/api/opponent-news.js`
- Auto-refreshes every 5 minutes while the hub is open
- Manual refresh button included
- No API key required

Deploy the folder to Vercel (or commit it to the existing GitHub/Vercel project) so the serverless `/api/opponent-news` endpoint can run.
