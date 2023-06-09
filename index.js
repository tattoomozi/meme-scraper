// Engage fs ))
import fs from 'node:fs';
// Import cheerio package
import * as cheerio from 'cheerio';
// Import module that brings Fetch API to Node.js.
import fetch from 'node-fetch';

// Fetching the URL and the Content
const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
// Translate URL into HTML TEXT
const body = await response.text();

// Loading data into cheerio
const $ = cheerio.load(body);

// create folder if not existing
if (!fs.existsSync('./memes')) {
  fs.mkdirSync('./memes');
}

// Creating For Loop fetching 10 pictures without refresh
for (let i = 1; i < 11; i++) {
  const currentImg = $('img', body)[i - 1].attribs.src;
  await fetch(currentImg).then((res) => {
    let path = './memes/0' + i + '.jpg';
    if (i === 10) {
      path = './memes/' + i + '.jpg';
    }
    const dest = fs.createWriteStream(path);
    res.body.pipe(dest);
    console.log(currentImg);
  });
}
