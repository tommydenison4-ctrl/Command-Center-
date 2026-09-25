const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const indexPath = path.join(process.cwd(), 'index.html');
    let html = fs.readFileSync(indexPath, 'utf8');
    if (!html.includes('href="FAU_Tells_Final.pdf"')) {
      const marker = ' <div class="reportGameLabel">WEEK 3 - SOUTHEASTERN LOUISIANA</div>';
      const card = ` <div class="reportGameLabel">WEEK 4 - FLORIDA ATLANTIC</div>
 <a class="futureCard reportCard liveFuture" href="FAU_Tells_Final.pdf" target="_blank" rel="noopener">
   <div class="futureHead"><div><div class="futureTag">OFFENSIVE TELLS</div><h3>Florida Atlantic Offensive Tells</h3></div><div class="planned">OPEN PDF ↗</div></div>
   <p>Florida Atlantic 2026 offensive tendency report covering formation, motion, run/pass, play family and ball carrier/target indicators.</p>
   <div class="futureViz"><svg viewBox="0 0 240 118"><path class="gridMini" d="M25 25H215M25 55H215M25 85H215M60 15V100M105 15V100M150 15V100M195 15V100"/><path class="maroonPath" d="M26 82 L60 66 L105 70 L150 45 L195 39"/><path class="goldPath" d="M26 69 L60 62 L105 48 L150 54 L195 28"/><circle class="node" cx="195" cy="28" r="5"/><text x="20" y="108" class="svgLabel">FAU OFFENSIVE TELLS</text></svg></div>
   <div class="futureSteps"><span>FORMATION</span><span>MOTION + RUN/PASS</span><span>PLAY FAMILY + TARGETS</span></div>
 </a>

`;
      if (!html.includes(marker)) throw new Error('Report insertion marker not found');
      html = html.replace(marker, card + marker);
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300');
    res.status(200).send(html);
  } catch (err) {
    res.status(500).send('Unable to load Command Center.');
  }
};
