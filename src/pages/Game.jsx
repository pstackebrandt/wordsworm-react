// file Game.jsx

import React, { useState, useContext } from "react"
import { Link } from "react-router-dom";
import GameContext from './GameContext';
import PageTitle from './PageTitle';
// import app css
import '../styles/app.css';

// Main content of the page
export default function Game() {
    // Access the game context
    const { players } = useContext(GameContext);

    // State für den aktuellen Spieler
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(() => {
        return Math.floor(Math.random() * players.length);
    });

    const currentPlayerName = players.length > 0 ? players[currentPlayerIndex].name : "Spieler";

    // State für die Sichtbarkeit des Inhalts
    const [contentVisible, setContentVisible] = useState(false);

    const startGame = () => {
        setContentVisible(true);

        // Nächsten Spieler auswählen
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    };

    // Die Liste mit 20 Wörtern
    const startWords = [
        "Quatschkopf", "Blubberblase", "Schabernack", "Kichererbse",
        "Flitzpiepe", "Mumpitz", "Purzelbaum", "Schlawiner",
        "Dussel", "Turteltaube", "Rumpelstilzchen", "Zauberflöte",
        "Hokuspokus", "Kuddelmuddel", "Rappelkiste", "Schlitzohr",
        "Knalltüte", "Papperlapapp", "Wackelpudding", "Gurkenhobel"
    ];

    // Startwort auswählen
    const [currentWord, setCurrentWord] = useState(() => {
        const randomIndex = Math.floor(Math.random() * startWords.length);
        return startWords[randomIndex];
    });

    // Add new states
    const [wordInput, setWordInput] = useState(""); // State for the word input
    const [emptyInputs, setEmptyInputs] = useState(0); // State for tracking empty inputs

    const handleAddWord = () => {
        if (!wordInput.trim()) { // Check if input is empty or just whitespace
            setEmptyInputs(prevEmpty => prevEmpty + 1);
            if (emptyInputs >= 1) {
                // Navigate to game end page (assuming this is the behavior on game end)
                window.location.href = "/game-end";
            } else {
                document.getElementById("wordInputFeedback").innerText = "Du hast nichts eingegeben. Wenn du zweimal nacheinander nichts eingibst, beenden wird das Spiel. 😉";
            }
        } else {
            // Logic to handle the input word (assuming the word is valid for now)
            setEmptyInputs(0);
            // You may need to implement further checks here
        }
        setWordInput(""); // Reset input
    };

    // Update input change logic
    const handleInputChange = (e) => {
        setWordInput(e.target.value);
        document.getElementById("wordInputFeedback").innerText = ""; // Clear feedback
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleAddWord();
        }
    };


    return (
        <div className="welcome ms-5 me-5">
            <PageTitle title="Wörterwurm" subtitle="Füttere Deinen Wurm!" />

            {/* Spielhinweise */}
            <div className="card mt-3">
                <div className="card-body d-flex flex-column align-items-center"></div>
                <p className="text-center mb-2 fs-5">Die Spieler sind nacheinander am Zug.</p>
                <p className="text-center mb-2 fs-5">Das neue Wort muss mit dem letzten Buchstaben des ersten Wortes beginnen.</p>
            </div>

            {/* Aktuelle Spieler nennen */}
            <div className="card mt-3">
                <div className="card-body d-flex flex-column align-items-center">
                    <h2 id="currentPlayerMessage" className="card-title mb-4">Hallo {currentPlayerName}!</h2>
                </div>
                <div className="card-body d-flex flex-column align-items-center">
                    {/* Use d-flex for horizontal listing of player names */}
                    <div id="allPlayerNames" className="card-body d-flex justify-content-start flex-wrap">
                        {players.map((player, index) => (
                            <span key={player.id} className={index !== players.length - 1 ? "me-3" : ""}>
                                {player.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Großer Button */}
            {!contentVisible &&
                <div className="d-flex justify-content-center align-items-center vh-20 m-5">
                    <button className="btn btn-primary btn-lg rounded-circle big-round-button" onClick={startGame}>
                        Los geht’s!
                    </button>
                </div>
            }

            {/* Worteingabe - nur sichtbar, wenn contentVisible true ist */}
            <div id="wordInputArea" className="card mb-4" style={{ display: contentVisible ? 'block' : 'none' }}>

                <div className="card-body">
                    <h2 className="card-title">Wort hinzufügen</h2>
                    <div className="input-group input-button-container">
                        <input id="wordInput"
                            type="text"
                            className="form-control"
                            value={wordInput}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Nächstes Wort eingeben"
                            aria-label="Nächstes Wort eingeben"
                            aria-describedby="addWordButton"></input>

                        <button id="addWordButton"
                            className="btn btn-primary ms-3"
                            type="button"
                            onClick={handleAddWord}>Hinzufügen</button>
                    </div>
                </div>

                <div id="wordInputHelp" className="card-body text-muted">
                    <p>Das nächste Wort muss mit dem letzten Buchstaben des vorherigen Wortes beginnen.</p>
                </div>

                <div id="wordInputFeedback" className="card-footer text-muted">
                </div>
            </div>

            {/* Gefundene Wörter - nur sichtbar, wenn contentVisible true ist */}
            <div id="foundWordsArea" className="card mb-4" style={{ display: contentVisible ? 'block' : 'none' }}>
                <div className="card-body">
                    <h2 className="card-title">Gefundene Wörter</h2>
                    <p className="text-center mb-2 fs-5">Wortschlange anzeigen</p>
                    <div id="foundWordsDisplay" className="word-list d-flex justify-content-center">
                        <span style={{ fontWeight: 'bold', color: 'blue' }}>{currentWord}</span>
                    </div>
                </div>
            </div>

            {/* Spiel beenden - nur sichtbar, wenn contentVisible true ist */}
            <div id="finishGameArea" className="text-center" style={{ display: contentVisible ? 'block' : 'none' }}>
                <Link id="finishGameButton" to="/game-end" className="btn btn-danger btn-lg mt-5 mb-3">Spiel beenden</Link>
            </div>

        </div>

    );
}