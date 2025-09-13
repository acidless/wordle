import './App.css';
import Keypad, {getColor} from "./Components/Keypad";
import useWordle from "./useWordle";
import InvalidWord from "./Components/InvalidWord";


function App() {
    const {letterState, correctState, onButtonPress, isInvalidWord, resetInvalidWord} = useWordle();

    return (
        <div className="app">
            <div className="grid">
                {letterState.map((letter, index) =>
                    <div className={`cell${letter ? " has-letter" : ""}`} key={index}
                         style={{borderColor: getColor(correctState[index])}}>{letter}</div>)
                }
            </div>
            <Keypad lettersState={letterState} correctState={correctState} onButtonPress={onButtonPress}/>
            <InvalidWord isInvalid={isInvalidWord} close={resetInvalidWord}/>
        </div>
    );
}

export default App;
