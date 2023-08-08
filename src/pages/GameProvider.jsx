// file: GameProvider.jsx

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Components
import GameContext from './GameContext';

const generateDefaultPlayerName = () => `Spieler ${Math.floor(Math.random() * 1000)}`;

const defaultPlayer = {
    id: uuidv4(),
    name: generateDefaultPlayerName(),
    // foundWords: [], // no default words for production
    foundWords: process.env.NODE_ENV === 'development' ? ["Anton", "Nena", "Ast"] : [],
    score: process.env.NODE_ENV === 'development' ? 300 : 0,
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
            score: 0,
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
