const keyData = "ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ";

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

type Props = {
    lettersState: Array<string>;
    correctState: Array<string>;
    onButtonPress: (state: string) => void;
}

const Keypad = ({lettersState, onButtonPress, correctState}: Props) => {
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
        <button className="keypad__enter" onClick={() => onButtonPress("Enter")}>ОК</button>
    </div>
}

export default Keypad;