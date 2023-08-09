// file: GameProvider.jsx

import React, { useState, useEffect } from 'react';

// Components
import GameContext, { defaultPlayer } from './GameContext';

// Importing your classes
import Words from '../models/Words';
import Player from '../models/Player';
import PlayerList from '../models/PlayerList';

/**
 * GameProvider component serves as the context provider for the game's state.
 * It handles:
 * - Retrieval of game data from the local storage.
 * - Persistence of game data to local storage.
 * - Providing game-related operations such as adding words and players.
 * 
 * @param {object} props - Component properties.
 * @param {ReactNode} props.children - Child elements to be wrapped by the context provider.
 */
const GameProvider = ({ children }) => {
    console.log("GameProvider start. I don't init wordList and playerList.");

    const [wordList, setWordList] = useState(null);
    const [playerList, setPlayerList] = useState(null); // Start with a null value

    // 1. Daten aus dem Local Storage abrufen, wenn der Provider zum ersten Mal geladen wird
    useEffect(() => {
        console.log("GameProvider: useEffect: load data from local storage");
        const savedWordList = localStorage.getItem('wordList');
        const savedPlayerList = localStorage.getItem('playerList');

        console.log("GameProvider: useEffect: load from local store savedWordList: " + savedWordList);
        console.log("GameProvider: useEffect: load from local store savedPlayerList: " + savedPlayerList);

        if (savedWordList) {
            if (wordList) {
                console.log("GameProvider: useEffect: use word list from local storage to init word list.");
                setWordList(new Words(JSON.parse(savedWordList)));
            }
        }

        if (savedPlayerList) {
            if (wordList) {
                console.log("GameProvider: useEffect: use player list from local storage to init player list.");
                setPlayerList(new PlayerList(JSON.parse(savedPlayerList)));
            }
        }

    }, []); // Mit einem leeren Abhängigkeitsarray stellen wir sicher, dass dieser Effekt nur beim ersten Render aufgerufen wird

    // 2. Daten im Local Storage speichern, wann immer sich die Daten ändern
    useEffect(() => {
        console.log("GameProvider: useEffect: save data to local storage");
        localStorage.setItem('wordList', JSON.stringify(wordList.wordsList));
    }, [wordList]);

    useEffect(() => {
        localStorage.setItem('playerList', JSON.stringify(playerList.players));
    }, [playerList]);

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
        words: wordList ? wordList.wordsList : [],
        players: playerList ? playerList.players : [],
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
