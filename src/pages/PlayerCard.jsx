// file PlayerCard.jsx

import React, { useState, useContext } from 'react';
import GameContext from './GameContext';

function PlayerCard({ player }) {
    // Local state for the player's name input value.
    const [inputValue, setInputValue] = useState(player.name);

    // Get the updatePlayer function from the GameContext.
    const { updatePlayer } = useContext(GameContext);

    // Update the player's name when it changes.
    const handleNameChange = () => {
        if (inputValue && inputValue !== player.name) {
            updatePlayer(player.id, { name: inputValue });
        }
    }

    return (
        <div className="card mt-3">
            <div className="card-body d-flex flex-column align-items-center">
                <h4 className="card-title mb-4">{player.name}</h4>
                <div className="d-flex align-items-center mb-3">
                    <input 
                        id="playerNameInput"
                        type="text"
                        placeholder="Neuer Spielername"
                        className="form-control m-2"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleNameChange()}
                    />
                    <button id='changeNameButton'
                        className="btn btn-secondary m-2 button-no-wrap"
                        onClick={handleNameChange}
                    >
                        Name ändern
                    </button>
                </div>
                {/* Delete player functionality yet to be implemented. */}
                <button className="btn btn-danger">Spieler löschen</button>
            </div>
        </div>
    );
}

export default PlayerCard;
