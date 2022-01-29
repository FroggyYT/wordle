import React, { useState, useEffect } from 'react';

import Tile from "./Tile.jsx"

const BLANK = "blank";
const WRONG = "wrong";
const SPOT = "spot";
const RIGHT = "right";

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

const blankBoard = new Array(6).fill(0).map(v => {
	return new Array(5).fill(0).map(v => new TileObj());
});

const Board = () => {
	const [board, setBoard] = useState(blankBoard);
	
	const boardContent = (x, y, content) => {
		let tBoard = [...board];
		tBoard[y][x].setContent(content);
		setBoard(tBoard);
	}

	const boardState = (x, y, type) => {
		let tBoard = [...board];
		tBoard[y][x].setType(type);
		setBoard(tBoard);
	}

	const updateBoard = (x, y, content, type) => {
		let tBoard = [...board];
		tBoard[y][x].setContent(content);
		tBoard[y][x].setType(type);
		setBoard(tBoard);
	}

	useEffect(() => {
		board.flat().forEach((v, i) => {
			setTimeout(() => {
				// i = y * row + x
				// i+x = y * row
				// i+x)/row = y
				v.updateBoard()
			}, 1000*i);
		});
	}, []);

	return (
		<div id="board">
			{board.flat().map((v, i) => <Tile key={i} value={v.content} tileState={v.type}></Tile>)}
		</div>
	)
};

export default Board;
