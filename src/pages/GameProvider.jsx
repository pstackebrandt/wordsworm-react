// file: GameProvider.jsx

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Components
import GameContext from './GameContext';

const generateDefaultPlayerName = () => `Guest ${Math.floor(Math.random() * 1000)}`;

const defaultPlayer = {
    id: uuidv4(),
    name: generateDefaultPlayerName(),
    // foundWords: [], // no default words for production
    foundWords: ["Anton", "Nena", "Ast"], // default words for testing
    // Score: 300, // no default score for production
    Score: 300, // default score for testing
};

// use of GameProvider see at end of this chat: https://chat.openai.com/share/9decdb18-a8f4-4783-8f99-4a69dbcc903a

const GameProvider = ({ children }) => {
    const [words, setWords] = useState([]);
    const [players, setPlayers] = useState([defaultPlayer]);

    const addWord = (word) => {
        setWords(prevWords => [...prevWords, word]);
    };

    const addPlayer = (player) => {
        if (player) {
            setPlayers(prevPlayers => [...prevPlayers, player]);
            console.log("Player added: ", player);
        }
    };

    const addDefaultPlayer = () => {
        const defaultPlayer = {
            id: uuidv4(),
            name: generateDefaultPlayerName(),
            foundWords: [],
            Score: 0,
        }

        addPlayer(defaultPlayer);
    };

    const updatePlayer = (playerId, updatedPlayer) => {
        setPlayers(prevPlayers =>
            prevPlayers.map(player =>
                player.id === playerId ? { ...player, ...updatedPlayer } : player
            )
        );
    };

    const updatePlayers = (newPlayers) => {
        setPlayers(newPlayers);
    };

    const value = {
        words,
        players,
        addWord,
        addPlayer,
        addDefaultPlayer,
        updatePlayer,
        updatePlayers,
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export default GameProvider;
