// file: PlayerList.js
// path: src\models\PlayerList.js

class PlayerList {
    constructor() {
        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayerById(id) {
        this.players = this.players.filter(player => player.id !== id);
    }

    getPlayerById(id) {
        return this.players.find(player => player.id === id);
    }
}

export default PlayerList;