// file PlayerCard.jsx

// Import required React hooks and the GameContext.
import React, { useState, useContext } from 'react';
import GameContext from './GameContext';

function PlayerCard({ player }) {
    // Local state to hold and update the player name input.
    const [inputValue, setInputValue] = useState(player.name);

    // Destructure the required values from the GameContext.
    const { players, addPlayer } = useContext(GameContext);

    // Function to handle changing of player's name.
    const handleNameChange = () => {
        // Check if the input has a value and if it's different from the current player name.
        if (inputValue && inputValue !== player.name) {
            // Update the player's name within the list of players.
            const updatedPlayers = players.map(p => p.name === player.name ? { ...p, name: inputValue } : p);
            // Update the list of players.
            addPlayer(updatedPlayers);
        }
    }

    // Render the player card.
    return (
        <div className="card mt-3">
            <div className="card-body d-flex flex-column align-items-center">
                <h4 className="card-title mb-4">{player.name}</h4>
                <div className="d-flex align-items-center mb-3">
                    <input 
                        id="playerNameInput"
                        type="text"
                        // Placeholder text translates to "New player name".
                        placeholder="Neuer Spielername"
                        className="form-control m-2"
                        value={inputValue}
                        // Update inputValue when the input changes.
                        onChange={(e) => setInputValue(e.target.value)}
                        // If 'Enter' key is pressed, call the name change handler.
                        onKeyPress={(e) => e.key === 'Enter' && handleNameChange()}
                    />
                    {/* // Button to manually trigger name change. */}
                    <button 
                        className="btn btn-secondary m-2"
                        onClick={handleNameChange}
                    >
                        Name ändern
                    </button>
                </div>
                {/* // Button to delete the player (functionality not yet implemented). */}
                <button className="btn btn-danger">Spieler löschen</button>
            </div>
        </div>
    );
}

// Export the PlayerCard component.
export default PlayerCard;
