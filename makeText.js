const { MarkovMachine } = require('./markov');
const axios = require('axios');
const fs = require('fs');

/** Command-line tool to generate Markov text. */

const getTextFromFile = filePath => {
  try {
    const contents = fs.readFileSync(filePath, 'utf8');
    generateText(contents);
  } catch(e) {
    console.error(`Error reading ${filePath}\n${e}`);
    process.exit(1);
  }
}

async function getTextFromUrl(url) {
  try {
    const res = await axios.get(url);
    generateText(res.data);
  } catch(e) {
    console.error(`Error fetching ${url}\n${e}`);
    process.exit(1);
  }
}

const generateText = (text) => {
  const mm = new MarkovMachine(text);
  const generatedText = mm.makeText();
  console.log(generatedText);
}

if (process.argv.length < 4) {
  console.error('Too few arguments.');
  process.exit(1);

} else {
  if (process.argv[2] === 'file') {
    const filePath = process.argv[3];
    getTextFromFile(filePath);
  }
  else if (process.argv[2] === 'url') {
    const url = process.argv[3];
    getTextFromUrl(url);
  }
}