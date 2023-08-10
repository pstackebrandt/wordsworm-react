// file Game.jsx

import React, { useContext } from "react"
import { Link } from "react-router-dom";
import GameContext from './GameContext';
import PageTitle from './PageTitle';

// Main content of the page
export default function Game() {
    // Access the game context
    const { players } = useContext(GameContext);

    // Determine the next player's name for greeting
    const nextPlayerName = players.length > 0 ? players[0].name : "Spieler";


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
                    {/* Update the greeting with the next player's name */}
                    <h2 id="nextPlayerMessage" className="card-title mb-4">Hallo {nextPlayerName}!</h2>
                </div>
                <div className="card-body d-flex flex-column align-items-center">
                    {/* List all player names */}
                    <div id="allPlayerNames" className="card-body mb-4">
                        {players.map(player => <p key={player.id}>{player.name}</p>)}
                    </div>
                </div>
            </div>

            {/* Worteingabe */}
            <div id="wordInputArea" className="card mb-4">
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

            {/* Gefundene Wörter */}
            <div id="foundWordsList" className="card mb-4">
                <div className="card-body">
                    <h2 className="card-title">Gefundene Wörter</h2>
                    <p className="text-center mb-2 fs-5">Wortschlange anzeigen</p>
                    <div id="wordList" className="word-list"></div>
                </div>
            </div>

            {/* Spiel beenden */}
            <div id="finishGameArea" className="text-center">
                <Link to="/game-end" className="btn btn-danger btn-lg mt-5 mb-3">Spiel beenden</Link>
            </div>

        </div>

    );
}