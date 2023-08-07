// file PlayerChoice.jsx

import React, {useContext} from "react"
import GameContext from "./GameContext";
import { Link } from "react-router-dom";

import PageTitle from './PageTitle';
import PlayerCard from './PlayerCard'

// Main content of the page
export default function PlayerChoice() {
    const { players } = useContext(GameContext);
    
    return (
        <div className="welcome ms-5 me-5">
            <PageTitle title="Spielerwahl" subtitle="Wer spiel mit?" />

            <div className="card mt-3">
                <div className="card-body d-flex flex-column align-items-center"></div>
                <p className="text-center mb-2 fs-5">Hier kannst du festlegen wieviele Spieler mitmachen und wie du sie nennst.</p>
                <p className="text-center mb-2 fs-5">1 Spieler ist voreingestellt. Du kannst ihn umbenenen.</p>
            </div>

            {players.map(player => <PlayerCard key={player.name} player={player} />)}

            <div className="card mt-3">
                <div className="card-body d-flex flex-column align-items-center">
                    <h4 className="card-title mb-4">Möchtest du einen Spieler hinzufügen?</h4>
                    <button id="addPlayerButton" className="btn btn-primary">Noch ein Spieler!</button>
                </div>
            </div>

            <div className="card mt-3">
                <div className="card-body d-flex flex-column align-items-center">
                    <h4 className="card-title mb-4">Starte das nächste Spiel.</h4>
                    <Link to="/game" className="btn btn-primary">Spielen!</Link>
                </div>
            </div>

        </div>

    );
}