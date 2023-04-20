import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
    const [wordsState, setWordsState] = useState(new Array(30).fill(""));

    useEffect(() => {
        document.onkeyup = (event) => {
            setWordsState((prevState) => {
                let isSetted = false;

                return prevState.map((val, index) => {
                    if (!isSetted && event.key === "Backspace" && val && !prevState[index + 1]) {
                        isSetted = true;
                        return "";
                    }

                    if (!isSetted && !val && event.key.length === 1) {
                        isSetted = true;
                        return event.key;
                    }

                    return val;
                })
            })
        }

    }, []);

    return (
        <div className="app">
            <div className="grid">
                {wordsState.map(word => <div className="cell">{word}</div>)}
            </div>
        </div>
    );
}

export default App;
