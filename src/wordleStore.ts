import {create} from "zustand/react";

export const WORD_LENGTH = 5;

export const useStore = create(() => ({
    letterState: new Array(WORD_LENGTH * 6).fill(""),
    correctState: new Array(WORD_LENGTH * 6).fill(""),
    currentWord: "",
    currentTry: 0,
    isInvalidWord: false,
    isWon: false,
    lostWord: "",
}));

export function setInvalidWord(val: boolean) {
    useStore.setState({isInvalidWord: val});
}

export function setCorrectState(newCorrectData: string[]) {
    const state = useStore.getState();

    const newState: string[] = state.correctState.map((val, index) => {
        return isIndexInBounds(index, state.currentTry)
            ? newCorrectData[index % WORD_LENGTH]
            : val;
    });

    useStore.setState({correctState: newState});
    updateCurrentTry();
}

export function setLetterState(key: string) {
    const state = useStore.getState();
    let isSetted = false;

    const newLetterState = state.letterState.map((val, index) => {
        if (isIndexInBounds(index, state.currentTry)) {
            if (!isSetted && key === "Backspace" && val && !state.letterState[index + 1]) {
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

    useStore.setState({letterState: newLetterState});
}

export function setCurrentWord(val: string) {
    useStore.setState({currentWord: val});
}

export function updateCurrentTry() {
    const state = useStore.getState();
    useStore.setState({currentTry: state.currentTry + 1});
}

export function setWon() {
    useStore.setState({isWon: true});
}

export function setLostWord(word: string) {
    useStore.setState({lostWord: word});
}

function isIndexInBounds(index: number, currentTry: number) {
    return index >= WORD_LENGTH * currentTry && index < WORD_LENGTH * (currentTry + 1);
}