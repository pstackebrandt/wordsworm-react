// file GameEnd.jsx
// path src\pages\GameEnd.jsx

import React, { useState, useEffect }  from "react"
import { Link } from "react-router-dom";

import PageTitle from './PageTitle';

// Main content of the page
export default function GameEnd() {
    // Initialize state for players and foundWords
    const [players, setPlayers] = useState([]);
    const [foundWords, setFoundWords] = useState([]);

    useEffect(() => {
        // Fetch the data from the local storage
        const storedPlayers = localStorage.getItem('playerList');
        const storedFoundWords = localStorage.getItem('foundWords');

        if (storedPlayers) {
            setPlayers(JSON.parse(storedPlayers));
        }

        if (storedFoundWords) {
            setFoundWords(JSON.parse(storedFoundWords));
        }
    }, []); // Empty dependency array to run only once
    return (
        <div className="welcome ms-5 me-5">
            <PageTitle title="Das Spiel ist vorbei!" subtitle="Auswertung der Wörtersuche" />

            <div id="teamResultArea" className="card mb-4">
                <div className="card-body text-center">
                    <h4 className="card-title">Teamergebnis von <span id="teamDisplay"></span>!</h4>
                    <p>Das Team hat <strong className="text-primary"><span id="wordCountDisplay"></span> Worte</strong> gefunden.</p>
                    <p>Dabei hat es <strong className="text-primary"><span id="teamScoreDisplay"></span> Punkte</strong> erreicht.</p>
                </div>
            </div>

            <div id="playersResultsArea" className="card mb-4">
                <div id="playerIndex0ResultArea" className="card-body text-center">
                    <h4 className="card-title">Ergebnis von <span id="playerIndex0Name"></span>!</h4>
                    <p>Du hast <strong className="text-primary"><span id="playerIndex0WordCountDisplay"></span> Worte</strong> gefunden.</p>
                    <p>Dabei hast du <strong className="text-primary"><span id="playerIndex0ScoreDisplay"></span> Punkte</strong> erreicht.</p>
                </div>
            </div>

            <div id="playAgainArea" className="card">
                <div className="card-body d-flex flex-column align-items-center">
                    <h4 className="card-title mb-4">Möchtest du noch einmal spielen?</h4>
                    <Link to="/game" className="btn btn-primary btn-lg">Noch ein Spiel!</Link>
                </div>
            </div>
        </div>

    );
}