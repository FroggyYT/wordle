import React, { useState, useEffect } from 'react';
import $ from "simple-jsx-react"

import Tile from "./Tile.jsx"

const BLANK = "blank";
const WRONG = "wrong";
const SPOT = "spot";
const RIGHT = "right";

const ROWS = 6;
const COLUMNS = 5;

class TileObj {
	constructor(type=BLANK, content="") {
		this.type = type;
		this.content = content;
	}

	setContent(content) {
		this.content = content;
	}

	setType(type) {
		this.type = type;
	}
}

const blankBoard = new Array(ROWS * COLUMNS).fill(0).map(v => new TileObj());

const Board = ({ pKey, setLettersGuessed, setGuessedState }) => {
	const [board, setBoard] = useState([...blankBoard]);
	const [word, setWord] = useState("");
	const [enterPress, setEnterPress] = useState(0);

	const boardContent = (i, content) => {
		let tBoard = [...board];
		tBoard[i].setContent(content);
		setBoard(tBoard);
	}

	const boardState = (i, type) => {
		let tBoard = [...board];
		tBoard[i].setType(type);
		setBoard(tBoard);
	}

	const updateBoard = (i, content, type) => {
		let tBoard = [...board];
		tBoard[i].setContent(content);
		tBoard[i].setType(type);
		setBoard(tBoard);
	}

	const handle = ({ key }) => {
		if (key == "Enter" || key == " " || key == "Backspace" || word.length >= COLUMNS) return;
		setWord(w => w + key);
	}

	const handleS = ({ key }) => {
		if (key == "Backspace") {
			setWord(w => {
				let a = w.split("");
				a.pop();
				return a.join("");
			});
		}

		if (key == "Enter") {
			setWord(w => {
				if (w.length % COLUMNS != 0) {
					return w;
				}
				setEnterPress(e => e+1);
				return w;
			});
		}
	}

	useEffect(() => {
		window.addEventListener("keypress", handle);
		window.addEventListener("keydown", handleS);
	}, []);

	useEffect(() => {
		if (pKey == "") return;
		console.log(pKey);
		handle({key: pKey});
		handleS({key: pKey});
	}, [pKey]);

	useEffect(() => {
		board.forEach((v, i) => {
			boardContent(i, word.charAt(i).toUpperCase());
		});
	}, [word]);

	useEffect(async () => {
		if (word.length == 0) return;

		let curWord = word.split("").splice(word.length-5, 5).join("");
		let rawData = await fetch(`/checkWord?word=${curWord.toUpperCase()}`);
		let parsedData = await rawData.json();

		let row = enterPress - 1;

		parsedData.forEach((v, i) => {
			setTimeout(() => {
				boardState(i+row*COLUMNS, v);
			}, 125*i);
		});

		if (parsedData.every(v => v == "right")) {
			setTimeout(() => {
				alert("h");
			}, 1250);
		}

		// if (wasCorrect) {
		// 	for (let i = 0; i < COLUMNS; i++) {
		// 		boardState(i+row*COLUMNS, RIGHT);
		// 	}
		// } else {
		// 	for (let i = 0; i < COLUMNS; i++) {
		// 		boardState(i+row*COLUMNS, WRONG);
		// 	}
		// }
	}, [enterPress]);

	return (
		<div id="board">
			{board.map((v, i) => <Tile key={i} value={v.content} tileState={v.type}></Tile>)}
		</div>
	)
};

export default Board;
