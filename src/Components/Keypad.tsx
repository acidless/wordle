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
            return "gray";
        case "g":
            return "green";
        case "y":
            return "yellow";
        default:
            return "none";
    }
}

const Keypad: React.FC<PropsType> = function ({lettersState, onButtonPress, correctState}) {
    return <div className="keypad">
        {keyData.split("").map(letter => {
            let color = "";
            for (let i = 0; i < lettersState.length; i++) {
                if (lettersState[i] === letter) {
                    color = getColor(correctState[i]);
                }
            }

            return <button style={{backgroundColor: color}} onClick={() => onButtonPress(letter)}>{letter}</button>
        })}
        <button className="keypad__erase" onClick={() => onButtonPress("Backspace")}>-</button>
        <button className="keypad__enter" onClick={() => onButtonPress("Enter")}>ВВОД</button>
    </div>
}

export default Keypad;