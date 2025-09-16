import {useCallback, useEffect} from "react";
import words from "./words"
import {
    useStore,
    WORD_LENGTH,
    setCurrentWord,
    setLetterState,
    setCorrectState,
    setWon,
    setLostWord,
    setInvalidWord,
} from "./wordleStore";

function useWordle() {
    const {letterState, correctState, currentWord, currentTry, isInvalidWord, isWon, lostWord} = useStore();

    const isValidWord = useCallback(() => {
        for (let word of words) {
            const checkingWord = letterState.join("")
                .substring(WORD_LENGTH * currentTry, WORD_LENGTH * (currentTry + 1));

            if (word.toUpperCase() === checkingWord) {
                return true;
            }
        }

        setInvalidWord(true);
        return false;
    }, [letterState, currentTry]);

    const checkLetters = useCallback(() => {
        const lastCharSetted = letterState[WORD_LENGTH * (currentTry + 1) - 1];
        if (lastCharSetted) {
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

            setCorrectState(result);

            if (rightLettersCount === WORD_LENGTH) {
                setWon();
                return;
            }

            if (currentTry >= 5) {
                setLostWord(currentWord);
                return;
            }
        }
    }, [currentTry, currentWord, letterState, isValidWord]);

    const onButtonPress = useCallback((key: string) => {
        if (key === "Enter") {
            checkLetters();
            return;
        }

        setLetterState(key);
    }, [checkLetters]);

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

    return {
        letterState, correctState, onButtonPress,
        isInvalidWord, resetInvalidWord: () => setInvalidWord(false), isWon, lostWord
    };
}

export default useWordle;