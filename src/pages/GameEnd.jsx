// file GameEnd.jsx

import React from "react"

import PageTitle from './PageTitle';

// Main content of the page
export default function GameEnd() {

    return (
        <div className="welcome ms-5 me-5">
            <PageTitle title="Das Spiel ist vorbei!" subtitle="Auswertung der Wörtersuche" />

            {/* Game evaluation card */}
            <div className="card mb-4">
                <div className="card-body text-center">
                    <h4 className="card-title">Lieber Spieler Clara <span id="teamNameDisplay"></span>!</h4>
                    <p>Du hast <strong className="text-primary"><span id="wordCountDisplay"></span> Worte</strong> gefunden.</p>
                    <p>Dabei hast du <strong className="text-primary"><span id="teamScoreDisplay"></span> Punkte</strong> erreicht.</p>
                </div>
            </div>

            {/* Start new game */}
            <div className="card">
                <div className="card-body d-flex flex-column align-items-center">
                    <h4 className="card-title mb-4">Möchtest du noch einmal spielen?</h4>
                    <button id="startNewGameButton" className="btn btn-primary btn-lg">Noch ein Spiel!</button>
                </div>
            </div>

        </div>

    );
}