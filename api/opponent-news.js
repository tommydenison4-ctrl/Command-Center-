const TEAMS = {
  msstate: {
    name: 'Mississippi State',
    espnId: '344',
    searchName: 'Mississippi State',
    espnSlug: 'mississippi-state',
    officialDomains: ['hailstate.com'],
    titleAliases: [/\bmississippi state\b/i,/\bmississippi st\.?\b/i,/\bmsu bulldogs?\b/i,/\bstate bulldogs?\b/i]
  },
  uab: {
    name: 'UAB',
    espnId: '5',
    searchName: 'UAB Blazers',
    espnSlug: 'uab',
    officialDomains: ['uabsports.com'],
    titleAliases: [/\buab\b/i,/\buab blazers?\b/i]
  },
  southeastern: {
    name: 'Southeastern Louisiana',
    espnId: '2545',
    searchName: 'Southeastern Louisiana',
    espnSlug: 'southeastern-louisiana',
    officialDomains: ['lionsports.net'],
    titleAliases: [/\bsoutheastern louisiana\b/i,/\bslu lions?\b/i]
  },
  fau: {
    name: 'FAU',
    espnId: '2226',
    searchName: 'Florida Atlantic',
    espnSlug: 'florida-atlantic',
    officialDomains: ['fausports.com'],
    titleAliases: [/\bflorida atlantic\b/i,/\bfau\b/i,/\bfau owls?\b/i]
  },
  southalabama: {
    name: 'South Alabama',
    espnId: '6',
    searchName: 'South Alabama Jaguars',
    espnSlug: 'south-alabama',
    officialDomains: ['usajaguars.com'],
    titleAliases: [/\bsouth alabama\b/i,/\busa jaguars?\b/i]
  },
  latech: {
    name: 'Louisiana Tech',
    espnId: '2348',
    searchName: 'Louisiana Tech Bulldogs',
    espnSlug: 'louisiana-tech',
    officialDomains: ['latechsports.com'],
    titleAliases: [/\blouisiana tech\b/i,/\blatech\b/i,/\bla tech\b/i]
  },
  troy: {
    name: 'Troy',
    espnId: '2653',
    searchName: 'Troy Trojans',
    espnSlug: 'troy',
    officialDomains: ['troytrojans.com'],
    titleAliases: [/\btroy trojans?\b/i,/\btroy football\b/i]
  },
  southernmiss: {
    name: 'Southern Miss',
    espnId: '2572',
    searchName: 'Southern Miss Golden Eagles',
    espnSlug: 'southern-miss',
    officialDomains: ['southernmiss.com'],
    titleAliases: [/\bsouthern miss\b/i,/\bsouthern mississippi\b/i,/\busm golden eagles?\b/i]
  },
  arkansasstate: {
    name: 'Arkansas State',
    espnId: '2032',
    searchName: 'Arkansas State Red Wolves',
    espnSlug: 'arkansas-state',
    officialDomains: ['astateredwolves.com'],
    titleAliases: [/\barkansas state\b/i,/\ba-state\b/i,/\barkansas st\.?\b/i]
  },
  louisiana: {
    name: "Ragin' Cajuns",
    espnId: '309',
    searchName: 'Louisiana Ragin Cajuns',
    espnSlug: 'louisiana',
    officialDomains: ['ragincajuns.com'],
    titleAliases: [/\blouisiana ragin'? cajuns?\b/i,/\bragin'? cajuns?\b/i,/\bul lafayette\b/i]
  },
  appstate: {
    name: 'App State',
    espnId: '2026',
    searchName: 'Appalachian State Mountaineers',
    espnSlug: 'appalachian-state',
    officialDomains: ['appstatesports.com'],
    titleAliases: [/\bapp state\b/i,/\bappalachian state\b/i,/\bmountaineers football\b/i]
  },
  marshall: {
    name: 'Marshall',
    espnId: '276',
    searchName: 'Marshall Thundering Herd',
    espnSlug: 'marshall',
    officialDomains: ['herdzone.com'],
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

const FOOTBALL_TERMS = /\b(football|bulldogs|blazers|lions|owls|jaguars|trojans|golden eagles|red wolves|cajuns|mountaineers|thundering herd|sun belt|sec|aac|c-usa|conference usa|quarterback|\bqb\b|running back|\brb\b|wide receiver|\bwr\b|tight end|\bte\b|offensive line|defensive line|linebacker|cornerback|safety|depth chart|injury|injuries|practice|camp|scrimmage|kickoff|game|season|coach|coaching|offense|offensive|defense|defensive|special teams|transfer portal|recruit|recruiting|commit|commitment|roster|starter|starting|touchdown|passing|rushing|receiving|interception|sack)\b/i;
const OTHER_SPORTS = /\b(baseball|basketball|softball|soccer|volleyball|tennis|golf|track|cross country|swimming|women's basketball|men's basketball)\b/i;

function isFootballStory(item){
  const hay=(item.title+' '+item.description).toLowerCase();
  if(OTHER_SPORTS.test(hay) && !/football/i.test(hay)) return false;
  return FOOTBALL_TERMS.test(hay);
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
    const officialBase=team.officialDomains[0] ? `site:${team.officialDomains[0]} "${team.searchName}" football when:30d` : newsBase;

    const [allXml, offXml, schedule26, schedule25] = await Promise.all([
      getFeed(newsBase),
      getFeed(officialBase).catch(()=>'<rss/>'),
      fetchSchedule(team.espnId,2026).catch(()=>({events:[]})),
      fetchSchedule(team.espnId,2025).catch(()=>({events:[]}))
    ]);

    const items=[...parseNews(offXml,team),...parseNews(allXml,team)];
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
