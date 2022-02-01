import React, { useState, useEffect } from 'react'
import "./app.scss"

import Board from "./Board.jsx"
import Keyboard from "./Keyboard.jsx"

import io from "socket.io-client";

const App = () => {
    const [pKey, setPKey] = useState("");

    const [lettersGuessed, setLettersGuessed] = useState([]);
    const [guessedState, setGuessedState] = useState([]);

    const [socket, setSocket] = useState(null);
    const [activeUsers, setActiveUsers] = useState(0);

    const parseKeyboard = key => {
        const ENTER = "ENTER";
		const BACKSPACE = "⌫";

        setPKey((key == ENTER ? "Enter" : (key == BACKSPACE ? "Backspace" : key)));
        setTimeout(() => setPKey(""), 1);
    }

    useEffect(() => {
        console.log(lettersGuessed);
        console.log(guessedState);
    }, [lettersGuessed, guessedState]);

    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket);

        newSocket.emit("getActive");
        const int = setInterval(() => {
            newSocket.emit("getActive");
        }, 1000);

        return () => {
            newSocket.close();
            clearInterval(int);
        }
    }, []);

    useEffect(() => {
        if (!socket) return;
        const respCallback = (num) => setActiveUsers(num);

        socket.on("active", respCallback);

        return () => socket.off("active", respCallback);
    }, [socket]);

    return (
        <>
            <div className="active-users">Current active users: {activeUsers}</div>
            <Board setLettersGuessed={setLettersGuessed} setGuessedState={setGuessedState} pKey={pKey}></Board>
            <Keyboard lettersGuessed={lettersGuessed} guessedState={guessedState} parseKeyboard={k => parseKeyboard(k)}></Keyboard>
        </>
    )
}

export default App
