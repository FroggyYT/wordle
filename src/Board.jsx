import React, { useState, useEffect, useRef } from 'react';
import $ from "simple-jsx-react"

import Tile from "./Tile.jsx"
import Popup from "./Popup.jsx"

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

	const [goodPopupVisible, setGoodPopupVisible] = useState(false);
	const [badPopupVisible, setBadPopupVisible] = useState(false);

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

	useEffect(() => {
		const handle = ({ key }) => {
			if (key == "Enter" || key == " " || key == "Backspace" || word.length >= (enterPress + 1) * COLUMNS) return;
			setWord(w => w + key);
		}
	
		const handleS = ({ key }) => {
			if (key == "Backspace") {
				setWord(w => {
					let canBackspace = true;
					if (w.length / (enterPress + 1) == COLUMNS * enterPress / (enterPress + 1) || w.length == 0) canBackspace = false;
					if (!canBackspace) return w;
					let a = w.split("");
					a.pop();
					return a.join("");
				});
			}
	
			if (key == "Enter") {
				setWord(w => {
					if (w.length != (enterPress + 1) * COLUMNS) return w;
					let rawData = await fetch(`/realWord?w=${word.split("").splice(word.length-5, 5).join("")}`);
					let parsedData = await rawData.json();
					if (!parsedData) return;
					setEnterPress(e => e+1);
					return w;
				});
			}
		}

		window.addEventListener("keypress", handle);
		window.addEventListener("keydown", handleS);

		return () => {
			window.removeEventListener("keypress", handle);
			window.removeEventListener("keydown", handleS);
		}
	});

	useEffect(() => {
		if (pKey == "") return;

		const handle = ({ key }) => {
			if (key == "Enter" || key == " " || key == "Backspace" || word.length >= (enterPress + 1) * COLUMNS) return;
			setWord(w => w + key);
		}
	
		const handleS = ({ key }) => {
			if (key == "Backspace") {
				setWord(w => {
					let canBackspace = true;
					if (w.length / (enterPress + 1) == COLUMNS * enterPress / (enterPress + 1) || w.length == 0) canBackspace = false;
					if (!canBackspace) return w;
					let a = w.split("");
					a.pop();
					return a.join("");
				});
			}
	
			if (key == "Enter") {
				setWord(async w => {
					if (w.length != (enterPress + 1) * COLUMNS) return w;
					let rawData = await fetch(`/realWord?w=${word.split("").splice(word.length-5, 5).join("")}`);
					let parsedData = await rawData.json();
					if (!parsedData) return;
					setEnterPress(e => e+1);
					return w;
				});
			}
		}

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

		setLettersGuessed(letters => [...letters, ...curWord.split("")]);
		setGuessedState(state => [...state, ...parsedData]);

		parsedData.forEach((v, i) => {
			setTimeout(() => {
				boardState(i+row*COLUMNS, v);
			}, 125*i);
		});

		if (parsedData.every(v => v == "right")) {
			setTimeout(() => {
				
				setGoodPopupVisible(true);

			}, 1250);
		} else {
			if (word.length >= ROWS*COLUMNS) {
				(async () => {
					let rawData = await fetch("/getWord");
					let parsedData = await rawData.text();
					setBadOg(parsedData);
					setBadPopupVisible(true);
				})();
			}
		}
	}, [enterPress]);

	const [badOg, setBadOg] = useState("");

	const resetGame = async () => {
		let rawData = await fetch("/newWord");
		let parsedData = await rawData.text();

		setGoodPopupVisible(false);
		setBadPopupVisible(false);

		setWord("");

		board.forEach((v, i) => boardState(i, "blank"));
		setLettersGuessed([]);
		setGuessedState([]);
		setEnterPress(0);
	}

	return (
		<>
			<Popup callback={resetGame} prompt={`You guessed the word correctly!`} cText={"New Word"} canClose={false} active={goodPopupVisible}></Popup>
			<Popup callback={resetGame} prompt={`You ran out of guesses!\nThe correct word was: ${badOg}`} cText={"New Word"} canClose={false} active={badPopupVisible}></Popup>
			<div id="board">
				{board.map((v, i) => <Tile key={i} value={v.content} tileState={v.type}></Tile>)}
			</div>
		</>
	)
};

export default Board;
