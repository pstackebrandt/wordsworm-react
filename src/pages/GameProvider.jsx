// file: GameProvider.jsx

import React, { useState, useContext } from 'react';
import GameContext from './GameContext';

export const useGame = () => {
    return useContext(GameContext);
};

// use of GameProvider see at end of this chat: https://chat.openai.com/share/9decdb18-a8f4-4783-8f99-4a69dbcc903a

const GameProvider = ({ children }) => {
    const [words, setWords] = useState([]);
    const [players, setPlayers] = useState([]);

    const addWord = (word) => {
        setWords(prevWords => [...prevWords, word]);
    };

    const addPlayer = (player) => {
        setPlayers(prevPlayers => [...prevPlayers, player]);
    };

    const value = {
        words,
        players,
        addWord,
        addPlayer
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export default GameProvider;
