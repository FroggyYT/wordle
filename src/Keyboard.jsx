import React, { useState, useEffect } from 'react'

let ROW1 = "qwertyuiop".toUpperCase().split("");
let ROW2 = "asdfghjkl".toUpperCase().split("");
let ROW3 = "zxcvbnm".toUpperCase().split("");

ROW3.unshift("ENTER");
ROW3.push("⌫");

let ROWS = [ ROW1, ROW2, ROW3 ];

import MobileDetect from "mobile-detect"

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const Keyboard = ({ parseKeyboard, lettersGuessed, guessedState }) => {
    return (
        <div id="keyboard">
            {ROWS.map((v, i) => {

                return(
                <div className="row" key={i}>
                    {v.map((_,j) => {

                        return (
                            <button onClick={e => parseKeyboard(_)} className="key" key={j}>{_}</button>
                        );
                    })}
                </div>
                );
            })}
        </div>
    )
}

export default Keyboard