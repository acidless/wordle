import React, {useEffect, useState} from 'react';
import './App.css';

const WORD_LENGTH = 5;

function getColor(state: string) {
    switch (state) {
        case "b":
            return "gray";
        case "g":
            return "green";
        case "y":
            return "yellow";
        default:
            return "none";
    }
}

function App() {
    const [letterState, setLetterState] = useState(new Array(WORD_LENGTH * 6).fill(""));
    const [correctState, setCorrectState] = useState(new Array(WORD_LENGTH * 6).fill(""));

    const [currentWord, setCurrentWord] = useState("PILOT");
    const [currentTry, setCurrentTry] = useState(0);

    useEffect(() => {
        document.onkeyup = (event) => {
            setLetterState((prevState) => {
                let isSetted = false;

                return prevState.map((val, index) => {
                    if (!isSetted && event.key === "Backspace" && val && !prevState[index + 1]) {
                        isSetted = true;
                        return "";
                    }

                    if (!isSetted && !val && event.key.length === 1) {
                        isSetted = true;
                        return event.key.toUpperCase();
                    }

                    return val;
                })
            });
        }

    }, []);

    useEffect(() => {
        let counter = 0;
        for (let i = WORD_LENGTH * currentTry; i < WORD_LENGTH; i++) {
            if (letterState[i]) {
                let state = "b";
                if (currentWord[counter] === letterState[i]) {
                    state = "g";
                } else if (currentWord.includes(letterState[i])) {
                    state = "y";
                }

                setCorrectState((prevState) => prevState.map((val, index) => index === i ? state : val))
            }


            counter++;
        }
    }, [letterState]);

    return (
        <div className="app">
            <div className="grid">
                {letterState.map((letter, index) => <div className="cell"
                                                         style={{backgroundColor: getColor(correctState[index])}}>{letter}</div>)}
            </div>
        </div>
    );
}

export default App;
