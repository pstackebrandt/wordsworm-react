// file: Words.js
// path: src\models\Words.js

class Words {
    constructor() {
        this.wordsList = [];
    }

    addWord(word) {
        if (!this.wordsList.includes(word)) {
            this.wordsList.push(word);
        }
    }

    removeWord(word) {
        const index = this.wordsList.indexOf(word);
        if (index !== -1) {
            this.wordsList.splice(index, 1);
        }
    }

    hasWord(word) {
        return this.wordsList.includes(word);
    }
}

export default Words;