// file: Player.js 
// path: src\models\Player.js

import { v4 as uuidv4 } from 'uuid';

class Player {
    constructor(name = Player.generateDefaultPlayerName(), foundWords = [], score = 0) {
        this.id = uuidv4();
        this.name = name;
        this.foundWords = foundWords; 
        this.score = score;
    }

    addWord(word) {
        this.foundWords.push(word);
        // Hier können Sie auch die Punktzahl des Spielers basierend auf dem Wort aktualisieren.
    }

    updateScore(points) {
        this.score += points;
    }

    static generateDefaultPlayerName() {
        return `Spieler ${Math.floor(Math.random() * 1000)}`;
    }

    static generateDefaultPlayer() {
        return new Player(Player.generateDefaultPlayerName());
    }
}

export default Player;