import React, { useState } from 'react';

function PlayerCard() {
    const [playerName, setPlayerName] = useState("Spielername"); // Initialer Wert kann entsprechend angepasst werden
    const [inputValue, setInputValue] = useState('');

    return (
        <div className="card mt-3">
            <div className="card-body d-flex flex-column align-items-center">
                <h4 className="card-title mb-4">{playerName}</h4>
                <div className="d-flex align-items-center mb-3">
                    <input 
                        id="playerNameInput" 
                        type="text" 
                        placeholder="Neuer Spielername" 
                        className="form-control m-2" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} 
                    />
                    <button 
                        className="btn btn-secondary m-2"
                        onClick={() => setPlayerName(inputValue)} // Hier wird später die Logik für die Namensänderung eingefügt
                    >
                        Name ändern
                    </button>
                </div>
                <button className="btn btn-danger">Spieler löschen</button>
            </div>
        </div>
    );
}

export default PlayerCard;
