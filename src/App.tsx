import './App.css';
import Keypad, {getColor} from "./Components/Keypad";
import useWordle from "./useWordle";
import InvalidWord from "./Components/InvalidWord";
import GameWon from "./Components/GameWon";
import GameLost from "./Components/GameLost";


function App() {
    const {
        letterState, correctState, onButtonPress,
        isInvalidWord, resetInvalidWord, isWon, lostWord
    } = useWordle();

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
            <GameWon isWon={isWon}/>
            <GameLost lostWord={lostWord}/>
        </div>
    );
}

export default App;
