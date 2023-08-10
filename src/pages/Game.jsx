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

    // Determine the next player's name for greeting
    const nextPlayerName = players.length > 0 ? players[0].name : "Spieler";

    // State für die Sichtbarkeit des Inhalts
    const [contentVisible, setContentVisible] = useState(false);

    const handleButtonClick = () => {
        setContentVisible(true);
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
                    <h2 id="nextPlayerMessage" className="card-title mb-4">Hallo {nextPlayerName}!</h2>
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
                    <button className="btn btn-primary btn-lg rounded-circle big-round-button" onClick={handleButtonClick}>
                        Los geht’s!
                    </button>
                </div>
            }

            {/* Worteingabe - nur sichtbar, wenn contentVisible true ist */}
            <div id="wordInputArea" className="card mb-4" style={{ display: contentVisible ? 'block' : 'none' }}>

                <div className="card-body">
                    <h2 className="card-title">Wort hinzufügen</h2>
                    <div className="input-group input-button-container">
                        <input id="wordInput" type="text" className="form-control"
                            placeholder="Nächstes Wort eingeben" aria-label="Nächstes Wort eingeben"
                            aria-describedby="addWordButton"></input>
                        <button id="addWordButton" className="btn btn-primary ms-3"
                            type="button">Hinzufügen</button>
                    </div>
                </div>

                <div id="wordInputHelp" className="card-body text-muted">
                    <p>Das nächste Wort muss mit dem letzten Buchstaben des vorherigen Wortes beginnen.</p>
                </div>

                <div id="wordInputFeedback" className="card-footer text-muted">
                </div>
            </div>

            {/* Gefundene Wörter - nur sichtbar, wenn contentVisible true ist */}
            <div id="foundWordsList" className="card mb-4" style={{ display: contentVisible ? 'block' : 'none' }}>
                <div className="card-body">
                    <h2 className="card-title">Gefundene Wörter</h2>
                    <p className="text-center mb-2 fs-5">Wortschlange anzeigen</p>
                    <div id="wordList" className="word-list"></div>
                </div>
            </div>

            {/* Spiel beenden - nur sichtbar, wenn contentVisible true ist */}
            <div id="finishGameArea" className="text-center" style={{ display: contentVisible ? 'block' : 'none' }}>
                <Link to="/game-end" className="btn btn-danger btn-lg mt-5 mb-3">Spiel beenden</Link>
            </div>

        </div>

    );
}