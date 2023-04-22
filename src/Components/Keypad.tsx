import React from "react";

const keyData = "ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ";

type PropsType = {
    lettersState: Array<string>;
    correctState: Array<string>;
    onButtonPress: (state: string) => void;
}

const Keypad: React.FC<PropsType> = function ({lettersState, onButtonPress, correctState}) {
    return <div className="keypad">
        {keyData.split("").map(letter => <button onClick={() => onButtonPress(letter)}>{letter}</button>)}
        <button className="keypad__erase" onClick={() => onButtonPress("Backspace")}>-</button>
        <button className="keypad__enter" onClick={() => onButtonPress("Enter")}>ВВОД</button>
    </div>
}

export default Keypad;