// file: GameProvider.jsx

import React, { useState, useEffect } from 'react';

// Components
import GameContext from './GameContext';

// Importing your classes
import FoundWords from '../models/FoundWords';
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
    console.log("GameProvider start. I init foundWordsList and playerList with null.");

    const [foundWordsList, setFoundWordList] = useState(null);
    const [playerList, setPlayerList] = useState(null); // Start with a null value

    const FUNNY_NAMES = [
        "Schnarchnase",
        "Muffelmonster",
        "Witzeklau",
        "Nasenbohrer",
        "Flauschekopf",
        "Kichererbse",
        "Knuddelbär",
        "Lachfalte",
        "MüdeMaus",
        "Schnuffeltuch",
        "Zauberzwerg",
        "Grinsebacke",
        "Hopsmaus",
        "Kullerkeks",
        "Murmeltier",
        "Naseweis",
        "Purzelbaum",
        "Quatschkopf",
        "Rumpelstilzchen",
        "Schmunzelmonster",
        "Tapsfuß",
        "Ukulele",
        "Vollpfosten",
        "Wackelzahn",
        "Xenophobie",
        "Yeti",
        "Zappelphilipp",
        "Albernuss",
        "Blubberblase",
        "Couchpotatoe"
    ];

    // 1. Daten aus dem Local Storage abrufen, wenn der Provider zum ersten Mal geladen wird
    useEffect(() => {
        console.log("GameProvider: useEffect: load data from local storage");
        const wordsFromStore = localStorage.getItem('wordList');
        const playersFromStore = localStorage.getItem('playerList');

        console.log("GameProvider: useEffect: load from local store savedWordList: " + wordsFromStore);
        console.log("GameProvider: useEffect: load from local store savedPlayerList: " + playersFromStore);

        if (wordsFromStore) {
            console.log("GameProvider: useEffect: use word list from local storage to init word list.");
            const rawFoundWords = JSON.parse(wordsFromStore);
            setFoundWordList(new FoundWords(rawFoundWords));
        }

        if (playersFromStore) {
            console.log("GameProvider: useEffect: use player list from local storage to init player list.");
            const rawPlayers = JSON.parse(playersFromStore);
            const instantiatedPlayers = rawPlayers.map(playerData => new Player(playerData.name, playerData.foundWords, playerData.score));
            setPlayerList(new PlayerList(instantiatedPlayers));
        }

    }, []); // Mit einem leeren Abhängigkeitsarray stellen wir sicher, dass dieser Effekt nur beim ersten Render aufgerufen wird

    // 2. Daten im Local Storage speichern, wann immer sich die Daten ändern
    useEffect(() => {
        if (foundWordsList) {
            console.log("GameProvider: useEffect: save wordList to local storage");
            localStorage.setItem('wordList', JSON.stringify(foundWordsList.words));
        }
    }, [foundWordsList]);

    useEffect(() => {
        if (playerList) {
            console.log("GameProvider: useEffect: save playerList to local storage");
            localStorage.setItem('playerList', JSON.stringify(playerList.players));
        }
    }, [playerList]);

    const addFoundWord = (word) => {
        foundWordsList.addWord(word);
        setFoundWordList(new FoundWords([...foundWordsList.words])); // A little trick to trigger re-render
    };

    const addPlayer = (name) => {
        setPlayerList(prevList => {
            const newPlayerList = new PlayerList();
            newPlayerList.players = prevList ? [...prevList.players] : [];
            const newPlayer = new Player(name);
            newPlayerList.addPlayer(newPlayer);
            return newPlayerList;
        });
    };

    const addDefaultPlayer = () => {
        addPlayer(generateDefaultPlayerName());
    };

    const generateDefaultPlayerName = () => {
        // Zufälligen Index aus der Liste auswählen
        const randomIndex = Math.floor(Math.random() * FUNNY_NAMES.length);
    
        // Namen aus der Liste holen und aus der Liste entfernen, um Wiederholungen zu vermeiden
        const chosenName = FUNNY_NAMES.splice(randomIndex, 1)[0];
    
        // Wenn alle Namen verwendet wurden, die Liste zurücksetzen
        if (FUNNY_NAMES.length === 0) {
            // (Optional) Sie könnten die ursprüngliche Liste erneut initialisieren oder einen anderen Ansatz wählen
            // Für dieses Beispiel initialisieren wir die Liste einfach neu.
            FUNNY_NAMES.push(...[
                // (Fügen Sie hier die vollständige Liste der Namen ein, wie oben definiert)
            ]);
        }
    
        return chosenName;
    };

    /**
     * Allows a player to add a word to their list of found words.
     * 
     * @param {string} playerId - The unique identifier for the player.
     * @param {string} word - The word to be added to the player's list.
     */
    const addPlayerWord = (playerId, word) => {
        const player = playerList.getPlayerById(playerId);
        if (player) {
            player.addWord(word);
            // Optional: If you wish to update the player's score based on the word, do it here.
            // player.updateScore(score); // Assuming 'score' is calculated based on the word or some other criteria.
            setPlayerList(new PlayerList([...playerList.players])); // This triggers a re-render.
        }
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

    const deletePlayer = (playerId) => {
        setPlayerList(prevList => {
            const newPlayerList = new PlayerList([...prevList.players]);
            newPlayerList.removePlayerById(playerId);
            return newPlayerList;
        });
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
        words: foundWordsList ? foundWordsList.words : [],
        players: playerList ? playerList.players : [],
        addWord: addFoundWord,
        addPlayer,
        updatePlayer,
        addPlayerWord,
        addDefaultPlayer,
        deletePlayer
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export default GameProvider;
