// file: GameProvider.jsx

import React, { useState } from 'react';

// Components
import GameContext, { defaultPlayer } from './GameContext';

// Importing your classes
import Words from '../models/Words';
import Player from '../models/Player';
import PlayerList from '../models/PlayerList';

const GameProvider = ({ children }) => {
    const [wordList, setWordList] = useState(new Words());
    const initialPlayers = [defaultPlayer];
    const [playerList, setPlayerList] = useState(new PlayerList(initialPlayers));

    console.log("GameProvider: playerList length after init with default player: " + playerList.players.length);

    const addWord = (word) => {
        wordList.addWord(word);
        setWordList(new Words([...wordList.wordsList])); // A little trick to trigger re-render
    };

    const addPlayer = (name) => {
        setPlayerList(prevList => {
            const newPlayerList = new PlayerList();
            newPlayerList.players = [...prevList.players];
            const newPlayer = new Player(name);
            newPlayerList.addPlayer(newPlayer);
            return newPlayerList;
        });
    };

    const addDefaultPlayer = () => {
        addPlayer(Player.generateDefaultPlayerName());
    };

    /**
     * Updates the properties of a player given their ID and the new data.
     * 
     * @param {string} playerId - The unique identifier for the player to be updated.
     * @param {object} updatedPlayerData - An object containing the updated player data. 
     *      Possible properties include: `name`, `foundWords`, and `score`.
     */
    const updatePlayer = (playerId, updatedPlayerData) => {
        const player = playerList.getPlayerById(playerId);
        if (player) {
            if (updatedPlayerData.name) player.name = updatedPlayerData.name;
            if (updatedPlayerData.foundWords) player.foundWords = updatedPlayerData.foundWords;
            if (updatedPlayerData.score) player.score = updatedPlayerData.score;
            // Sets the player list state with a new instance to trigger a re-render.
            setPlayerList(new PlayerList([...playerList.players]));
        }
    };

    /**
     * The `value` object represents the context value for the GameProvider.
     * 
     * Properties:
     * - `words`: An array of words that players can find. Derived from the `wordList` class instance.
     * - `players`: An array of player objects, each with properties such as `id`, `name`, `foundWords`,
     *              and `score`. Derived from the `playerList` class instance.
     * - `addWord`: A function to add a word to the `wordList`.
     * - `addPlayer`: A function to add a new player to the `playerList`.
     * - `addDefaultPlayer`: A function to add a default player to the `playerList`.
     * - `updatePlayer`: A function to update an existing player's properties in the `playerList`.
     */
    const value = {
        words: wordList.wordsList,
        players: playerList.players,
        addWord,
        addPlayer,
        updatePlayer,
        addDefaultPlayer
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export default GameProvider;
