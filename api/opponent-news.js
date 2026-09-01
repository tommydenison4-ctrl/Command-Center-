const TEAMS = {
  msstate: {
    name: 'Mississippi State',
    espnId: '344',
    searchName: 'Mississippi State',
    espnSlug: 'mississippi-state',
    officialDomains: ['hailstate.com'],
    officialArchive: 'https://hailstate.com/sports/football/archives?path=football',
    titleAliases: [/\bmississippi state\b/i,/\bmississippi st\.?\b/i,/\bmsu bulldogs?\b/i,/\bstate bulldogs?\b/i]
  },
  uab: {
    name: 'UAB',
    espnId: '5',
    searchName: 'UAB Blazers',
    espnSlug: 'uab',
    officialDomains: ['uabsports.com'],
    officialArchive: 'https://uabsports.com/sports/football/archives?path=football',
    titleAliases: [/\buab\b/i,/\buab blazers?\b/i]
  },
  southeastern: {
    name: 'Southeastern Louisiana',
    espnId: '2545',
    searchName: 'Southeastern Louisiana',
    espnSlug: 'southeastern-louisiana',
    officialDomains: ['lionsports.net'],
    officialArchive: 'https://lionsports.net/sports/football/archives?path=football',
    titleAliases: [/\bsoutheastern louisiana\b/i,/\bslu lions?\b/i]
  },
  fau: {
    name: 'FAU',
    espnId: '2226',
    searchName: 'Florida Atlantic',
    espnSlug: 'florida-atlantic',
    officialDomains: ['fausports.com'],
    officialArchive: 'https://fausports.com/sports/football/archives?path=football',
    titleAliases: [/\bflorida atlantic\b/i,/\bfau\b/i,/\bfau owls?\b/i]
  },
  southalabama: {
    name: 'South Alabama',
    espnId: '6',
    searchName: 'South Alabama Jaguars',
    espnSlug: 'south-alabama',
    officialDomains: ['usajaguars.com'],
    officialArchive: 'https://usajaguars.com/sports/football/archives?path=football',
    titleAliases: [/\bsouth alabama\b/i,/\busa jaguars?\b/i]
  },
  latech: {
    name: 'Louisiana Tech',
    espnId: '2348',
    searchName: 'Louisiana Tech Bulldogs',
    espnSlug: 'louisiana-tech',
    officialDomains: ['latechsports.com'],
    officialArchive: 'https://latechsports.com/sports/football/archives?path=football',
    titleAliases: [/\blouisiana tech\b/i,/\blatech\b/i,/\bla tech\b/i]
  },
  troy: {
    name: 'Troy',
    espnId: '2653',
    searchName: 'Troy Trojans',
    espnSlug: 'troy',
    officialDomains: ['troytrojans.com'],
    officialArchive: 'https://troytrojans.com/sports/football/archives?path=football',
    titleAliases: [/\btroy trojans?\b/i,/\btroy football\b/i]
  },
  southernmiss: {
    name: 'Southern Miss',
    espnId: '2572',
    searchName: 'Southern Miss Golden Eagles',
    espnSlug: 'southern-miss',
    officialDomains: ['southernmiss.com'],
    officialArchive: 'https://southernmiss.com/sports/football/archives?path=football',
    titleAliases: [/\bsouthern miss\b/i,/\bsouthern mississippi\b/i,/\busm golden eagles?\b/i]
  },
  arkansasstate: {
    name: 'Arkansas State',
    espnId: '2032',
    searchName: 'Arkansas State Red Wolves',
    espnSlug: 'arkansas-state',
    officialDomains: ['astateredwolves.com'],
    officialArchive: 'https://astateredwolves.com/sports/football/archives?path=football',
    titleAliases: [/\barkansas state\b/i,/\ba-state\b/i,/\barkansas st\.?\b/i]
  },
  louisiana: {
    name: "Ragin' Cajuns",
    espnId: '309',
    searchName: 'Louisiana Ragin Cajuns',
    espnSlug: 'louisiana',
    officialDomains: ['ragincajuns.com'],
    officialArchive: 'https://ragincajuns.com/sports/football/archives?path=football',
    titleAliases: [/\blouisiana ragin'? cajuns?\b/i,/\bragin'? cajuns?\b/i,/\bul lafayette\b/i]
  },
  appstate: {
    name: 'App State',
    espnId: '2026',
    searchName: 'Appalachian State Mountaineers',
    espnSlug: 'appalachian-state',
    officialDomains: ['appstatesports.com'],
    officialArchive: 'https://appstatesports.com/sports/football/archives?path=football',
    titleAliases: [/\bapp state\b/i,/\bappalachian state\b/i,/\bmountaineers football\b/i]
  },
  marshall: {
    name: 'Marshall',
    espnId: '276',
    searchName: 'Marshall Thundering Herd',
    espnSlug: 'marshall',
    officialDomains: ['herdzone.com'],
    officialArchive: 'https://herdzone.com/sports/football/archives?path=football',
    titleAliases: [/\bmarshall thundering herd\b/i,/\bmarshall football\b/i]
  }
};

function decode(s=''){
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1')
    .replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'")
    .replace(/&lt;/g,'<').replace(/&gt;/g,'>');
}
function strip(s=''){ return decode(s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()); }
function tag(block,name){ const m=block.match(new RegExp('<'+name+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+name+'>','i')); return m ? strip(m[1]) : ''; }
function link(block){ let m=block.match(/<link>([\s\S]*?)<\/link>/i); if(m) return strip(m[1]); m=block.match(/<link[^>]+href=["']([^"']+)/i); return m ? m[1] : ''; }
function sourceFromTitle(title){ const parts=title.split(' - '); return parts.length > 1 ? parts.pop().trim() : 'News'; }

async function getFeed(query){
  const u='https://news.google.com/rss/search?q='+encodeURIComponent(query)+'&hl=en-US&gl=US&ceid=US:en';
  const r=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0 ULM-Football-Intelligence'}});
  if(!r.ok) throw new Error('News feed '+r.status);
  return await r.text();
}

// Football has to be positively identified. Generic school words such as
// "Bulldogs", "game", "season" or "coach" are intentionally NOT enough;
// those were allowing other Mississippi State sports into the feed.
const STRICT_FOOTBALL_TERMS = /\b(football|quarterback|qb|running back|rb|wide receiver|wr|tight end|te|offensive line|o-line|defensive line|d-line|linebacker|cornerback|defensive back|secondary|safety|edge rusher|pass rush|depth chart|scrimmage|kickoff|touchdown|passing|rushing|receiving|interception|sack|punt|punter|field goal|placekicker|special teams|offense|offensive|defense|defensive|red zone|two[- ]minute|third down|fourth down|fbs|bowl game)\b/i;
const OTHER_SPORTS = /\b(baseball|basketball|softball|soccer|volleyball|tennis|golf|track(?: and field)?|cross country|swimming|wrestling|gymnastics|lacrosse|hockey)\b/i;
const FOOTBALL_URL = /\/(?:sports\/football(?:\/|$)|football(?:[-\/]|$))/i;
const OTHER_SPORT_URL = /\/(?:baseball|softball|soccer|volleyball|mens-basketball|womens-basketball|men-s-basketball|women-s-basketball|mens-golf|womens-golf|men-s-golf|women-s-golf|mens-tennis|womens-tennis|men-s-tennis|women-s-tennis|track-and-field|cross-country)(?:[-\/]|$)/i;

function isFootballStory(item){
  const hay=((item.title||'')+' '+(item.description||'')).toLowerCase();
  const url=item.url||'';
  // Reject URLs that explicitly identify another sport, even if the article
  // happens to contain a generic football-adjacent word elsewhere.
  if(OTHER_SPORT_URL.test(url) && !FOOTBALL_URL.test(url)) return false;
  if(FOOTBALL_URL.test(url)) return true;
  if(OTHER_SPORTS.test(hay) && !/\bfootball\b/i.test(hay)) return false;
  return STRICT_FOOTBALL_TERMS.test(hay);
}

// Keep the feed about the CURRENT opponent, not alumni/former-player stories.
// Official athletics stories are trusted. External media must name the team
// (or an unambiguous team alias) in the HEADLINE itself.
const FORMER_PLAYER_CONTEXT=/\b(former|ex[- ]|previously at|transferred from|transfer from|alumnus|alumni)\b/i;
function isCurrentTeamStory(item, team){
  if(item.kind==='official') return true;
  const title=item.title||'';
  if(FORMER_PLAYER_CONTEXT.test(title)) return false;
  return (team.titleAliases||[]).some(re=>re.test(title));
}

function parseNews(xml, team){
  const blocks=xml.match(/<item>[\s\S]*?<\/item>/gi)||[];
  return blocks.map(b=>{
    let title=tag(b,'title');
    const url=link(b);
    const publishedAt=tag(b,'pubDate');
    const description=tag(b,'description');
    const source=tag(b,'source')||sourceFromTitle(title);
    if(source && title.endsWith(' - '+source)) title=title.slice(0,-(' - '+source).length);
    const official=team.officialDomains.some(d=>(source+' '+url).toLowerCase().includes(d.toLowerCase()));
    return {title,url,publishedAt,description:description.slice(0,260),source,kind:official?'official':'media'};
  }).filter(x=>x.title&&x.url).filter(isFootballStory).filter(x=>isCurrentTeamStory(x,team));
}


async function fetchOfficialFootballArchive(team){
  if(!team.officialArchive) return [];
  try{
    const r=await fetch(team.officialArchive,{headers:{'User-Agent':'Mozilla/5.0 ULM-Football-Intelligence'}});
    if(!r.ok) return [];
    const html=await r.text();
    // Restrict parsing to the archive section. On SIDEARM athletics sites this
    // section is already filtered to Football, so titles do NOT need to contain
    // words like "football", "QB", etc. This preserves headlines such as
    // "Evans Eyeing Record-Breaking Year..." without admitting golf/basketball.
    const marker=html.search(/Story\s+Archives/i);
    let section=marker>=0 ? html.slice(marker) : html;
    const footer=section.search(/<footer\b|sidearm-footer/i);
    if(footer>0) section=section.slice(0,footer);

    const domain=team.officialDomains?.[0] || '';
    const base=domain ? `https://${domain}` : team.officialArchive;
    const out=[];
    const seen=new Set();
    const re=/<a\b[^>]*href=["']([^"']*\/news\/\d{4}\/\d{1,2}\/\d{1,2}\/[^"'#?]+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    while((m=re.exec(section))){
      let href=decode(m[1]).trim();
      let title=strip(m[2]);
      if(!title || /^(read more|details|recap|story)$/i.test(title)) continue;
      let url;
      try{ url=new URL(href,base).toString(); }catch{ continue; }
      if(OTHER_SPORT_URL.test(url) || OTHER_SPORTS.test(title)) continue;
      const dm=href.match(/\/news\/(\d{4})\/(\d{1,2})\/(\d{1,2})\//i);
      const publishedAt=dm ? new Date(Date.UTC(Number(dm[1]),Number(dm[2])-1,Number(dm[3]),12,0,0)).toISOString() : '';
      const key=(title+'|'+url).toLowerCase();
      if(seen.has(key)) continue;
      seen.add(key);
      out.push({title,url,publishedAt,description:'',source:domain||team.name+' Athletics',kind:'official'});
      if(out.length>=40) break;
    }
    return out;
  }catch{
    return [];
  }
}

async function fetchSchedule(teamId, season){
  const url=`https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${encodeURIComponent(teamId)}/schedule?season=${season}`;
  const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 ULM-Football-Intelligence'}});
  if(!r.ok) throw new Error('Schedule '+r.status);
  return await r.json();
}

function scoreValue(score){
  if(score == null) return null;
  if(typeof score === 'object') score=score.displayValue ?? score.value;
  const n=Number(score);
  return Number.isFinite(n) ? n : null;
}

function parseGames(data, team){
  const events=Array.isArray(data?.events) ? data.events : [];
  return events.map(event=>{
    const comp=event?.competitions?.[0] || {};
    const competitors=Array.isArray(comp.competitors) ? comp.competitors : [];
    const completed=Boolean(event?.status?.type?.completed || comp?.status?.type?.completed);
    if(!completed || competitors.length < 2) return null;
    let ours=competitors.find(c=>String(c?.team?.id||'')===String(team.espnId));
    if(!ours){
      ours=competitors.find(c=>(c?.team?.displayName||'').toLowerCase().includes(team.name.toLowerCase()));
    }
    if(!ours) ours=competitors[0];
    const opp=competitors.find(c=>c!==ours) || competitors[1];
    const ourScore=scoreValue(ours?.score);
    const oppScore=scoreValue(opp?.score);
    const result=(ourScore!=null && oppScore!=null) ? (ourScore>oppScore?'W':ourScore<oppScore?'L':'T') : '';
    const homeAway=ours?.homeAway==='home'?'vs':'at';
    return {
      id:String(event?.id||''),
      date:event?.date||'',
      opponent:opp?.team?.displayName || opp?.team?.shortDisplayName || 'Opponent',
      opponentLogo:opp?.team?.logo || '',
      homeAway,
      result,
      teamScore:ourScore,
      opponentScore:oppScore,
      venue:comp?.venue?.fullName || '',
      boxscoreUrl:event?.id ? `https://www.espn.com/college-football/boxscore/_/gameId/${event.id}` : ''
    };
  }).filter(Boolean);
}

export default async function handler(req,res){
  const key=String(req.query?.team||'msstate').toLowerCase();
  const team=TEAMS[key] || TEAMS.msstate;
  try{
    const newsBase=`intitle:"${team.searchName}" football when:14d -baseball -basketball -softball -soccer -volleyball`;
    // Keep a Google News official-site fallback, but do not require 'football'
    // in the URL. Many legitimate football headlines have generic slugs/titles.
    const officialBase=team.officialDomains[0] ? `site:${team.officialDomains[0]} "${team.searchName}" football when:30d -baseball -basketball -softball -soccer -volleyball -golf -tennis` : newsBase;

    const [allXml, offXml, officialArchive, schedule26, schedule25] = await Promise.all([
      getFeed(newsBase),
      getFeed(officialBase).catch(()=>'<rss/>'),
      fetchOfficialFootballArchive(team),
      fetchSchedule(team.espnId,2026).catch(()=>({events:[]})),
      fetchSchedule(team.espnId,2025).catch(()=>({events:[]}))
    ]);

    // Archive entries come from the school's Football archive itself and are
    // therefore trusted as football. Google feeds remain filtered as before.
    const items=[...officialArchive,...parseNews(offXml,team),...parseNews(allXml,team)];
    const seen=new Set();
    const unique=items.filter(x=>{
      const k=x.title.toLowerCase().replace(/\W/g,'');
      if(seen.has(k)) return false;
      seen.add(k); return true;
    }).sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt)).slice(0,30);

    const games=[...parseGames(schedule26,team),...parseGames(schedule25,team)]
      .sort((a,b)=>new Date(b.date)-new Date(a.date))
      .slice(0,8);

    res.setHeader('Cache-Control','s-maxage=300, stale-while-revalidate=900');
    res.status(200).json({
      teamKey:key,
      opponent:team.name,
      sport:'Football',
      items:unique,
      games,
      updatedAt:new Date().toISOString()
    });
  }catch(e){
    res.status(500).json({error:'opponent_feed_failed',message:e.message,items:[],games:[]});
  }
}
