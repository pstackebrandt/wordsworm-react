// file Game.jsx

import React, { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom';

import GameContext from './GameContext';
import PageTitle from './PageTitle';
// import app css
import '../styles/app.css';

// Main content of the page
export default function Game() {
    const navigate = useNavigate();

    // Access the game context
    const { players } = useContext(GameContext);

    // State für den aktuellen Spieler
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(() => {
        return Math.floor(Math.random() * players.length);
    });
    
    // State für die Sichtbarkeit des Inhalts
    const [contentVisible, setContentVisible] = useState(false);
    
    const getIndexOfNextPlayer = (prevIndex) => (prevIndex + 1) % players.length;
    
    // Nächsten Spieler auswählen
    function setNextPlayer() {
        const nextPlayerIndex = getIndexOfNextPlayer(currentPlayerIndex);
        setCurrentPlayerIndex(nextPlayerIndex);
        setPlayerMessage(`${players[nextPlayerIndex].name} ist dran!`);
    }

    const startGame = () => {
        setContentVisible(true);

        setNextPlayer();
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
    const [currentWord] = useState(() => {
        const randomIndex = Math.floor(Math.random() * startWords.length);
        return startWords[randomIndex];
    });

    // Add new states
    const [wordInput, setWordInput] = useState(""); // State for the word input
    const [emptyInputs, setEmptyInputs] = useState(0); // State for tracking empty inputs

    const [foundWords, setFoundWords] = useState([currentWord]); // Initialisieren Sie die gefundenen Wörter mit dem Startwort

    const addWord = () => {
        let newWord = wordInput.trim();
        if (!newWord) { // Check if input is empty or just whitespace
            setEmptyInputs(prevEmpty => prevEmpty + 1);
            if (emptyInputs >= 1) {
                // Navigate to game end page (assuming this is the behavior on game end)
                navigate('/game-end');
            } else {
                document.getElementById("wordInputFeedback").innerText = "Du hast nichts eingegeben. Wenn du zweimal nacheinander nichts eingibst, beenden wird das Spiel. 😉";
            }
        } else if (newWord[0].toUpperCase() === foundWords[foundWords.length - 1].slice(-1).toUpperCase()) {
            // Das Wort passt zum letzten Wort

            setFoundWords(prevWords => [...prevWords, newWord]);

            // Wort zum aktuellen Spieler hinzufügen
            players[currentPlayerIndex].addWord(newWord);

            setEmptyInputs(0);
            document.getElementById("wordInputFeedback").innerText = "Das hast du gut gemacht! 🌞";

            setNextPlayer();
        } else { // Das Wort passt nicht
            document.getElementById("wordInputFeedback").innerText = "Das Wort passt nicht zum letzten Wort. Versuche es noch einmal!";
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
            addWord();
        }
    };

    const [playerMessage, setPlayerMessage] = useState(`Hallo Spieler!`);

    // Function to be executed when the game finishes.
    const finishGame = () => {
        // Save the foundWords to the local storage
        localStorage.setItem('foundWords', JSON.stringify(foundWords));

        // Save the players' data to the local storage
        localStorage.setItem('playerList', JSON.stringify(players));

        // Use navigate instead of window.location.href
        navigate('/game-end');
    };

    return (
        <div className="welcome ms-5 me-5">
            <PageTitle title="Wörterwurm" subtitle="Füttere Deinen Wurm!" />

            {/* Spielhinweise */}
            <div className="card mt-3">
                <h2 className="card-title d-flex flex-column align-items-center mt-3">Spielregeln</h2>
                <p className="card-body text-center mb-2 fs-5">Die Spieler sind nacheinander am Zug.
                Jedes <span className="text-primary">N</span>eue Wort muss mit dem letzte<span className="text-primary">N</span> Buchstaben seines Vorgängers beginnen.<br></br>
                Das erste Wort wird festgelegt und erscheint mit den neu gefundenen Worten bei "Der Wörterwurm".</p>
                <p className="card-body text-center mb-2 fs-5">
                Für jedes Wort gibt es 100 Punkte. Für jeden Buchstaben streichen wir einen Extra-Bonus ein!</p>
            </div>

            {/* Aktuelle Spieler nennen */}
            <div className="card mt-3 mb-3">
                <div className="card-title d-flex flex-column align-items-center">
                    <h2 id="currentPlayerMessage" className="card-title mb-0 mt-3">{playerMessage}</h2>
                </div>
                <div className="card-body d-flex flex-column align-items-center">
                    {/* Use d-flex for horizontal listing of player names */}
                    <div id="allPlayerNames" className="card-body d-flex justify-content-start flex-wrap">
                        {players.map((player, index) => (
                            <span key={player.id} className={index !== players.length - 1 ? "me-3 fs-4" : "fs-4"}>
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
                        Los gehts!
                    </button>
                </div>
            }

            {/* Worteingabe - nur sichtbar, wenn contentVisible true ist */}
            <div id="wordInputArea" className="card mb-3 mt=3" style={{ display: contentVisible ? 'block' : 'none' }}>

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
                            onClick={addWord}>Hinzufügen</button>
                    </div>
                </div>

                <div id="wordInputHelp" className="card-body text-muted fs-5">
                    <p>Das nächste Wort muss mit dem letzten Buchstaben des vorherigen Wortes beginnen.</p>
                </div>

                <div id="wordInputFeedback" className="card-footer text-muted">
                </div>
            </div>

            {/* Gefundene Wörter - nur sichtbar, wenn contentVisible true ist */}
            <div id="foundWordsArea" className="card mb-3 mt-3" style={{ display: contentVisible ? 'block' : 'none' }}>
                <div className="card-body">
                    <h2 className="card-title">Der Wörterwurm</h2>

                    <div id="foundWordsDisplay" className="word-list d-flex justify-content-center">
                        {foundWords.map((word, index) => {
                            let style = {};

                            if (index === 0) { // Erstes Wort
                                style = {
                                    fontWeight: 'bold',
                                    backgroundColor: 'lightgrey',
                                };
                            } else if (index === foundWords.length - 1) { // Letztes Wort
                                style = {
                                    fontWeight: 'bold',
                                    color: 'blue',
                                    backgroundColor: 'lightblue',
                                };
                                return (
                                    <div key={index} style={style} className="m-2 p-2">
                                        {word}
                                    </div>
                                );
                            } else { // Alle anderen Wörter
                                style = {
                                    fontWeight: 'bold',
                                };
                            }

                            return (
                                <div key={index} style={style} className="m-2 p-2">
                                    {word}
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>

            {/* Spiel beenden - only visible when contentVisible is true */}
            <div id="finishGameArea" className="text-center" style={{ display: contentVisible ? 'block' : 'none' }}>
                {/* Use the finishGame function instead of directly linking to "/game-end" */}
                <button id="finishGameButton" onClick={finishGame} className="btn btn-danger btn-lg mt-5 mb-3">Spiel beenden</button>
            </div>

        </div>

    );
}