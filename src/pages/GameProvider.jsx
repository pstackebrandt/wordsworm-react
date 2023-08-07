// file: GameProvider.jsx

import React, { useState } from 'react';
import GameContext from './GameContext';

const defaultPlayer = {
    name: "Gast",
    foundWords: [],
    Punkte: 0,
};

// use of GameProvider see at end of this chat: https://chat.openai.com/share/9decdb18-a8f4-4783-8f99-4a69dbcc903a

const GameProvider = ({ children }) => {
    const [words, setWords] = useState([]);
    const [players, setPlayers] = useState([defaultPlayer]);

    const addWord = (word) => {
        setWords(prevWords => [...prevWords, word]);
    };

    const addPlayer = (player) => {
        setPlayers(prevPlayers => [...prevPlayers, player]);
    };

    const updatePlayers = (newPlayers) => {
        setPlayers(newPlayers);
    };

    const value = {
        words,
        players,
        addWord,
        addPlayer, 
        updatePlayers
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export default GameProvider;
