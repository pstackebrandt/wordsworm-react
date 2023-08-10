// file: FoundWords.js
// path: src\models\FoundWords.js

// Well be use to store and manage the words found by all players in the game together.
class FoundWords {
    constructor(words = []) {
        this.words = words;
    }

    addWord(word) {
        if (!this.words.includes(word)) {
            this.words.push(word);
        }
    }

    removeWord(word) {
        const index = this.words.indexOf(word);
        if (index !== -1) {
            this.words.splice(index, 1);
        }
    }

    hasWord(word) {
        return this.words.includes(word);
    }
}

export default FoundWords;