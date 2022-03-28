/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    return this.words.reduce((map, word, i) => {
      
      let nextWord = this.words[i + 1];
      if (!nextWord) { nextWord = null };

      return {
      ...map,
      [word]: (map[word] || []).concat(nextWord),
      }
  
    }, {});
  }

  getRandIdx(lengthOfArr) {
    return Math.floor(Math.random() * lengthOfArr);
  }

  getStarterWord() {
    const numWords = this.words.length;
    return this.words[this.getRandIdx(numWords)];
  }

  getNextWord(word) {
    const numNextWords = (this.chains[word]).length;

    const nextWords = this.chains[word];
    return nextWords[this.getRandIdx(numNextWords)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {

    let prevWord = this.getStarterWord();
    let generatedText = prevWord;

    for (let word = 1; word < numWords; ++word) {
      let nextWord = this.getNextWord(prevWord);
      if (nextWord === null) break;
      generatedText += ' ' + nextWord;
      prevWord = nextWord;
    }

    return generatedText;
  }
}

module.exports = {
  MarkovMachine,
};