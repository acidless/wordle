import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import words from "./words"
import Keypad from "./Components/Keypad";

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
    const onButtonPress = useCallback((key: string) => {
        if (key === "Enter") {
            checkLetters();
            return;
        }

        setLetterState((prevState) => {
            let isSetted = false;

            return prevState.map((val, index) => {
                if (index >= WORD_LENGTH * currentTry && index < WORD_LENGTH * (currentTry + 1)) {
                    if (!isSetted && key === "Backspace" && val && !prevState[index + 1]) {
                        isSetted = true;
                        return "";
                    }

                    if (!isSetted && !val && key.length === 1) {
                        isSetted = true;
                        return key;
                    }
                }

                return val;
            })
        });
    }, [checkLetters, currentTry]);

    useEffect(() => {
        let word = "";

        while (word.length !== WORD_LENGTH) {
            const randomWordIdx = Math.floor(Math.random() * words.length);
            word = words[randomWordIdx];
        }

        setCurrentWord(word.toUpperCase());

    }, []);

    function checkLetters() {
        console.log(letterState);
        if (letterState[WORD_LENGTH * (currentTry + 1) - 1]) {
            let found = false;


            for (let word of words) {
                if (word.toUpperCase() === letterState.join("").substr(WORD_LENGTH * currentTry, WORD_LENGTH)) {
                    found = true;
                    break;
                }
            }


            console.log(found);
            if (!found) {
                return;
            }

            let counter = 0;
            let rightLettersCount = 0;

            for (let i = WORD_LENGTH * currentTry; i < WORD_LENGTH * (currentTry + 1); i++) {
                if (letterState[i]) {
                    let state = "b";
                    if (currentWord[counter] === letterState[i]) {
                        state = "g";
                        rightLettersCount++;
                    } else if (currentWord.includes(letterState[i])) {
                        state = "y";
                    }

                    setCorrectState((prevState) => prevState.map((val, index) => index === i ? state : val))
                }


                counter++;
            }

            setCurrentTry(prevState => prevState + 1);

            if (rightLettersCount === WORD_LENGTH) {

            }
        }
    }

    return (
        <div className="app">
            <div className="grid">
                {letterState.map((letter, index) => <div className="cell"
                                                         style={{backgroundColor: getColor(correctState[index])}}>{letter}</div>)}
            </div>
            <Keypad lettersState={letterState} correctState={correctState} onButtonPress={onButtonPress}/>
        </div>
    );
}

export default App;
