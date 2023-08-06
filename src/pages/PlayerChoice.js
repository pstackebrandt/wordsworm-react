// file PlayerChoice.js

import React from "react"

import PageTitle from './page-title';
import PlayerCard from './PlayerCard'

// Main content of the page
export default function PlayerChoice() {

    return (
        <div className="welcome ms-5 me-5">
            <PageTitle title="Spielerwahl" subtitle="Wer spiel mit?" />

            <div class="card mt-3">
                <div class="card-body d-flex flex-column align-items-center"></div>
                <p className="text-center mb-2 fs-5">Hier kannst du festlegen wieviele Spieler mitmachen und wie du sie nennst.</p>
                <p className="text-center mb-2 fs-5">(1 Spieler ist voreingestellt und heißt Sonne.)</p>
            </div>

            <PlayerCard />

            <div class="card mt-3">
                <div class="card-body d-flex flex-column align-items-center">
                    <h4 class="card-title mb-4">Möchtest du einen Spieler hinzufügen?</h4>
                    <button id="addPlayerButton" class="btn btn-primary">Noch ein Spieler!</button>
                </div>
            </div>

            <div class="card mt-3">
                <div class="card-body d-flex flex-column align-items-center">
                    <h4 class="card-title mb-4">Starte das nächste Spiel.</h4>
                    <button id="startNewGameButton" class="btn btn-primary">Spielen!</button>
                </div>
            </div>

        </div>

    );
}