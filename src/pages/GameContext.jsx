// file: GameContext.jsx

import React from 'react';

const defaultPlayer = {
    name: "Gast",
    foundWords: [],
    Punkte: 0,
  };
  
  const GameContext = React.createContext({
    players: [defaultPlayer],
    // Weitere Zustände und Funktionen...
  });

export default GameContext;