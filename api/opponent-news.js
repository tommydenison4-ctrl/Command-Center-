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
    .replace(/&nbsp;/gi,' ').replace(/&#160;/gi,' ')
    .replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'")
    .replace(/&ldquo;|&rdquo;/gi,'"').replace(/&lsquo;|&rsquo;/gi,"'")
    .replace(/&mdash;/gi,'—').replace(/&ndash;/gi,'–')
    .replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .replace(/&#(\d+);/g,(_,n)=>{try{return String.fromCharCode(Number(n))}catch{return ' '}});
}
function strip(s=''){ const d=decode(decode(s)); return d.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim(); }
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



// Build useful notes from the actual article page when possible. This is
// extractive rather than generative: it only uses text published in the story,
// avoiding invented details while still giving coaches a quick read.
function cleanArticleText(s=''){
  return strip(s)
    .replace(/\bADVERTISEMENT\b/gi,' ')
    .replace(/\b(?:Sign up|Subscribe|Read more|Click here|Related story|More stories)\b[^.]{0,120}/gi,' ')
    .replace(/\s+/g,' ').trim();
}
function sentenceSplit(text=''){
  return cleanArticleText(text).split(/(?<=[.!?])\s+(?=[A-Z0-9“"'])/)
    .map(x=>x.trim()).filter(x=>x.length>=45 && x.length<=360);
}
function meaningfulSentence(s='', title=''){
  const low=s.toLowerCase();
  if(!s || low.includes('cookie') || low.includes('privacy policy') || low.includes('all rights reserved') || low.includes('javascript')) return false;
  const compact=(title||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const ss=low.replace(/[^a-z0-9]+/g,' ').trim();
  if(compact && (ss===compact || ss.startsWith(compact+' '))) return false;
  return true;
}
function makeExtractiveSummary(text='', title=''){
  const sentences=sentenceSplit(text).filter(s=>meaningfulSentence(s,title));
  if(!sentences.length) return '';
  const footballSignal=/\b(quarterback|qb|running back|receiver|offense|defense|linebacker|secondary|starter|starting|depth|injury|practice|scrimmage|coach|touchdown|passing|rushing|pressure|coverage|special teams|return|kickoff|game|season)\b/i;
  const ranked=sentences.map((s,i)=>({s,i,score:(footballSignal.test(s)?3:0)+(i<5?2:0)+(s.length<240?1:0)}))
    .sort((a,b)=>b.score-a.score || a.i-b.i);
  const picks=[];
  for(const r of ranked){
    if(picks.some(x=>x.s.toLowerCase()===r.s.toLowerCase())) continue;
    picks.push(r);
    if(picks.length>=3) break;
  }
  picks.sort((a,b)=>a.i-b.i);
  let out=picks.map(x=>x.s).join(' ');
  if(out.length>520) out=out.slice(0,517).replace(/\s+\S*$/,'')+'…';
  return out;
}
function extractQuote(text=''){
  const t=cleanArticleText(text);
  const patterns=[/[“\"]([^”\"]{35,220})[”\"]/g,/‘([^’]{35,220})’/g];
  for(const re of patterns){
    let m;
    while((m=re.exec(t))){
      const q=(m[1]||'').trim();
      if(/\b(?:cookie|subscribe|copyright|privacy)\b/i.test(q)) continue;
      return q;
    }
  }
  return '';
}
function inferTagsFromText(text=''){
  const t=text.toLowerCase();
  const rules=[
    ['INJURY',/injur|hurt|questionable|limited|ruled out|availability/],
    ['DEPTH',/depth chart|starter|starting|first team|two-deep|position battle/],
    ['QB',/quarterback|\bqb\b/],
    ['OFFENSE',/offense|offensive|receiver|running back|tight end|offensive line|touchdown|passing|rushing/],
    ['DEFENSE',/defense|defensive|linebacker|cornerback|safety|secondary|pass rush|pressure|coverage/],
    ['SPECIAL TEAMS',/special teams|kicker|punter|returner|kickoff|punt return|kick return/],
    ['COACH QUOTE',/head coach|offensive coordinator|defensive coordinator|coach .*said|coach .*says/],
    ['PERSONNEL',/transfer|roster|returning|freshman|senior|junior|sophomore/]
  ];
  const out=[]; for(const [label,re] of rules){if(re.test(t) && out.length<4) out.push(label)}
  return out.length?out:['GAME WEEK'];
}
function isBoilerplateNewsText(text='', title=''){
  const t=cleanArticleText(text);
  if(!t || t.length<90) return true;
  if(/comprehensive up-to-date news coverage|aggregated from sources all over the world by google news|google news/i.test(t)) return true;
  const norm=x=>(x||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const nt=norm(title), nb=norm(t);
  if(nt && (nb===nt || nb.startsWith(nt+' ') || nt.startsWith(nb+' '))) return true;
  return false;
}
function makeNoteLines(text='', title=''){
  const sentences=sentenceSplit(text).filter(x=>meaningfulSentence(x,title));
  if(!sentences.length) return [];
  const buckets=[
    {label:'WHAT MATTERS',re:/\b(starter|starting|will start|expected|plan|focus|emphasis|goal|prepare|opener|matchup|role|rotation|change|return)\b/i},
    {label:'PERSONNEL',re:/\b(quarterback|qb|running back|receiver|tight end|offensive line|linebacker|cornerback|safety|transfer|freshman|senior|player|depth|rotation)\b/i},
    {label:'SCHEME / STYLE',re:/\b(offense|defense|tempo|run game|passing|pressure|coverage|front|formation|special teams|blitz|rushing|passing)\b/i},
    {label:'STATUS',re:/\b(injury|injured|healthy|available|availability|limited|questionable|out|returning|practice|scrimmage)\b/i}
  ];
  const used=new Set(), out=[];
  for(const b of buckets){
    const hit=sentences.find((x,i)=>!used.has(i)&&b.re.test(x));
    if(hit){ const i=sentences.indexOf(hit); used.add(i); out.push({label:b.label,text:hit}); }
  }
  for(let i=0;i<sentences.length && out.length<4;i++){
    if(used.has(i)) continue;
    used.add(i); out.push({label:out.length?'MORE':'WHAT MATTERS',text:sentences[i]});
  }
  return out.slice(0,4).map(x=>({label:x.label,text:x.text.length>240?x.text.slice(0,237).replace(/\s+\S*$/,'')+'…':x.text}));
}
async function fetchReadableTextViaReader(url){
  // Jina Reader is a public readability fallback. It is especially useful for
  // SIDEARM athletics pages and Google News redirect URLs that return a shell
  // instead of the actual story HTML to a serverless fetch.
  try{
    const target='https://r.jina.ai/http://r.jina.ai/http://invalid';
    const clean=String(url||'').replace(/^https?:\/\//i,'');
    const reader='https://r.jina.ai/http://'+clean;
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),6500);
    try{
      const r=await fetch(reader,{signal:controller.signal,headers:{'User-Agent':'Mozilla/5.0 ULM-Football-Intelligence'}});
      if(!r.ok) return '';
      const md=await r.text();
      // Remove markdown chrome while preserving paragraph/sentence content.
      return cleanArticleText(md
        .replace(/^Title:.*$/gmi,' ')
        .replace(/^URL Source:.*$/gmi,' ')
        .replace(/^Published Time:.*$/gmi,' ')
        .replace(/^Markdown Content:.*$/gmi,' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g,' ')
        .replace(/\[([^\]]+)\]\([^)]*\)/g,'$1')
        .replace(/^#{1,6}\s+/gm,' ')
        .replace(/[>*_`~|]/g,' '));
    }finally{clearTimeout(timer)}
  }catch{return ''}
}
function articleTextQuality(text='',title=''){
  const t=cleanArticleText(text);
  if(isBoilerplateNewsText(t,title)) return 0;
  const sentences=sentenceSplit(t).filter(x=>meaningfulSentence(x,title));
  const football=sentences.filter(x=>/\b(football|quarterback|qb|receiver|running back|offense|defense|coach|starter|practice|scrimmage|touchdown|passing|rushing|coverage|pressure|special teams|season|game)\b/i.test(x));
  return Math.min(100,t.length/25)+sentences.length*5+football.length*8;
}
async function fetchArticleIntelligence(item){
  let directText=''; let body=''; let finalUrl=item.url||'';
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),5000);
  try{
    const r=await fetch(item.url,{redirect:'follow',signal:controller.signal,headers:{'User-Agent':'Mozilla/5.0 (compatible; ULMFootballIntelligence/1.0)'}});
    if(r.ok){
      finalUrl=r.url||item.url;
      const html=await r.text();
      const bodies=[];
      // Common JSON-LD forms. Some sites escape articleBody differently, so
      // collect all plausible matches rather than relying on one exact shape.
      const reAB=/["']articleBody["']\s*:\s*["']((?:\\.|[^"'\\])*)["']/gi;
      let ab;
      while((ab=reAB.exec(html))){
        let v=ab[1]||'';
        try{v=JSON.parse('"'+v.replace(/"/g,'\\"')+'"')}catch{v=v.replace(/\\n/g,' ').replace(/\\"/g,'"').replace(/\\u0026/g,'&')}
        if(v.length>150) bodies.push(v);
      }
      // Pull article/main paragraphs before generic page paragraphs.
      const pre=html.replace(/<script\b[\s\S]*?<\/script>/gi,' ').replace(/<style\b[\s\S]*?<\/style>/gi,' ');
      const articleMatch=pre.match(/<(?:article|main)\b[^>]*>([\s\S]*?)<\/(?:article|main)>/i);
      const scope=articleMatch?articleMatch[1]:pre;
      const paragraphs=[]; let m;
      const re=/<p\b[^>]*>([\s\S]*?)<\/p>/gi;
      while((m=re.exec(scope))){
        const txt=cleanArticleText(m[1]);
        if(txt.length>=45 && meaningfulSentence(txt,item.title)) paragraphs.push(txt);
        if(paragraphs.length>=40) break;
      }
      const meta=(html.match(/<meta[^>]+(?:name|property)=["'](?:description|og:description)["'][^>]+content=["']([^"']+)["']/i)||[])[1]||'';
      body=[...bodies,paragraphs.join(' '),meta].sort((a,b)=>b.length-a.length)[0]||'';
      directText=cleanArticleText(body);
    }
  }catch{}finally{clearTimeout(timer)}

  // If a normal fetch landed on Google News, got blocked, or produced thin
  // content, ask a readability proxy for the rendered/readable story text.
  let readerText='';
  if(/news\.google\.com/i.test(finalUrl)||articleTextQuality(directText,item.title)<55){
    readerText=await fetchReadableTextViaReader(item.url);
  }
  let sourceText=articleTextQuality(readerText,item.title)>articleTextQuality(directText,item.title)?readerText:directText;
  if(isBoilerplateNewsText(sourceText,item.title)) sourceText='';

  // RSS snippets are only a last fallback and only when they contain enough
  // real story context. They are never described as a video item by default.
  if(!sourceText){
    const feed=cleanArticleText(item.description||'');
    if(!isBoilerplateNewsText(feed,item.title) && feed.length>=130) sourceText=feed;
  }

  const noteLines=makeNoteLines(sourceText,item.title);
  const summary=noteLines.map(x=>x.text).join(' ');
  const quote=sourceText ? extractQuote(sourceText) : '';
  const tags=inferTagsFromText((item.title||'')+' '+sourceText);
  const hasNotes=noteLines.length>=2 && articleTextQuality(sourceText,item.title)>=45;
  return {...item,summary,noteLines,quote,tags,hasNotes,notesSource:hasNotes?(readerText===sourceText?'reader':directText===sourceText?'article':'feed'):'none'};
}
async function mapLimit(items,limit,fn){
  const out=new Array(items.length); let next=0;
  async function worker(){while(true){const i=next++; if(i>=items.length) return; out[i]=await fn(items[i]);}}
  await Promise.all(Array.from({length:Math.min(limit,items.length)},worker));
  return out;
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
    const uniqueBase=items.filter(x=>{
      const k=x.title.toLowerCase().replace(/\W/g,'');
      if(seen.has(k)) return false;
      seen.add(k); return true;
    }).sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt)).slice(0,30);

    // Enrich the 15 stories actually shown in the carousel. We read the page
    // itself where possible so READ NOTES contains substantive article notes.
    const enrichedTop=await mapLimit(uniqueBase.slice(0,15),5,fetchArticleIntelligence);
    const unique=[...enrichedTop,...uniqueBase.slice(15).map(x=>{const t=cleanArticleText(x.description||'');const noteLines=isBoilerplateNewsText(t,x.title)?[]:makeNoteLines(t,x.title);return {...x,summary:noteLines.map(n=>n.text).join(' '),noteLines,tags:inferTagsFromText((x.title||'')+' '+t),hasNotes:noteLines.length>=2,notesSource:noteLines.length?'feed':'none'}})];

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
