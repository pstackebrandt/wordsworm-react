import React from "react"

import PageTitle from './page-title';

// Main content of the page
export default function Welcome() {

    return (
        <div className="welcome ms-5 me-5">
            <PageTitle title="Wörterwurm " subtitle="Lasse den Wurm wachsen!" />

            <div class="card mt-3">
                <div class="card-body d-flex flex-column align-items-center"></div>
                <p className="text-center mb-2 fs-5">Wörterwurm ist ein packendes Spiel, bei dem die Spieler einzeln oder in Teams darum wetteifern eine möglichst große Anzahl von Wörtern zu finden, die in einem bestimmten Zusammenhang stehen.</p>
                <p className="text-center mb-2 fs-5">Bei jedem gefundenen Wort erfolgt eine spannende Zwischenauswertung, bevor der nächste Spieler seinen Zug beginnt. </p>
                <p className="text-center mb-2 fs-5">Die entdeckten Wörter formen zusammen den "Wörterwurm", der mit jeder Ergänzung wächst und mehr Punkte für das Team und die individuellen Spieler generiert.</p>
            </div>

            <div class="card  mt-3">
                <div class="card-body d-flex flex-column align-items-center">
                    <h4 class="card-title mb-4">Möchtest du Spieler auswählen?</h4>
                    <button id="choosePlayerButton" class="btn btn-primary">Spieler wählen</button>
                </div>
            </div>

            <div class="card  mt-3">
                <div class="card-body d-flex flex-column align-items-center">
                    <h4 class="card-title mb-4">Möchtest du ohne Änderungen fortsetzen?</h4>
                    <button id="startNewGameButton" class="btn btn-primary">Gleich spielen!</button>
                </div>
            </div>

        </div>

    );
}