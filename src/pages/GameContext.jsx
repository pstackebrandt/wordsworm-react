// GameContext.jsx
import React from 'react';
import Player from '../models/Player';

export const defaultPlayer = Player.generateDefaultPlayer();

const GameContext = React.createContext();

export default GameContext;