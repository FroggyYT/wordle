import React, { useState, useEffect } from 'react'
import "./app.scss"

import Board from "./Board.jsx"
import Keyboard from "./Keyboard.jsx"

const App = () => {
    const [pKey, setPKey] = useState("");

    const [lettersGuessed, setLettersGuessed] = useState([]);
    const [guessedState, setGuessedState] = useState([]);

    const parseKeyboard = key => {
        const ENTER = "ENTER";
		const BACKSPACE = "⌫";

        setPKey((key == ENTER ? "Enter" : (key == BACKSPACE ? "Backspace" : key)));
        setTimeout(() => setPKey(""), 1);
    }

    return (
        <>
            <Board setLettersGuessed={setLettersGuessed} setGuessedState={setGuessedState} pKey={pKey}></Board>
            <Keyboard lettersGuessed={lettersGuessed} guessedState={guessedState} parseKeyboard={k => parseKeyboard(k)}></Keyboard>
        </>
    )
}

export default App
