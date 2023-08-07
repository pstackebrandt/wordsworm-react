// file Game.jsx

import React from "react"
import { Link } from "react-router-dom";

import PageTitle from './PageTitle';



// Main content of the page
export default function Game() {

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
                    <h2 className="card-title mb-4">Clara ist am Zug</h2>
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
                <button id="endGameButton" className="btn btn-danger btn-lg">Spiel beenden</button>
            </div>

        </div>

    );
}