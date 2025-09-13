import {useCallback, useEffect, useState} from "react";
import words from "./words"

const WORD_LENGTH = 5;

function useWordle() {
    const [letterState, setLetterState] = useState(new Array(WORD_LENGTH * 6).fill(""));
    const [correctState, setCorrectState] = useState(new Array(WORD_LENGTH * 6).fill(""));

    const [currentWord, setCurrentWord] = useState("PILOT");
    const [currentTry, setCurrentTry] = useState(0);
    const [isInvalidWord, setInvalidWord] = useState(false);

    function isValidWord() {
        for (let word of words) {
            if (word.toUpperCase() === letterState.join("").substr(WORD_LENGTH * currentTry, WORD_LENGTH)) {
                return true;
            }
        }

        setInvalidWord(true);
        return false;
    }

    function checkLetters() {
        if (letterState[WORD_LENGTH * (currentTry + 1) - 1]) {
            if (!isValidWord()) {
                return;
            }

            let guess = letterState.slice(WORD_LENGTH * currentTry, WORD_LENGTH * (currentTry + 1));
            let rightLettersCount = 0;

            let result = new Array(WORD_LENGTH).fill("b");
            let availableLetters = currentWord.split("");

            for (let i = 0; i < WORD_LENGTH; i++) {
                if (guess[i] === currentWord[i]) {
                    result[i] = "g";
                    rightLettersCount++;
                    availableLetters.splice(i, 1);
                }
            }

            for (let i = 0; i < WORD_LENGTH; i++) {
                if (result[i] === "b" && guess[i]) {
                    const index = availableLetters.indexOf(guess[i]);
                    if (index > -1) {
                        result[i] = "y";
                        availableLetters.splice(i, 1);
                    }
                }
            }

            setCorrectState(prevState =>
                prevState.map((val, index) =>
                    index >= WORD_LENGTH * currentTry && index < WORD_LENGTH * (currentTry + 1)
                        ? result[index % WORD_LENGTH]
                        : val
                )
            );

            setCurrentTry(prevState => prevState + 1);

            if (rightLettersCount === WORD_LENGTH) {
            }
        }
    }

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

                    const upperKey = key.toUpperCase();
                    const isKeyRussian = upperKey.charCodeAt(0) >= "А".charCodeAt(0)
                        && upperKey.charCodeAt(0) <= "Я".charCodeAt(0);
                    if (!isSetted && !val && isKeyRussian) {
                        isSetted = true;
                        return key.toUpperCase();
                    }
                }

                return val;
            })
        });
    }, [currentTry, checkLetters]);

    useEffect(() => {
        let word = "";

        while (word.length !== WORD_LENGTH) {
            const randomWordIdx = Math.floor(Math.random() * words.length);
            word = words[randomWordIdx];
        }

        setCurrentWord(word.toUpperCase());
    }, []);

    useEffect(() => {
        function onKeypress(event: KeyboardEvent) {
            onButtonPress(event.key);
        }

        document.addEventListener("keydown", onKeypress);

        return () => {
            document.removeEventListener("keydown", onKeypress);
        };
    }, [onButtonPress]);

    return {letterState, correctState, onButtonPress, isInvalidWord, resetInvalidWord: () => setInvalidWord(false)};
}

export default useWordle;