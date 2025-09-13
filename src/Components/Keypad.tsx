import React from "react";

const keyData = "ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ";

type PropsType = {
    lettersState: Array<string>;
    correctState: Array<string>;
    onButtonPress: (state: string) => void;
}

export function getColor(state: string) {
    switch (state) {
        case "b":
            return "var(--gray)";
        case "g":
            return "var(--green)";
        case "y":
            return "var(--yellow)";
        default:
            return "";
    }
}

const Keypad: React.FC<PropsType> = function ({lettersState, onButtonPress, correctState}) {
    return <div className="keypad">
        {keyData.split("").map(letter => {
            let color = "";
            for (let i = 0; i < lettersState.length; i++) {
                if (lettersState[i] === letter) {
                    color = getColor(correctState[i]);
                    break;
                }
            }

            return <button key={letter} style={{backgroundColor: color}} onClick={() => onButtonPress(letter)}>{letter}</button>
        })}
        <button className="keypad__erase" onClick={() => onButtonPress("Backspace")}>
            <img src="/backspace.svg" alt=""/>
        </button>
        <button className="keypad__enter" onClick={() => onButtonPress("Enter")}>ВВОД</button>
    </div>
}

export default Keypad;