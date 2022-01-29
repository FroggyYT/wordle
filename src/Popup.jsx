import React, { useState, useEffect } from 'react'

const Popup = ({ callback, prompt, cText, canClose, active }) => {
    return (
        <div className={`popup-background ${active ? "active" : "inactive"}`}>
            <div className="popup-foreground">
                <div className="popup-prompt">{prompt}</div>
                <div className="popup-buttons">
                    <button onClick={callback} className="popup-callback">{cText}</button>
                    {canClose ? <button className="popup-close">Close</button> : ""}
                </div>
            </div>
        </div>
    )
}

export default Popup