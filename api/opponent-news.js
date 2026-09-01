const TEAM = {
  opponent: 'Mississippi State',
  gameDate: '2026-09-05',
  officialDomains: ['hailstate.com']
};

function decode(s=''){
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1')
    .replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'")
    .replace(/&lt;/g,'<').replace(/&gt;/g,'>');
}
function strip(s=''){return decode(s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim());}
function tag(block,name){const m=block.match(new RegExp('<'+name+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+name+'>','i'));return m?strip(m[1]):'';}
function link(block){let m=block.match(/<link>([\s\S]*?)<\/link>/i);if(m)return strip(m[1]);m=block.match(/<link[^>]+href=["']([^"']+)/i);return m?m[1]:'';}
function sourceFromTitle(title){const parts=title.split(' - ');return parts.length>1?parts.pop().trim():'News';}

async function getFeed(query){
  const u='https://news.google.com/rss/search?q='+encodeURIComponent(query)+'&hl=en-US&gl=US&ceid=US:en';
  const r=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0 ULM-Football-Intelligence'}});
  if(!r.ok) throw new Error('Feed '+r.status);
  return await r.text();
}

const FOOTBALL_TERMS = /\b(football|bulldogs|sec|quarterback|\bqb\b|running back|\brb\b|wide receiver|\bwr\b|tight end|\bte\b|offensive line|defensive line|linebacker|cornerback|safety|depth chart|injury|injuries|practice|camp|scrimmage|kickoff|game|season|coach|coaching|offense|offensive|defense|defensive|special teams|transfer portal|recruit|recruiting|commit|commitment|roster|starter|starting|touchdown|passing|rushing|receiving|interception|sack)\b/i;
const OTHER_SPORTS = /\b(baseball|basketball|softball|soccer|volleyball|tennis|golf|track|cross country|swimming|women's basketball|men's basketball)\b/i;

function isFootballStory(item){
  const hay=(item.title+' '+item.description).toLowerCase();
  if(OTHER_SPORTS.test(hay) && !/football/i.test(hay)) return false;
  return FOOTBALL_TERMS.test(hay);
}

function parse(xml){
  const blocks=xml.match(/<item>[\s\S]*?<\/item>/gi)||[];
  return blocks.map(b=>{
    let title=tag(b,'title');
    const url=link(b);
    const publishedAt=tag(b,'pubDate');
    const description=tag(b,'description');
    const source=tag(b,'source')||sourceFromTitle(title);
    if(source && title.endsWith(' - '+source)) title=title.slice(0,-(' - '+source).length);
    const official=TEAM.officialDomains.some(d=>(source+' '+url).toLowerCase().includes(d.toLowerCase())) || /hail state/i.test(source);
    return {title,url,publishedAt,description:description.slice(0,240),source,kind:official?'official':'media'};
  }).filter(x=>x.title&&x.url).filter(isFootballStory);
}

export default async function handler(req,res){
  try{
    // Football-only queries. The explicit exclusions reduce Google News bleed from other MSU sports.
    const base='"Mississippi State" football when:14d -baseball -basketball -softball -soccer -volleyball';
    const officialQ='site:hailstate.com "Mississippi State" football when:30d';
    const [allXml,offXml]=await Promise.all([getFeed(base),getFeed(officialQ).catch(()=>'<rss/>')]);
    const items=[...parse(offXml),...parse(allXml)];
    const seen=new Set();
    const unique=items.filter(x=>{
      const k=x.title.toLowerCase().replace(/\W/g,'');
      if(seen.has(k)) return false;
      seen.add(k); return true;
    }).sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt)).slice(0,30);

    res.setHeader('Cache-Control','s-maxage=300, stale-while-revalidate=900');
    res.status(200).json({
      opponent:TEAM.opponent,
      gameDate:TEAM.gameDate,
      gameLabel:'Week 1 • Mississippi State Football',
      sport:'Football',
      items:unique,
      updatedAt:new Date().toISOString()
    });
  }catch(e){
    res.status(500).json({error:'news_feed_failed',message:e.message,items:[]});
  }
}
