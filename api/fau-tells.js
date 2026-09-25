const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    let b64 = '';
    for (let i = 1; i <= 6; i++) {
      const file = path.join(process.cwd(), '.tmp', `fau_pdf_0${i}.b64`);
      b64 += fs.readFileSync(file, 'utf8').trim();
    }
    const pdf = Buffer.from(b64, 'base64');
    if (pdf.slice(0, 5).toString() !== '%PDF-') throw new Error('Invalid PDF payload');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="FAU_Tells_Final.pdf"');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    res.status(200).send(pdf);
  } catch (err) {
    res.status(500).send('Unable to load FAU Offensive Tells PDF.');
  }
};
