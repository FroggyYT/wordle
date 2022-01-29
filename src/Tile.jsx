import React, { useState, useEffect } from 'react';

const Tile = ({ tileState, value }) => {

    return (
        <div className={"tile " + (tileState ?? "")}>
            <div className="inner">
                <div className="front blank"></div>
                <div className={"back " + (tileState ?? "")}><div>{value}</div></div>
            </div>
        </div>
    );
};

export default Tile;
