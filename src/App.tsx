import './App.css';
import Keypad, {getColor} from "./Components/Keypad";
import useWordle from "./useWordle";
import InvalidWord from "./Components/InvalidWord";
import GameSucces from "./Components/GameSucces";


function App() {
    const {letterState, correctState, onButtonPress, isInvalidWord, resetInvalidWord, isWon} = useWordle();

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
            <GameSucces isWon={isWon}/>
        </div>
    );
}

export default App;
